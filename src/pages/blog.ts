// ═══════════════════════════════════════════════════════════════════════════
// Blog Pages Renderer for Real House
// SEO-Optimized Blog Listing and Detail Pages
// ═══════════════════════════════════════════════════════════════════════════

import { t } from '../i18n';
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
import { createEmptyState } from '../utils/ui-states';
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
  imageLink.setAttribute('aria-label', t('blog.readArticleAria', { title: post.title }));

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
  const readTime = createElement('span', 'blog-card__read-time', `${post.readTime} ${t('blog.minRead')}`);
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

  const readMoreLink = createElement('a', 'blog-card__read-more', t('blog.readArticle'));
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
    const emptyState = createEmptyState({
      icon: 'search',
      title: t('blog.noArticlesFound'),
      description: t('blog.tryAdjustingFilters'),
      primaryAction: {
        label: t('blog.filterAll'),
        onClick: () => {
          currentBlogFilterState = { category: 'All', searchQuery: '' };
          const searchInputs = document.querySelectorAll<HTMLInputElement>(
            '.blog-page__search-input, .blog-hero__search-input'
          );
          searchInputs.forEach((i) => (i.value = ''));
          document.querySelectorAll('.blog-page__category-btn').forEach((b) => {
            b.classList.toggle('active', b.getAttribute('data-category') === 'All');
          });
          filterAndRenderPosts(grid);
        }
      },
      className: 'blog-page__empty'
    });
    grid.appendChild(emptyState);
  } else {
    filteredPosts.forEach(post => {
      grid.appendChild(createBlogCard(post));
    });
  }
}

