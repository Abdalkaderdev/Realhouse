// ═══════════════════════════════════════════════════════════════════════════
// Blog Pages Renderer for Real House
// SEO-Optimized Blog Listing and Detail Pages
// ═══════════════════════════════════════════════════════════════════════════

import {
  blogPosts,
  blogCategories,
  getBlogPostBySlug,
  getFeaturedPosts,
  getPostsByCategory,
  getRelatedPosts,
  formatBlogDate,
  getAllTags,
  blogAuthors,
  generateBlogAuthorSchema,
  type BlogPost,
  type BlogCategory,
  type EnhancedBlogAuthor
} from '../data/blog';
import {
  generateBlogImageAlt,
  generateBlogImageTitle,
  generateBlogAltText,
  createSEOImage,
  generateSrcSet,
  updateImageMetaTags,
  addBlogImageSchema,
  IMAGE_DIMENSIONS
} from '../utils/image-seo';
import { createBlogShareButtons } from '../components/share-buttons';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema,
  getBlogBreadcrumbs,
  getBlogPostBreadcrumbs,
  createYouMayAlsoLikeSection,
  createBlogContentLinks,
  createContentSidebar,
  createInternalCTA,
  createLocationLinks,
  createPopularPropertiesWidget,
  createPopularProjectsWidget
} from '../components/internal-linking';

// ─── Helper Functions ─────────────────────────────────────────────────────
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  textContent?: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