// ─── Cinematic Hero ────────────────────────────────────────────────────────
function createBlogHero(): HTMLElement {
  const hero = createElement('section', 'blog-hero');

  // Decorative atmospheric layers
  const grain = createElement('div', 'blog-hero__grain');
  hero.appendChild(grain);
  const aurora = createElement('div', 'blog-hero__aurora');
  hero.appendChild(aurora);

  const heroInner = createElement('div', 'blog-hero__inner');

  // Issue badge
  const issue = createElement('div', 'blog-hero__issue');
  const issueLabel = createElement('span', 'blog-hero__issue-label', 'The Journal');
  issue.appendChild(issueLabel);
  const issueDot = createElement('span', 'blog-hero__issue-dot');
  issue.appendChild(issueDot);
  const issueNum = createElement('span', 'blog-hero__issue-num', `Vol. ${blogPosts.length.toString().padStart(2, '0')}`);
  issue.appendChild(issueNum);
  heroInner.appendChild(issue);

  // Eyebrow
  const eyebrow = createElement('div', 'blog-hero__eyebrow', 'Erbil · Kurdistan · Property Intelligence');
  heroInner.appendChild(eyebrow);

  // Title — split for animation
  const title = createElement('h1', 'blog-hero__title');
  const titlePrefix = createElement('span', 'blog-hero__title-line');
  titlePrefix.textContent = t('blog.heroTitle');
  title.appendChild(titlePrefix);
  const em = createElement('em', 'blog-hero__title-em', t('blog.heroTitleEmphasis'));
  title.appendChild(em);
  const titleSuffix = createElement('span', 'blog-hero__title-line', t('blog.heroSubtitle'));
  title.appendChild(titleSuffix);
  heroInner.appendChild(title);

  const subtitle = createElement('p', 'blog-hero__subtitle', t('blog.pageSubtitle'));
  heroInner.appendChild(subtitle);

  // Hero search
  const searchForm = createElement('form', 'blog-hero__search');
  searchForm.setAttribute('role', 'search');
  searchForm.addEventListener('submit', (e) => e.preventDefault());
  const searchIcon = createSVGUse('icon-search');
  searchIcon.classList.add('blog-hero__search-icon');
  searchForm.appendChild(searchIcon);
  const searchInput = createElement('input', 'blog-hero__search-input');
  searchInput.type = 'text';
  searchInput.placeholder = t('blog.searchPlaceholder');
  searchInput.setAttribute('aria-label', t('blog.searchAriaLabel'));
  searchInput.id = 'blog-hero-search';
  searchForm.appendChild(searchInput);
  const searchKbd = createElement('kbd', 'blog-hero__search-kbd', '↵');
  searchForm.appendChild(searchKbd);
  heroInner.appendChild(searchForm);

  // Quick category chips
  const quick = createElement('div', 'blog-hero__quick');
  const quickLabel = createElement('span', 'blog-hero__quick-label', 'Popular');
  quick.appendChild(quickLabel);
  ['Market Trends', 'Investment', 'Neighborhoods', 'Buying Guide'].forEach(cat => {
    const chip = createElement('button', 'blog-hero__quick-chip', cat);
    chip.setAttribute('data-category', cat);
    chip.setAttribute('type', 'button');
    quick.appendChild(chip);
  });
  heroInner.appendChild(quick);

  // Stats strip
  const stats = createElement('div', 'blog-hero__stats');
  const totalReads = blogPosts.reduce((acc, p) => acc + p.readTime, 0);
  const statsData = [
    { num: blogPosts.length.toString(), label: 'Articles' },
    { num: blogCategories.length.toString(), label: 'Topics' },
    { num: `${totalReads}m`, label: 'Of Reading' }
  ];
  statsData.forEach(s => {
    const stat = createElement('div', 'blog-hero__stat');
    const n = createElement('div', 'blog-hero__stat-num', s.num);
    stat.appendChild(n);
    const l = createElement('div', 'blog-hero__stat-label', s.label);
    stat.appendChild(l);
    stats.appendChild(stat);
  });
  heroInner.appendChild(stats);

  hero.appendChild(heroInner);
  return hero;
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

  // Breadcrumbs above hero
  const breadcrumbContainer = createElement('div', 'container');
  const breadcrumbItems = getBlogBreadcrumbs();
  breadcrumbContainer.appendChild(createBreadcrumbs(breadcrumbItems));
  injectBreadcrumbSchema(breadcrumbItems);
  page.appendChild(breadcrumbContainer);

  // Cinematic hero
  page.appendChild(createBlogHero());

  const container = createElement('div', 'container');

  // Featured posts section — editorial layout
  const featuredPosts = getFeaturedPosts();
  if (featuredPosts.length > 0) {
    const featuredSection = createElement('section', 'blog-page__featured');

    const featuredHeader = createElement('div', 'blog-page__section-head');
    const featuredKicker = createElement('span', 'blog-page__kicker', '— Editor’s Selection');
    featuredHeader.appendChild(featuredKicker);
    const featuredTitle = createElement('h2', 'blog-page__section-title', t('blog.featuredArticles'));
    featuredHeader.appendChild(featuredTitle);
    featuredSection.appendChild(featuredHeader);

    const featuredGrid = createElement('div', 'blog-page__featured-grid');
    featuredPosts.slice(0, 3).forEach((post, index) => {
      featuredGrid.appendChild(createBlogCard(post, index === 0));
    });
    featuredSection.appendChild(featuredGrid);

    container.appendChild(featuredSection);
  }

  // Sticky filters bar
  const filters = createElement('div', 'blog-page__filters');

  // Search input
  const searchWrapper = createElement('div', 'blog-page__search');
  const searchIcon = createSVGUse('icon-search');
  searchIcon.classList.add('blog-page__search-icon');
  searchWrapper.appendChild(searchIcon);
  const searchInput = createElement('input', 'blog-page__search-input');
  searchInput.type = 'text';
  searchInput.placeholder = t('blog.searchPlaceholder');
  searchInput.setAttribute('aria-label', t('blog.searchAriaLabel'));
  searchWrapper.appendChild(searchInput);
  filters.appendChild(searchWrapper);

  // Category filters with count badges
  const categoryWrapper = createElement('div', 'blog-page__categories');
  const allBtn = createElement('button', 'blog-page__category-btn active');
  allBtn.setAttribute('data-category', 'All');
  const allLabel = createElement('span', 'blog-page__category-label', t('blog.filterAll'));
  allBtn.appendChild(allLabel);
  const allCount = createElement('span', 'blog-page__category-count', blogPosts.length.toString());
  allBtn.appendChild(allCount);
  categoryWrapper.appendChild(allBtn);

  blogCategories.forEach(category => {
    const count = blogPosts.filter(p => p.category === category).length;
    if (count === 0) return;
    const btn = createElement('button', 'blog-page__category-btn');
    btn.setAttribute('data-category', category);
    const lbl = createElement('span', 'blog-page__category-label', category);
    btn.appendChild(lbl);
    const cnt = createElement('span', 'blog-page__category-count', count.toString());
    btn.appendChild(cnt);
    categoryWrapper.appendChild(btn);
  });
  filters.appendChild(categoryWrapper);

  container.appendChild(filters);

  // All posts section
  const postsSection = createElement('section', 'blog-page__posts');
  const postsHeader = createElement('div', 'blog-page__section-head');
  const postsKicker = createElement('span', 'blog-page__kicker', '— The Library');
  postsHeader.appendChild(postsKicker);
  const postsTitle = createElement('h2', 'blog-page__section-title', t('blog.allArticles'));
  postsHeader.appendChild(postsTitle);
  postsSection.appendChild(postsHeader);

  const postsGrid = createElement('div', 'blog-page__grid');
  blogPosts.forEach(post => {
    postsGrid.appendChild(createBlogCard(post));
  });
  postsSection.appendChild(postsGrid);

  container.appendChild(postsSection);

  // Newsletter signup — editorial style
  const ctaSection = createElement('section', 'blog-newsletter');
  const ctaInner = createElement('div', 'blog-newsletter__inner');
  const ctaKicker = createElement('div', 'blog-newsletter__kicker', '— Dispatch');
  ctaInner.appendChild(ctaKicker);
  const ctaTitle = createElement('h2', 'blog-newsletter__title');
  ctaTitle.textContent = 'The ';
  const ctaEm = createElement('em', undefined, 'Erbil Brief');
  ctaTitle.appendChild(ctaEm);
  ctaInner.appendChild(ctaTitle);
  const ctaText = createElement('p', 'blog-newsletter__text', t('blog.stayUpdatedText'));
  ctaInner.appendChild(ctaText);

  const ctaForm = createElement('form', 'blog-newsletter__form');
  ctaForm.addEventListener('submit', (e) => e.preventDefault());
  const ctaEmail = createElement('input', 'blog-newsletter__input');
  ctaEmail.type = 'email';
  ctaEmail.placeholder = 'your@email.com';
  ctaEmail.setAttribute('aria-label', 'Email address');
  ctaForm.appendChild(ctaEmail);
  const ctaSubmit = createElement('button', 'blog-newsletter__submit');
  ctaSubmit.type = 'submit';
  ctaSubmit.appendChild(document.createTextNode('Subscribe'));
  ctaSubmit.appendChild(createSVGUse('icon-arrow-right'));
  ctaForm.appendChild(ctaSubmit);
  ctaInner.appendChild(ctaForm);

  const ctaFine = createElement('p', 'blog-newsletter__fine', 'No spam. Unsubscribe any time. Twice-monthly intelligence on Erbil property.');
  ctaInner.appendChild(ctaFine);

  ctaSection.appendChild(ctaInner);
  container.appendChild(ctaSection);

  page.appendChild(container);

  // ─── Location Links Section ─────────────────────────────────────────────
  const locationLinks = createLocationLinks();
  page.appendChild(locationLinks);

  // ─── Property & Project Browse CTA ─────────────────────────────────────
  const browseCta = createInternalCTA(
    t('blog.readyToFindDreamProperty'),
    t('blog.exploreOurSelection'),
    { text: t('blog.browseProperties'), url: '/properties' },
    { text: t('blog.viewProjects'), url: '/projects' }
  );
  page.appendChild(browseCta);

  fragment.appendChild(page);

  // Add event listeners after DOM is ready
  setTimeout(() => {
    const grid = document.querySelector('.blog-page__grid') as HTMLElement | null;
    const filtersBar = document.querySelector('.blog-page__filters') as HTMLElement | null;

    const setCategory = (cat: string): void => {
      currentBlogFilterState.category = cat;
      document.querySelectorAll('.blog-page__category-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-category') === cat);
      });
      if (grid) filterAndRenderPosts(grid);
      // Smooth-scroll to results
      const postsSection = document.querySelector('.blog-page__posts');
      if (postsSection) postsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Category filter buttons
    document.querySelectorAll('.blog-page__category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setCategory(btn.getAttribute('data-category') || 'All');
      });
    });

    // Hero quick-filter chips
    document.querySelectorAll('.blog-hero__quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        setCategory(chip.getAttribute('data-category') || 'All');
      });
    });

    // Filter-bar search
    const search = document.querySelector('.blog-page__search-input') as HTMLInputElement | null;
    const heroSearch = document.querySelector('.blog-hero__search-input') as HTMLInputElement | null;
    let debounceTimer: number;
    const onSearchInput = (value: string): void => {
      clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => {
        currentBlogFilterState.searchQuery = value;
        if (grid) filterAndRenderPosts(grid);
      }, 250);
    };

    if (search) {
      search.addEventListener('input', () => {
        if (heroSearch) heroSearch.value = search.value;
        onSearchInput(search.value);
      });
    }
    if (heroSearch) {
      heroSearch.addEventListener('input', () => {
        if (search) search.value = heroSearch.value;
        onSearchInput(heroSearch.value);
      });
    }

    // Sticky search bar — toggle compact state on scroll
    if (filtersBar) {
      const onScroll = (): void => {
        const rect = filtersBar.getBoundingClientRect();
        // When the bar sticks to the top (its top is at/near 0), add a class
        filtersBar.classList.toggle('is-stuck', rect.top <= 8);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
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
    const errorTitle = createElement('h1', undefined, t('blog.articleNotFound'));
    errorContent.appendChild(errorTitle);
    const errorText = createElement('p', undefined, t('blog.articleNotFoundText'));
    errorContent.appendChild(errorText);
    const backLink = createElement('a', 'btn btn--primary', t('blog.backToBlog'));
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

  // Reading progress bar (fixed at top)
  const progress = createElement('div', 'blog-progress');
  progress.setAttribute('role', 'progressbar');
  progress.setAttribute('aria-label', 'Reading progress');
  const progressBar = createElement('div', 'blog-progress__bar');
  progress.appendChild(progressBar);
  page.appendChild(progress);

  // Hero section — cinematic with overlayed meta
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

  // Hero content (overlayed on image)
  const heroContent = createElement('div', 'blog-post-page__hero-content');
  const heroContentInner = createElement('div', 'blog-post-page__hero-inner');

  const heroCategory = createElement('a', 'blog-post-page__hero-category', post.category);
  heroCategory.href = `/blog?category=${encodeURIComponent(post.category)}`;
  heroCategory.setAttribute('data-route', '');
  heroContentInner.appendChild(heroCategory);

  const heroTitle = createElement('h1', 'blog-post-page__hero-title', post.title);
  heroContentInner.appendChild(heroTitle);

  const heroMeta = createElement('div', 'blog-post-page__hero-meta');
  const heroAuthor = createElement('div', 'blog-post-page__hero-author');
  const heroAuthorImg = createElement('img', 'blog-post-page__hero-author-img');
  heroAuthorImg.src = post.author.image;
  heroAuthorImg.alt = post.author.name;
  heroAuthor.appendChild(heroAuthorImg);
  const heroAuthorText = createElement('div', 'blog-post-page__hero-author-text');
  const heroAuthorLabel = createElement('span', 'blog-post-page__hero-author-label', 'Written by');
  heroAuthorText.appendChild(heroAuthorLabel);
  const heroAuthorName = createElement('span', 'blog-post-page__hero-author-name', post.author.name);
  heroAuthorText.appendChild(heroAuthorName);
  heroAuthor.appendChild(heroAuthorText);
  heroMeta.appendChild(heroAuthor);

  const heroDivider = createElement('span', 'blog-post-page__hero-divider');
  heroMeta.appendChild(heroDivider);

  const heroDate = document.createElement('time');
  heroDate.className = 'blog-post-page__hero-date';
  heroDate.setAttribute('datetime', new Date(post.date).toISOString());
  heroDate.textContent = formatBlogDate(post.date);
  heroMeta.appendChild(heroDate);

  const heroDivider2 = createElement('span', 'blog-post-page__hero-divider');
  heroMeta.appendChild(heroDivider2);

  const heroRead = createElement('span', 'blog-post-page__hero-read', `${post.readTime} ${t('blog.minRead')}`);
  heroMeta.appendChild(heroRead);

  heroContentInner.appendChild(heroMeta);
  heroContent.appendChild(heroContentInner);
  hero.appendChild(heroContent);

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
  readTimeSpan.appendChild(document.createTextNode(`${post.readTime} ${t('blog.minRead')}`));
  metaDetails.appendChild(readTimeSpan);
  articleMeta.appendChild(metaDetails);

  articleHeader.appendChild(articleMeta);
  article.appendChild(articleHeader);

  // Article content - safely parsed
  const articleContent = createElement('div', 'blog-post-page__content');
  articleContent.appendChild(parseArticleContent(post.content));

  // Apply drop-cap to first paragraph & assign ids to headings for TOC
  const firstP = articleContent.querySelector('p');
  if (firstP && (firstP.textContent || '').trim().length > 30) {
    firstP.classList.add('blog-post-page__content-lead');
  }

  const slugify = (s: string): string =>
    s.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .slice(0, 60);

  const tocEntries: Array<{ id: string; text: string; level: number }> = [];
  articleContent.querySelectorAll('h2, h3').forEach((h, idx) => {
    const text = (h.textContent || '').trim();
    if (!text) return;
    const id = `section-${slugify(text)}-${idx}`;
    h.id = id;
    tocEntries.push({ id, text, level: h.tagName === 'H2' ? 2 : 3 });
  });

  article.appendChild(articleContent);

  // Pull quote — inject after lead paragraph if a <strong> exists in a paragraph
  // (Optional decorative element drawn from existing strong text in second paragraph)
  const paragraphs = articleContent.querySelectorAll('p');
  if (paragraphs.length >= 3) {
    const strongInThird = paragraphs[2].querySelector('strong');
    if (strongInThird && (strongInThird.textContent || '').length > 24) {
      const pull = createElement('aside', 'blog-post-page__pullquote');
      const pullText = createElement('p', 'blog-post-page__pullquote-text', strongInThird.textContent || '');
      pull.appendChild(pullText);
      const pullAttr = createElement('cite', 'blog-post-page__pullquote-cite', `— ${post.author.name}`);
      pull.appendChild(pullAttr);
      paragraphs[2].after(pull);
    }
  }

  // Tags
  const tagsSection = createElement('div', 'blog-post-page__tags');
  const tagsLabel = createElement('span', 'blog-post-page__tags-label', t('blog.tags'));
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

  // Table of Contents — sticky on desktop, accordion on mobile
  if (tocEntries.length > 1) {
    const tocCard = createElement('details', 'blog-post-page__toc');
    tocCard.setAttribute('open', '');
    const tocSummary = document.createElement('summary');
    tocSummary.className = 'blog-post-page__toc-summary';
    const tocLabel = createElement('span', 'blog-post-page__toc-label', 'On this page');
    tocSummary.appendChild(tocLabel);
    const tocChevron = createSVGUse('icon-chevron-down');
    tocChevron.classList.add('blog-post-page__toc-chevron');
    tocSummary.appendChild(tocChevron);
    tocCard.appendChild(tocSummary);

    const tocList = createElement('ol', 'blog-post-page__toc-list');
    tocEntries.forEach((entry, idx) => {
      const li = createElement('li', `blog-post-page__toc-item blog-post-page__toc-item--l${entry.level}`);
      const num = createElement('span', 'blog-post-page__toc-num', String(idx + 1).padStart(2, '0'));
      li.appendChild(num);
      const link = createElement('a', 'blog-post-page__toc-link', entry.text);
      link.href = `#${entry.id}`;
      link.setAttribute('data-toc-target', entry.id);
      li.appendChild(link);
      tocList.appendChild(li);
    });
    tocCard.appendChild(tocList);
    sidebar.appendChild(tocCard);
  }

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
    expBadge.textContent = t('blog.yearsExperience', { years: enhancedAuthor.yearsExperience });
    authorCard.appendChild(expBadge);
  }

  const authorCardBio = createElement('p', 'blog-post-page__author-card-bio');
  authorCardBio.setAttribute('itemprop', 'description');
  authorCardBio.textContent = post.author.bio;
  authorCard.appendChild(authorCardBio);

  // Show credentials
  if (enhancedAuthor && enhancedAuthor.credentials.length > 0) {
    const credentials = createElement('div', 'blog-post-page__author-credentials');
    const credTitle = createElement('span', 'blog-post-page__author-cred-title', t('blog.credentials'));
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
    const authorLink = createElement('a', 'blog-post-page__author-link', t('blog.viewFullProfile'));
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
      linkedinLink.textContent = t('blog.connectOnLinkedIn');
      authorCard.appendChild(linkedinLink);
    }
  }

  sidebar.appendChild(authorCard);

  // Related posts
  const relatedPosts = getRelatedPosts(post, 3);
  if (relatedPosts.length > 0) {
    const relatedSection = createElement('div', 'blog-post-page__related');
    const relatedTitle = createElement('h3', 'blog-post-page__related-title', t('blog.relatedArticles'));
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
  const ctaTitle = createElement('h3', 'blog-post-page__cta-title', t('blog.lookingForProperty'));
  ctaCard.appendChild(ctaTitle);
  const ctaText = createElement('p', 'blog-post-page__cta-text', t('blog.lookingForPropertyText'));
  ctaCard.appendChild(ctaText);
  const ctaBtn = createElement('a', 'btn btn--primary btn--block', t('blog.viewProperties'));
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

  // Continue Reading — next article CTA
  const allPostsSorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentIdx = allPostsSorted.findIndex(p => p.id === post.id);
  const nextPost = currentIdx >= 0
    ? allPostsSorted[(currentIdx + 1) % allPostsSorted.length]
    : null;

  if (nextPost && nextPost.id !== post.id) {
    const continueCta = createElement('aside', 'blog-continue');
    const continueLink = createElement('a', 'blog-continue__link');
    continueLink.href = `/blog/${nextPost.slug}`;
    continueLink.setAttribute('data-route', '');

    const continueText = createElement('div', 'blog-continue__text');
    const continueKicker = createElement('span', 'blog-continue__kicker', 'Continue Reading →');
    continueText.appendChild(continueKicker);
    const continueCategory = createElement('span', 'blog-continue__category', nextPost.category);
    continueText.appendChild(continueCategory);
    const continueTitle = createElement('h3', 'blog-continue__title', nextPost.title);
    continueText.appendChild(continueTitle);
    const continueMeta = createElement('div', 'blog-continue__meta');
    const continueDate = createElement('span', undefined, formatBlogDate(nextPost.date));
    continueMeta.appendChild(continueDate);
    const continueDot = createElement('span', 'blog-continue__dot', '·');
    continueMeta.appendChild(continueDot);
    const continueRead = createElement('span', undefined, `${nextPost.readTime} ${t('blog.minRead')}`);
    continueMeta.appendChild(continueRead);
    continueText.appendChild(continueMeta);
    continueLink.appendChild(continueText);

    const continueImageWrap = createElement('div', 'blog-continue__image-wrap');
    const continueImg = createElement('img', 'blog-continue__image');
    continueImg.src = nextPost.image;
    continueImg.alt = nextPost.title;
    continueImg.loading = 'lazy';
    continueImageWrap.appendChild(continueImg);
    continueLink.appendChild(continueImageWrap);

    continueCta.appendChild(continueLink);
    container.appendChild(continueCta);
  }

  // Newsletter signup — before footer
  const newsletter = createElement('section', 'blog-newsletter blog-newsletter--post');
  const nInner = createElement('div', 'blog-newsletter__inner');
  const nKicker = createElement('div', 'blog-newsletter__kicker', '— Dispatch');
  nInner.appendChild(nKicker);
  const nTitle = createElement('h2', 'blog-newsletter__title');
  nTitle.textContent = 'Never miss an ';
  const nEm = createElement('em', undefined, 'edition');
  nTitle.appendChild(nEm);
  nInner.appendChild(nTitle);
  const nText = createElement('p', 'blog-newsletter__text', 'Curated property intelligence for Erbil, delivered to your inbox twice a month.');
  nInner.appendChild(nText);
  const nForm = createElement('form', 'blog-newsletter__form');
  nForm.addEventListener('submit', (e) => e.preventDefault());
  const nEmail = createElement('input', 'blog-newsletter__input');
  nEmail.type = 'email';
  nEmail.placeholder = 'your@email.com';
  nEmail.setAttribute('aria-label', 'Email address');
  nForm.appendChild(nEmail);
  const nSubmit = createElement('button', 'blog-newsletter__submit');
  nSubmit.type = 'submit';
  nSubmit.appendChild(document.createTextNode('Subscribe'));
  nSubmit.appendChild(createSVGUse('icon-arrow-right'));
  nForm.appendChild(nSubmit);
  nInner.appendChild(nForm);
  newsletter.appendChild(nInner);
  container.appendChild(newsletter);

  // Back to blog
  const backSection = createElement('div', 'blog-post-page__back');
  const backLink = createElement('a', 'btn btn--ghost', t('blog.backToBlog'));
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

  // Wire reading progress + TOC active state after DOM is mounted
  setTimeout(() => {
    const bar = document.querySelector('.blog-progress__bar') as HTMLElement | null;
    const articleEl = document.querySelector('.blog-post-page__article') as HTMLElement | null;
    if (bar && articleEl) {
      const updateProgress = (): void => {
        const rect = articleEl.getBoundingClientRect();
        const total = articleEl.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const pct = total > 0 ? Math.max(0, Math.min(100, (scrolled / total) * 100)) : 0;
        bar.style.width = `${pct}%`;
      };
      window.addEventListener('scroll', updateProgress, { passive: true });
      window.addEventListener('resize', updateProgress);
      updateProgress();
    }

    // TOC: highlight active section via IntersectionObserver
    const tocLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.blog-post-page__toc-link'));
    if (tocLinks.length > 0 && 'IntersectionObserver' in window) {
      const headingMap = new Map<string, HTMLAnchorElement>();
      tocLinks.forEach(link => {
        const target = link.getAttribute('data-toc-target');
        if (target) headingMap.set(target, link);
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const link = headingMap.get(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            tocLinks.forEach(l => l.classList.remove('is-active'));
            link.classList.add('is-active');
          }
        });
      }, { rootMargin: '-20% 0px -70% 0px' });

      headingMap.forEach((_, id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });

      // Smooth scroll on click
      tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const target = link.getAttribute('data-toc-target');
          if (!target) return;
          const el = document.getElementById(target);
          if (!el) return;
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }
  }, 0);

  return fragment;
}

// ─── SEO Helper for Blog Pages ─────────────────────────────────────────────
export function setupBlogPageSEO(): void {
  // Update meta tags for blog listing page (optimized for CTR)
  document.title = t('blog.metaTitle');

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', t('blog.metaDescription'));
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