function createSVGUse(iconId: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'icon');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${iconId}`);
  svg.appendChild(use);
  return svg;
}

// ─── Safe HTML Parser for Blog Content ─────────────────────────────────────
// Parse trusted HTML content (from our own blog data) into DOM elements
function parseArticleContent(htmlContent: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  // Only allow safe elements from our own content
  const allowedTags = ['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br'];

  function processNode(node: Node, parent: Node): void {
    if (node.nodeType === Node.TEXT_NODE) {
      parent.appendChild(document.createTextNode(node.textContent || ''));
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      if (allowedTags.includes(tagName)) {
        const newElement = document.createElement(tagName);

        // Only copy safe attributes
        if (tagName === 'a') {
          const href = element.getAttribute('href');
          if (href && (href.startsWith('/') || href.startsWith('https://') || href.startsWith('http://'))) {
            newElement.setAttribute('href', href);
            if (href.startsWith('http')) {
              newElement.setAttribute('target', '_blank');
              newElement.setAttribute('rel', 'noopener noreferrer');
            } else {
              newElement.setAttribute('data-route', '');
            }
          }
        }

        // Process child nodes
        node.childNodes.forEach(child => processNode(child, newElement));
        parent.appendChild(newElement);
      } else {
        // For non-allowed tags, just process their children
        node.childNodes.forEach(child => processNode(child, parent));
      }
    }
  }

  doc.body.childNodes.forEach(child => processNode(child, fragment));
  return fragment;
}

// ─── Blog Filter State ─────────────────────────────────────────────────────
interface BlogFilterState {
  category: string;
  searchQuery: string;
}

let currentBlogFilterState: BlogFilterState = {
  category: 'All',
  searchQuery: ''
};

// ─── Blog Card Component ───────────────────────────────────────────────────
function createBlogCard(post: BlogPost, featured: boolean = false): HTMLElement {
  const article = createElement('article', featured ? 'blog-card blog-card--featured' : 'blog-card');
  article.setAttribute('data-id', post.id);

  // Image section with figure for semantic markup
  const media = createElement('figure', 'blog-card__media');
  const imageLink = createElement('a', 'blog-card__image-link');
  imageLink.href = `/blog/${post.slug}`;
  imageLink.setAttribute('data-route', '');
  imageLink.setAttribute('aria-label', `Read: ${post.title}`);

  // SEO-optimized blog image
  const img = createSEOImage({
    src: post.image,
    alt: generateBlogImageAlt(post),
    title: generateBlogImageTitle(post),
    className: 'blog-card__image',
    loading: featured ? 'eager' : 'lazy',
    width: featured ? 800 : IMAGE_DIMENSIONS.card.width,
    height: featured ? 450 : IMAGE_DIMENSIONS.card.height,
    srcset: generateSrcSet(post.image, [400, 600, 800, 1200]),
    sizes: featured ? '(max-width: 768px) 100vw, 60vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    fetchPriority: featured ? 'high' : 'auto',
  });
  imageLink.appendChild(img);
  media.appendChild(imageLink);

  // Category badge
  const categoryBadge = createElement('span', 'blog-card__category', post.category);
  media.appendChild(categoryBadge);

  article.appendChild(media);

  // Content section
  const content = createElement('div', 'blog-card__content');

  // Meta info
  const meta = createElement('div', 'blog-card__meta');
  // Use time element with datetime attribute for proper semantics
  const dateTime = document.createElement('time');
  dateTime.className = 'blog-card__date';
  dateTime.setAttribute('datetime', new Date(post.date).toISOString());
  dateTime.textContent = formatBlogDate(post.date);
  meta.appendChild(dateTime);
  const separator = createElement('span', 'blog-card__separator', '\u00B7');
  meta.appendChild(separator);
  const readTime = createElement('span', 'blog-card__read-time', `${post.readTime} min read`);
  meta.appendChild(readTime);
  content.appendChild(meta);

  // Title
  const title = createElement('h3', 'blog-card__title');
  const titleLink = createElement('a', undefined, post.title);
  titleLink.href = `/blog/${post.slug}`;
  titleLink.setAttribute('data-route', '');
  title.appendChild(titleLink);
  content.appendChild(title);

  // Excerpt
  const excerpt = createElement('p', 'blog-card__excerpt', post.excerpt);
  content.appendChild(excerpt);

  // Author and read more
  const footer = createElement('div', 'blog-card__footer');

  const authorDiv = createElement('div', 'blog-card__author');
  const authorImg = createElement('img', 'blog-card__author-image');
  authorImg.src = post.author.image;
  authorImg.alt = post.author.name;
  authorDiv.appendChild(authorImg);
  const authorInfo = createElement('div', 'blog-card__author-info');
  const authorName = createElement('span', 'blog-card__author-name', post.author.name);
  authorInfo.appendChild(authorName);
  const authorRole = createElement('span', 'blog-card__author-role', post.author.role);
  authorInfo.appendChild(authorRole);
  authorDiv.appendChild(authorInfo);
  footer.appendChild(authorDiv);

  const readMoreLink = createElement('a', 'blog-card__read-more', 'Read Article');
  readMoreLink.href = `/blog/${post.slug}`;
  readMoreLink.setAttribute('data-route', '');
  readMoreLink.appendChild(createSVGUse('icon-arrow-right'));
  footer.appendChild(readMoreLink);

  content.appendChild(footer);
  article.appendChild(content);

  return article;
}

// ─── Filter and Render Posts ───────────────────────────────────────────────
function filterAndRenderPosts(grid: HTMLElement): void {
  const { category, searchQuery } = currentBlogFilterState;

  let filteredPosts = [...blogPosts];

  // Filter by category
  if (category !== 'All') {
    filteredPosts = filteredPosts.filter(post => post.category === category);
  }

  // Filter by search query
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Clear grid
  while (grid.firstChild) {
    grid.removeChild(grid.firstChild);
  }

  // Render posts or empty state
  if (filteredPosts.length === 0) {
    const emptyState = createElement('div', 'blog-page__empty');
    const emptyIcon = createSVGUse('icon-area');
    emptyState.appendChild(emptyIcon);
    const emptyTitle = createElement('h3', undefined, 'No articles found');
    emptyState.appendChild(emptyTitle);
    const emptyText = createElement('p', undefined, 'Try adjusting your filters or search terms.');
    emptyState.appendChild(emptyText);
    grid.appendChild(emptyState);
  } else {
    filteredPosts.forEach(post => {
      grid.appendChild(createBlogCard(post));
    });
  }
}

// ─── Blog Listing Page ─────────────────────────────────────────────────────
export function renderBlogPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();

  // Reset filter state
  currentBlogFilterState = {
    category: 'All',
    searchQuery: ''
  };

  const page = createElement('div', 'blog-page');
  const container = createElement('div', 'container');

  // Breadcrumbs
  const breadcrumbItems = getBlogBreadcrumbs();
  container.appendChild(createBreadcrumbs(breadcrumbItems));
  injectBreadcrumbSchema(breadcrumbItems);

  // Header section with SEO keywords
  const header = createElement('div', 'blog-page__header');
  const title = createElement('h1', 'blog-page__title');
  title.textContent = 'Real Estate Erbil ';
  const em = createElement('em', undefined, 'Insights');
  title.appendChild(em);
  title.appendChild(document.createTextNode(' — Erbil Property Market Blog'));
  header.appendChild(title);
  const subtitle = createElement('p', 'blog-page__subtitle', 'Expert property Erbil advice, real estate Kurdistan market trends, and comprehensive guides for houses for sale Erbil. Learn about apartments Erbil, villas Erbil Iraq, luxury homes Kurdistan, and property investment Kurdistan Iraq opportunities.');
  header.appendChild(subtitle);
  container.appendChild(header);

  // Featured posts section
  const featuredPosts = getFeaturedPosts();
  if (featuredPosts.length > 0) {
    const featuredSection = createElement('section', 'blog-page__featured');
    const featuredTitle = createElement('h2', 'blog-page__section-title', 'Featured Articles');
    featuredSection.appendChild(featuredTitle);

    const featuredGrid = createElement('div', 'blog-page__featured-grid');
    featuredPosts.slice(0, 3).forEach((post, index) => {
      featuredGrid.appendChild(createBlogCard(post, index === 0));
    });
    featuredSection.appendChild(featuredGrid);

    container.appendChild(featuredSection);
  }

  // Filters section
  const filters = createElement('div', 'blog-page__filters');

  // Search input
  const searchWrapper = createElement('div', 'blog-page__search');
  const searchInput = createElement('input', 'blog-page__search-input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search articles...';
  searchInput.setAttribute('aria-label', 'Search articles');
  searchWrapper.appendChild(searchInput);
  filters.appendChild(searchWrapper);

  // Category filters
  const categoryWrapper = createElement('div', 'blog-page__categories');
  const allBtn = createElement('button', 'blog-page__category-btn active', 'All');
  allBtn.setAttribute('data-category', 'All');
  categoryWrapper.appendChild(allBtn);

  blogCategories.forEach(category => {
    const btn = createElement('button', 'blog-page__category-btn', category);
    btn.setAttribute('data-category', category);
    categoryWrapper.appendChild(btn);
  });
  filters.appendChild(categoryWrapper);

  container.appendChild(filters);

  // All posts section
  const postsSection = createElement('section', 'blog-page__posts');
  const postsTitle = createElement('h2', 'blog-page__section-title', 'All Articles');
  postsSection.appendChild(postsTitle);

  const postsGrid = createElement('div', 'blog-page__grid');
  blogPosts.forEach(post => {
    postsGrid.appendChild(createBlogCard(post));
  });
  postsSection.appendChild(postsGrid);

  container.appendChild(postsSection);

  // Newsletter CTA
  const ctaSection = createElement('section', 'blog-page__cta');
  const ctaContent = createElement('div', 'blog-page__cta-content');
  const ctaTitle = createElement('h2', 'blog-page__cta-title', 'Stay Updated');
  ctaContent.appendChild(ctaTitle);
  const ctaText = createElement('p', 'blog-page__cta-text', 'Get the latest real estate insights and property listings delivered to your inbox.');
  ctaContent.appendChild(ctaText);
  const ctaBtn = createElement('a', 'btn btn--primary', 'Contact Us');
  ctaBtn.href = '/contact';
  ctaBtn.setAttribute('data-route', '');
  ctaContent.appendChild(ctaBtn);
  ctaSection.appendChild(ctaContent);
  container.appendChild(ctaSection);

  page.appendChild(container);

  // ─── Location Links Section ─────────────────────────────────────────────
  const locationLinks = createLocationLinks();
  page.appendChild(locationLinks);

  // ─── Property & Project Browse CTA ─────────────────────────────────────
  const browseCta = createInternalCTA(
    'Ready to Find Your Dream Property?',
    'Explore our curated selection of luxury properties and development projects in Erbil, Kurdistan.',
    { text: 'Browse Properties', url: '/properties' },
    { text: 'View Projects', url: '/projects' }
  );
  page.appendChild(browseCta);

  fragment.appendChild(page);

  // Add event listeners after DOM is ready
  setTimeout(() => {
    // Category filter buttons
    const categoryBtns = document.querySelectorAll('.blog-page__category-btn');
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentBlogFilterState.category = btn.getAttribute('data-category') || 'All';
        const grid = document.querySelector('.blog-page__grid') as HTMLElement;
        if (grid) filterAndRenderPosts(grid);
      });
    });

    // Search input
    const search = document.querySelector('.blog-page__search-input') as HTMLInputElement;
    if (search) {
      let debounceTimer: number;
      search.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(() => {
          currentBlogFilterState.searchQuery = search.value;
          const grid = document.querySelector('.blog-page__grid') as HTMLElement;
          if (grid) filterAndRenderPosts(grid);
        }, 300);
      });
    }
  }, 0);

  return fragment;
}

// ─── Blog Post Detail Page ─────────────────────────────────────────────────
export function renderBlogPostPage(slug: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    // 404 for post not found
    const page = createElement('div', 'blog-post-page blog-post-page--not-found');
    const container = createElement('div', 'container');

    const errorContent = createElement('div', 'blog-post-page__error');
    const errorTitle = createElement('h1', undefined, 'Article Not Found');
    errorContent.appendChild(errorTitle);
    const errorText = createElement('p', undefined, 'The article you\'re looking for doesn\'t exist or has been moved.');
    errorContent.appendChild(errorText);
    const backLink = createElement('a', 'btn btn--primary', 'Back to Blog');
    backLink.href = '/blog';
    backLink.setAttribute('data-route', '');
    errorContent.appendChild(backLink);

    container.appendChild(errorContent);
    page.appendChild(container);
    fragment.appendChild(page);
    return fragment;
  }

  // Use article for the entire blog post page as it's self-contained content
  const page = createElement('article', 'blog-post-page');
  page.setAttribute('itemscope', '');
  page.setAttribute('itemtype', 'https://schema.org/BlogPosting');

  // Hero section with SEO-optimized image wrapped in figure
  const hero = createElement('figure', 'blog-post-page__hero');
  const heroImage = createSEOImage({
    src: post.image,
    alt: generateBlogImageAlt(post),
    title: generateBlogImageTitle(post),
    className: 'blog-post-page__hero-image',
    loading: 'eager',
    width: 1200,
    height: 630,
    srcset: generateSrcSet(post.image, [600, 900, 1200, 1600]),
    sizes: '100vw',
    fetchPriority: 'high',
  });
  hero.appendChild(heroImage);
  const heroOverlay = createElement('div', 'blog-post-page__hero-overlay');
  hero.appendChild(heroOverlay);
  page.appendChild(hero);

  // Update meta tags for social sharing
  updateImageMetaTags(post.image, generateBlogImageAlt(post), 'blog');

  // Add structured data for blog image (ImageObject schema)
  addBlogImageSchema(post);

  const container = createElement('div', 'container');

  // Breadcrumb (using standardized component with schema)
  const breadcrumbItems = getBlogPostBreadcrumbs(post);
  container.appendChild(createBreadcrumbs(breadcrumbItems));
  injectBreadcrumbSchema(breadcrumbItems);

  // Article content wrapper
  const articleWrapper = createElement('div', 'blog-post-page__wrapper');

  // Main article
  const article = createElement('article', 'blog-post-page__article');

  // Article header
  const articleHeader = createElement('header', 'blog-post-page__header');

  const categoryLink = createElement('a', 'blog-post-page__category', post.category);
  categoryLink.href = `/blog?category=${encodeURIComponent(post.category)}`;
  categoryLink.setAttribute('data-route', '');
  articleHeader.appendChild(categoryLink);

  const articleTitle = createElement('h1', 'blog-post-page__title', post.title);
  articleHeader.appendChild(articleTitle);

  const articleMeta = createElement('div', 'blog-post-page__meta');

  const authorDiv = createElement('div', 'blog-post-page__author');
  const authorImg = createElement('img', 'blog-post-page__author-image');
  authorImg.src = post.author.image;
  authorImg.alt = post.author.name;
  authorDiv.appendChild(authorImg);
  const authorInfo = createElement('div', 'blog-post-page__author-info');
  const authorName = createElement('span', 'blog-post-page__author-name', post.author.name);
  authorInfo.appendChild(authorName);
  const authorRole = createElement('span', 'blog-post-page__author-role', post.author.role);
  authorInfo.appendChild(authorRole);
  authorDiv.appendChild(authorInfo);
  articleMeta.appendChild(authorDiv);

  const metaDetails = createElement('div', 'blog-post-page__meta-details');
  // Use time element with datetime attribute for proper semantics
  const dateTime = document.createElement('time');
  dateTime.className = 'blog-post-page__date';
  dateTime.setAttribute('datetime', new Date(post.date).toISOString());
  dateTime.setAttribute('itemprop', 'datePublished');
  const calendarIcon = createSVGUse('icon-calendar');
  calendarIcon.setAttribute('aria-hidden', 'true');
  dateTime.appendChild(calendarIcon);
  dateTime.appendChild(document.createTextNode(formatBlogDate(post.date)));
  metaDetails.appendChild(dateTime);
  const readTimeSpan = createElement('span', 'blog-post-page__read-time');
  readTimeSpan.appendChild(createSVGUse('icon-clock'));
  readTimeSpan.appendChild(document.createTextNode(`${post.readTime} min read`));
  metaDetails.appendChild(readTimeSpan);
  articleMeta.appendChild(metaDetails);

  articleHeader.appendChild(articleMeta);
  article.appendChild(articleHeader);

  // Article content - safely parsed
  const articleContent = createElement('div', 'blog-post-page__content');
  articleContent.appendChild(parseArticleContent(post.content));
  article.appendChild(articleContent);

  // Tags
  const tagsSection = createElement('div', 'blog-post-page__tags');
  const tagsLabel = createElement('span', 'blog-post-page__tags-label', 'Tags:');
  tagsSection.appendChild(tagsLabel);
  const tagsList = createElement('div', 'blog-post-page__tags-list');
  post.tags.forEach(tag => {
    const tagLink = createElement('a', 'blog-post-page__tag', tag);
    tagLink.href = `/blog?tag=${encodeURIComponent(tag)}`;
    tagLink.setAttribute('data-route', '');
    tagsList.appendChild(tagLink);
  });
  tagsSection.appendChild(tagsList);
  article.appendChild(tagsSection);

  // Share section - using reusable share buttons component
  const shareSection = createElement('div', 'blog-post-page__share');
  const shareButtons = createBlogShareButtons(post);
  shareSection.appendChild(shareButtons);
  article.appendChild(shareSection);

  articleWrapper.appendChild(article);

  // Sidebar
  const sidebar = createElement('aside', 'blog-post-page__sidebar');

  // Enhanced author bio card with E-E-A-T credentials
  const authorCard = createElement('div', 'blog-post-page__author-card');
  authorCard.setAttribute('itemscope', '');
  authorCard.setAttribute('itemtype', 'https://schema.org/Person');

  const authorCardImg = createElement('img', 'blog-post-page__author-card-image');
  authorCardImg.src = post.author.image;
  authorCardImg.alt = post.author.name;
  authorCardImg.setAttribute('itemprop', 'image');
  authorCard.appendChild(authorCardImg);

  const authorCardName = createElement('h3', 'blog-post-page__author-card-name');
  authorCardName.setAttribute('itemprop', 'name');
  authorCardName.textContent = post.author.name;
  authorCard.appendChild(authorCardName);

  const authorCardRole = createElement('p', 'blog-post-page__author-card-role');
  authorCardRole.setAttribute('itemprop', 'jobTitle');
  authorCardRole.textContent = post.author.role;
  authorCard.appendChild(authorCardRole);

  // Find enhanced author data for credentials
  const authorKey = Object.keys(blogAuthors).find(
    key => blogAuthors[key].name === post.author.name ||
           blogAuthors[key].name.includes(post.author.name.split(' ')[0])
  );
  const enhancedAuthor = authorKey ? blogAuthors[authorKey] as EnhancedBlogAuthor : null;

  // Show experience badge
  if (enhancedAuthor) {
    const expBadge = createElement('div', 'blog-post-page__author-experience');
    expBadge.textContent = `${enhancedAuthor.yearsExperience}+ Years Experience`;
    authorCard.appendChild(expBadge);
  }

  const authorCardBio = createElement('p', 'blog-post-page__author-card-bio');
  authorCardBio.setAttribute('itemprop', 'description');
  authorCardBio.textContent = post.author.bio;
  authorCard.appendChild(authorCardBio);

  // Show credentials
  if (enhancedAuthor && enhancedAuthor.credentials.length > 0) {
    const credentials = createElement('div', 'blog-post-page__author-credentials');
    const credTitle = createElement('span', 'blog-post-page__author-cred-title', 'Credentials:');
    credentials.appendChild(credTitle);
    const credList = createElement('ul', 'blog-post-page__author-cred-list');
    enhancedAuthor.credentials.forEach(cred => {
      const credItem = createElement('li', undefined, cred);
      credList.appendChild(credItem);
    });
    credentials.appendChild(credList);
    authorCard.appendChild(credentials);
  }

  // Author link to team page
  if (enhancedAuthor) {
    const authorLink = createElement('a', 'blog-post-page__author-link', 'View Full Profile');
    authorLink.href = `/about#team-${enhancedAuthor.teamMemberId}`;
    authorLink.setAttribute('data-route', '');
    authorLink.setAttribute('itemprop', 'url');
    authorCard.appendChild(authorLink);

    // LinkedIn link
    if (enhancedAuthor.linkedinUrl) {
      const linkedinLink = createElement('a', 'blog-post-page__author-linkedin');
      linkedinLink.href = enhancedAuthor.linkedinUrl;
      linkedinLink.target = '_blank';
      linkedinLink.rel = 'noopener noreferrer';
      linkedinLink.setAttribute('itemprop', 'sameAs');
      linkedinLink.textContent = 'Connect on LinkedIn';
      authorCard.appendChild(linkedinLink);
    }
  }

  sidebar.appendChild(authorCard);

  // Related posts
  const relatedPosts = getRelatedPosts(post, 3);
  if (relatedPosts.length > 0) {
    const relatedSection = createElement('div', 'blog-post-page__related');
    const relatedTitle = createElement('h3', 'blog-post-page__related-title', 'Related Articles');
    relatedSection.appendChild(relatedTitle);

    const relatedList = createElement('div', 'blog-post-page__related-list');
    relatedPosts.forEach(relatedPost => {
      const relatedItem = createElement('a', 'blog-post-page__related-item');
      relatedItem.href = `/blog/${relatedPost.slug}`;
      relatedItem.setAttribute('data-route', '');

      const relatedImg = createElement('img', 'blog-post-page__related-image');
      relatedImg.src = relatedPost.image;
      relatedImg.alt = relatedPost.title;
      relatedImg.loading = 'lazy';
      relatedItem.appendChild(relatedImg);

      const relatedInfo = createElement('div', 'blog-post-page__related-info');
      const relatedItemTitle = createElement('h4', 'blog-post-page__related-item-title', relatedPost.title);
      relatedInfo.appendChild(relatedItemTitle);
      const relatedDate = createElement('span', 'blog-post-page__related-date', formatBlogDate(relatedPost.date));
      relatedInfo.appendChild(relatedDate);
      relatedItem.appendChild(relatedInfo);

      relatedList.appendChild(relatedItem);
    });
    relatedSection.appendChild(relatedList);
    sidebar.appendChild(relatedSection);
  }

  // CTA card
  const ctaCard = createElement('div', 'blog-post-page__cta-card');
  const ctaTitle = createElement('h3', 'blog-post-page__cta-title', 'Looking for Property?');
  ctaCard.appendChild(ctaTitle);
  const ctaText = createElement('p', 'blog-post-page__cta-text', 'Explore our curated selection of luxury properties in Erbil.');
  ctaCard.appendChild(ctaText);
  const ctaBtn = createElement('a', 'btn btn--primary btn--block', 'View Properties');
  ctaBtn.href = '/properties';
  ctaBtn.setAttribute('data-route', '');
  ctaCard.appendChild(ctaBtn);
  sidebar.appendChild(ctaCard);

  // Popular Properties Widget
  const popularPropsWidget = createPopularPropertiesWidget(4);
  sidebar.appendChild(popularPropsWidget);

  // Popular Projects Widget
  const popularProjWidget = createPopularProjectsWidget(3);
  sidebar.appendChild(popularProjWidget);

  articleWrapper.appendChild(sidebar);
  container.appendChild(articleWrapper);

  // Related Properties/Projects Links (within article)
  const contentLinks = createBlogContentLinks(post);
  if (contentLinks.children.length > 0) {
    container.appendChild(contentLinks);
  }

  // Back to blog
  const backSection = createElement('div', 'blog-post-page__back');
  const backLink = createElement('a', 'btn btn--ghost', 'Back to Blog');
  backLink.href = '/blog';
  backLink.setAttribute('data-route', '');
  const backIcon = createSVGUse('icon-arrow-left');
  backLink.insertBefore(backIcon, backLink.firstChild);
  backSection.appendChild(backLink);
  container.appendChild(backSection);

  page.appendChild(container);

  // "You May Also Like" Section (full-width, after container)
  const youMayLikeSection = createYouMayAlsoLikeSection(post, 4);
  page.appendChild(youMayLikeSection);

  fragment.appendChild(page);

  return fragment;
}

// ─── SEO Helper for Blog Pages ─────────────────────────────────────────────
export function setupBlogPageSEO(): void {
  // Update meta tags for blog listing page (optimized for CTR)
  document.title = 'Erbil Real Estate Blog | Market Insights, Buying Guides';

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Expert Erbil real estate insights: 2025 market trends, buying guides, investment tips & neighborhood reviews. Stay informed with Real House professionals.');
  }
}

export function setupBlogPostSEO(post: BlogPost): void {
  // Update title (optimized for CTR - max 60 chars)
  const title = `${post.title} | Real House Erbil`;
  document.title = title.length <= 60 ? title : post.title.substring(0, 47) + '... | Real House';

  // Update meta description (150-160 chars with CTA)
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    const excerpt = post.excerpt.length <= 140
      ? `${post.excerpt} Read more on Real House Blog!`
      : post.excerpt;
    metaDescription.setAttribute('content', excerpt.length <= 160 ? excerpt : excerpt.substring(0, 157) + '...');
  }

  // Update canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `https://realhouseiq.com/blog/${post.slug}`);
  }

  // Update Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', post.title);
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', post.excerpt);
  }

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', `https://realhouseiq.com/blog/${post.slug}`);
  }

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) {
    ogImage.setAttribute('content', post.image);
  }

  const ogType = document.querySelector('meta[property="og:type"]');
  if (ogType) {
    ogType.setAttribute('content', 'article');
  }

  // Update Twitter Card tags
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute('content', post.title);
  }

  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) {
    twitterDescription.setAttribute('content', post.excerpt);
  }

  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  if (twitterImage) {
    twitterImage.setAttribute('content', post.image);
  }

  // Add Article-specific structured data with enhanced E-E-A-T author schema
  const existingArticleSchema = document.querySelector('script[data-schema="article"]');
  if (existingArticleSchema) {
    existingArticleSchema.remove();
  }

  // Find enhanced author from blogAuthors
  const authorKey = Object.keys(blogAuthors).find(
    key => blogAuthors[key].name === post.author.name ||
           blogAuthors[key].name.includes(post.author.name.split(' ')[0])
  );
  const enhancedAuthor = authorKey ? blogAuthors[authorKey] : null;

  // Build author schema with E-E-A-T signals
  const authorSchema = enhancedAuthor ? generateBlogAuthorSchema(enhancedAuthor) : {
    '@type': 'Person',
    'name': post.author.name,
    'jobTitle': post.author.role,
    'image': post.author.image,
    'worksFor': {
      '@type': 'RealEstateAgent',
      'name': 'Real House',
      'url': 'https://realhouseiq.com'
    }
  };

  const articleSchema = document.createElement('script');
  articleSchema.type = 'application/ld+json';
  articleSchema.setAttribute('data-schema', 'article');
  articleSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': post.title,
    'description': post.excerpt,
    'image': {
      '@type': 'ImageObject',
      'url': post.image,
      'width': 1200,
      'height': 630
    },
    'author': authorSchema,
    'publisher': {
      '@type': 'RealEstateAgent',
      'name': 'Real House',
      'url': 'https://realhouseiq.com',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://realhouseiq.com/favicon.svg',
        'width': 512,
        'height': 512
      },
      'foundingDate': '2001',
      'numberOfEmployees': '25+',
      'areaServed': {
        '@type': 'Place',
        'name': 'Kurdistan Region, Iraq'
      }
    },
    'datePublished': post.date,
    'dateModified': post.date,
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://realhouseiq.com/blog/${post.slug}`
    },
    'keywords': post.tags.join(', '),
    'articleSection': post.category,
    'inLanguage': 'en',
    'isAccessibleForFree': true,
    'copyrightYear': new Date(post.date).getFullYear(),
    'copyrightHolder': {
      '@type': 'Organization',
      'name': 'Real House'
    }
  });
  document.head.appendChild(articleSchema);

  // Add BreadcrumbList schema
  const existingBreadcrumbSchema = document.querySelector('script[data-schema="breadcrumb"]');
  if (existingBreadcrumbSchema) {
    existingBreadcrumbSchema.remove();
  }

  const breadcrumbSchema = document.createElement('script');
  breadcrumbSchema.type = 'application/ld+json';
  breadcrumbSchema.setAttribute('data-schema', 'breadcrumb');
  breadcrumbSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://realhouseiq.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Blog',
        'item': 'https://realhouseiq.com/blog'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': post.title,
        'item': `https://realhouseiq.com/blog/${post.slug}`
      }
    ]
  });
  document.head.appendChild(breadcrumbSchema);
}
