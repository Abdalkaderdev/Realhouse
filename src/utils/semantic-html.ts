// ═══════════════════════════════════════════════════════════════════════════
// Semantic HTML Utilities
// Helpers for creating accessible, SEO-friendly HTML elements
// ═══════════════════════════════════════════════════════════════════════════

// ─── Element Creation Helper ──────────────────────────────────────────────
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  textContent?: string
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

// ─── Figure with Figcaption ───────────────────────────────────────────────
export interface FigureOptions {
  className?: string;
  caption?: string;
  captionClass?: string;
  captionPosition?: 'above' | 'below';
}

export function createFigure(
  content: HTMLElement | HTMLElement[],
  options: FigureOptions = {}
): HTMLElement {
  const figure = createElement('figure', options.className);

  const contentArray = Array.isArray(content) ? content : [content];

  if (options.caption && options.captionPosition === 'above') {
    const figcaption = createElement('figcaption', options.captionClass, options.caption);
    figure.appendChild(figcaption);
  }

  contentArray.forEach(el => figure.appendChild(el));

  if (options.caption && options.captionPosition !== 'above') {
    const figcaption = createElement('figcaption', options.captionClass, options.caption);
    figure.appendChild(figcaption);
  }

  return figure;
}

// ─── Time Element ─────────────────────────────────────────────────────────
export interface TimeOptions {
  className?: string;
  displayFormat?: 'full' | 'date' | 'relative' | 'custom';
  customText?: string;
}

export function createTimeElement(
  date: Date | string,
  options: TimeOptions = {}
): HTMLTimeElement {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const time = document.createElement('time');

  if (options.className) time.className = options.className;

  // ISO 8601 format for datetime attribute
  time.setAttribute('datetime', dateObj.toISOString());

  // Display text
  if (options.customText) {
    time.textContent = options.customText;
  } else {
    switch (options.displayFormat) {
      case 'date':
        time.textContent = dateObj.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        break;
      case 'relative':
        time.textContent = getRelativeTimeString(dateObj);
        break;
      case 'full':
      default:
        time.textContent = dateObj.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        break;
    }
  }

  return time;
}

function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

// ─── Address Element ──────────────────────────────────────────────────────
export interface AddressInfo {
  streetAddress?: string;
  locality?: string;      // City
  region?: string;        // State/Region
  postalCode?: string;
  country?: string;
  phone?: string;
  email?: string;
}

export function createAddressElement(
  info: AddressInfo,
  className?: string
): HTMLElement {
  const address = document.createElement('address');
  if (className) address.className = className;

  // Add microdata for structured data
  address.setAttribute('itemscope', '');
  address.setAttribute('itemtype', 'https://schema.org/PostalAddress');

  const parts: HTMLElement[] = [];

  if (info.streetAddress) {
    const span = createElement('span', 'address__street');
    span.setAttribute('itemprop', 'streetAddress');
    span.textContent = info.streetAddress;
    parts.push(span);
  }

  if (info.locality) {
    const span = createElement('span', 'address__locality');
    span.setAttribute('itemprop', 'addressLocality');
    span.textContent = info.locality;
    parts.push(span);
  }

  if (info.region) {
    const span = createElement('span', 'address__region');
    span.setAttribute('itemprop', 'addressRegion');
    span.textContent = info.region;
    parts.push(span);
  }

  if (info.postalCode) {
    const span = createElement('span', 'address__postal-code');
    span.setAttribute('itemprop', 'postalCode');
    span.textContent = info.postalCode;
    parts.push(span);
  }

  if (info.country) {
    const span = createElement('span', 'address__country');
    span.setAttribute('itemprop', 'addressCountry');
    span.textContent = info.country;
    parts.push(span);
  }

  // Add address text with separators
  parts.forEach((part, index) => {
    address.appendChild(part);
    if (index < parts.length - 1) {
      address.appendChild(document.createTextNode(', '));
    }
  });

  // Add contact info on new line
  if (info.phone || info.email) {
    address.appendChild(document.createElement('br'));

    if (info.phone) {
      const phoneLink = createElement('a', 'address__phone');
      phoneLink.href = `tel:${info.phone.replace(/\s/g, '')}`;
      phoneLink.setAttribute('itemprop', 'telephone');
      phoneLink.textContent = info.phone;
      address.appendChild(phoneLink);
    }

    if (info.phone && info.email) {
      address.appendChild(document.createTextNode(' | '));
    }

    if (info.email) {
      const emailLink = createElement('a', 'address__email');
      emailLink.href = `mailto:${info.email}`;
      emailLink.setAttribute('itemprop', 'email');
      emailLink.textContent = info.email;
      address.appendChild(emailLink);
    }
  }

  return address;
}

// ─── Section with Heading ─────────────────────────────────────────────────
export interface SectionOptions {
  id?: string;
  className?: string;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  headingText?: string;
  headingClass?: string;
  headingId?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

export function createSection(
  options: SectionOptions = {}
): HTMLElement {
  const section = createElement('section', options.className);

  if (options.id) section.id = options.id;

  if (options.ariaLabel) {
    section.setAttribute('aria-label', options.ariaLabel);
  } else if (options.ariaLabelledBy) {
    section.setAttribute('aria-labelledby', options.ariaLabelledBy);
  } else if (options.headingId) {
    section.setAttribute('aria-labelledby', options.headingId);
  }

  if (options.headingText) {
    const headingLevel = options.headingLevel || 2;
    const heading = document.createElement(`h${headingLevel}`) as HTMLHeadingElement;
    if (options.headingClass) heading.className = options.headingClass;
    if (options.headingId) heading.id = options.headingId;
    heading.textContent = options.headingText;
    section.appendChild(heading);
  }

  return section;
}

// ─── Article Element ──────────────────────────────────────────────────────
export interface ArticleOptions {
  id?: string;
  className?: string;
  itemType?: string;  // Schema.org type
  ariaLabel?: string;
}

export function createArticle(
  options: ArticleOptions = {}
): HTMLElement {
  const article = createElement('article', options.className);

  if (options.id) article.id = options.id;
  if (options.ariaLabel) article.setAttribute('aria-label', options.ariaLabel);

  if (options.itemType) {
    article.setAttribute('itemscope', '');
    article.setAttribute('itemtype', options.itemType);
  }

  return article;
}

// ─── Navigation with ARIA ─────────────────────────────────────────────────
export interface NavOptions {
  id?: string;
  className?: string;
  ariaLabel: string;  // Required for accessibility
  ariaLabelledBy?: string;
}

export function createNav(
  options: NavOptions
): HTMLElement {
  const nav = createElement('nav', options.className);

  if (options.id) nav.id = options.id;

  if (options.ariaLabelledBy) {
    nav.setAttribute('aria-labelledby', options.ariaLabelledBy);
  } else {
    nav.setAttribute('aria-label', options.ariaLabel);
  }

  return nav;
}

// ─── Aside/Sidebar ────────────────────────────────────────────────────────
export interface AsideOptions {
  id?: string;
  className?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

export function createAside(
  options: AsideOptions = {}
): HTMLElement {
  const aside = createElement('aside', options.className);

  if (options.id) aside.id = options.id;
  if (options.ariaLabel) aside.setAttribute('aria-label', options.ariaLabel);
  if (options.ariaLabelledBy) aside.setAttribute('aria-labelledby', options.ariaLabelledBy);

  return aside;
}

// ─── Ordered/Unordered List ───────────────────────────────────────────────
export interface ListOptions {
  type?: 'ul' | 'ol';
  className?: string;
  itemClassName?: string;
  ariaLabel?: string;
}

export function createList(
  items: (string | HTMLElement)[],
  options: ListOptions = {}
): HTMLElement {
  const list = document.createElement(options.type || 'ul');
  if (options.className) list.className = options.className;
  if (options.ariaLabel) list.setAttribute('aria-label', options.ariaLabel);

  items.forEach(item => {
    const li = createElement('li', options.itemClassName);
    if (typeof item === 'string') {
      li.textContent = item;
    } else {
      li.appendChild(item);
    }
    list.appendChild(li);
  });

  return list;
}

// ─── Definition List ──────────────────────────────────────────────────────
export interface DefinitionItem {
  term: string;
  definition: string | HTMLElement;
  termClass?: string;
  definitionClass?: string;
}

export function createDefinitionList(
  items: DefinitionItem[],
  className?: string
): HTMLDListElement {
  const dl = document.createElement('dl');
  if (className) dl.className = className;

  items.forEach(item => {
    const dt = createElement('dt', item.termClass, item.term);
    const dd = createElement('dd', item.definitionClass);

    if (typeof item.definition === 'string') {
      dd.textContent = item.definition;
    } else {
      dd.appendChild(item.definition);
    }

    dl.appendChild(dt);
    dl.appendChild(dd);
  });

  return dl;
}

// ─── Table with Headers ───────────────────────────────────────────────────
export interface TableOptions {
  className?: string;
  caption?: string;
  headers: string[];
  rows: (string | HTMLElement)[][];
  headerScope?: 'col' | 'row';
  ariaLabel?: string;
}

export function createTable(
  options: TableOptions
): HTMLTableElement {
  const table = document.createElement('table');
  if (options.className) table.className = options.className;
  if (options.ariaLabel) table.setAttribute('aria-label', options.ariaLabel);

  // Caption
  if (options.caption) {
    const caption = document.createElement('caption');
    caption.textContent = options.caption;
    table.appendChild(caption);
  }

  // Header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  options.headers.forEach(headerText => {
    const th = document.createElement('th');
    th.setAttribute('scope', options.headerScope || 'col');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Body
  const tbody = document.createElement('tbody');
  options.rows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      if (typeof cell === 'string') {
        td.textContent = cell;
      } else {
        td.appendChild(cell);
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  return table;
}

// ─── Blockquote with Citation ─────────────────────────────────────────────
export interface BlockquoteOptions {
  className?: string;
  cite?: string;
  citeUrl?: string;
  footer?: string;
}

export function createBlockquote(
  quote: string,
  options: BlockquoteOptions = {}
): HTMLQuoteElement {
  const blockquote = document.createElement('blockquote');
  if (options.className) blockquote.className = options.className;
  if (options.citeUrl) blockquote.setAttribute('cite', options.citeUrl);

  const p = createElement('p', undefined, quote);
  blockquote.appendChild(p);

  if (options.footer || options.cite) {
    const footer = document.createElement('footer');
    if (options.cite) {
      const cite = document.createElement('cite');
      cite.textContent = options.cite;
      footer.appendChild(cite);
    }
    if (options.footer && !options.cite) {
      footer.textContent = options.footer;
    }
    blockquote.appendChild(footer);
  }

  return blockquote;
}

// ─── Main Content Area ────────────────────────────────────────────────────
export function createMain(
  className?: string,
  id?: string
): HTMLElement {
  const main = document.createElement('main');
  if (className) main.className = className;
  if (id) main.id = id;
  main.setAttribute('tabindex', '-1'); // Allow focus for skip link
  return main;
}

// ─── Header Element ───────────────────────────────────────────────────────
export interface HeaderOptions {
  className?: string;
  id?: string;
  role?: 'banner'; // Only for site-wide header
}

export function createHeader(
  options: HeaderOptions = {}
): HTMLElement {
  const header = document.createElement('header');
  if (options.className) header.className = options.className;
  if (options.id) header.id = options.id;
  if (options.role) header.setAttribute('role', options.role);
  return header;
}

// ─── Footer Element ───────────────────────────────────────────────────────
export interface FooterOptions {
  className?: string;
  id?: string;
}

export function createFooter(
  options: FooterOptions = {}
): HTMLElement {
  const footer = document.createElement('footer');
  if (options.className) footer.className = options.className;
  if (options.id) footer.id = options.id;
  return footer;
}

// ─── Update Page Heading Hierarchy ────────────────────────────────────────
export function updateAriaCurrentPage(path: string): void {
  // Remove current from all nav links
  document.querySelectorAll('[aria-current="page"]').forEach(el => {
    el.removeAttribute('aria-current');
  });

  // Add current to matching links
  document.querySelectorAll(`a[href="${path}"], a[href="${path}/"]`).forEach(el => {
    if (el.closest('nav')) {
      el.setAttribute('aria-current', 'page');
    }
  });
}

// ─── Announce Route Change to Screen Readers ──────────────────────────────
export function announcePageChange(title: string): void {
  const announcer = document.getElementById('sr-announcements');
  if (announcer) {
    announcer.textContent = `Navigated to ${title}`;
    // Clear after announcement
    setTimeout(() => {
      announcer.textContent = '';
    }, 1000);
  }
}

// ─── Skip Link for Accessibility ───────────────────────────────────────────

export function createSkipLink(
  targetId: string,
  text: string = 'Skip to main content'
): HTMLAnchorElement {
  const link = document.createElement('a');
  link.href = `#${targetId}`;
  link.className = 'skip-link';
  link.textContent = text;
  return link;
}

// ─── Screen Reader Only Text ───────────────────────────────────────────────

export function createSrOnlyText(text: string): HTMLSpanElement {
  const span = document.createElement('span');
  span.className = 'visually-hidden';
  span.textContent = text;
  return span;
}

// ─── Card Component with Proper Structure ──────────────────────────────────

export interface CardOptions {
  title: string;
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  description?: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  imageCaption?: string;
  link?: string;
  className?: string;
  footer?: HTMLElement;
  asArticle?: boolean;
}

export function createCard(options: CardOptions): HTMLElement {
  const card = document.createElement(options.asArticle ? 'article' : 'div');
  card.className = options.className || 'card';

  if (options.image) {
    // Use figure for image with optional caption
    if (options.imageCaption) {
      const figure = createElement('figure', 'card__figure');
      const img = document.createElement('img');
      img.src = options.image.src;
      img.alt = options.image.alt;
      img.loading = 'lazy';
      if (options.image.width) img.width = options.image.width;
      if (options.image.height) img.height = options.image.height;
      figure.appendChild(img);
      const figcaption = createElement('figcaption', 'card__figcaption', options.imageCaption);
      figure.appendChild(figcaption);
      card.appendChild(figure);
    } else {
      const imgWrapper = createElement('div', 'card__image');
      const img = document.createElement('img');
      img.src = options.image.src;
      img.alt = options.image.alt;
      img.loading = 'lazy';
      if (options.image.width) img.width = options.image.width;
      if (options.image.height) img.height = options.image.height;
      imgWrapper.appendChild(img);
      card.appendChild(imgWrapper);
    }
  }

  const content = createElement('div', 'card__content');

  const level = options.headingLevel || 3;
  const heading = document.createElement(`h${level}`);
  heading.className = 'card__title';

  if (options.link) {
    const link = document.createElement('a');
    link.href = options.link;
    link.textContent = options.title;
    link.setAttribute('data-route', '');
    heading.appendChild(link);
  } else {
    heading.textContent = options.title;
  }

  content.appendChild(heading);

  if (options.description) {
    const desc = createElement('p', 'card__description', options.description);
    content.appendChild(desc);
  }

  card.appendChild(content);

  if (options.footer) {
    const footer = createElement('footer', 'card__footer');
    footer.appendChild(options.footer);
    card.appendChild(footer);
  }

  return card;
}

// ─── Image with Figure/Figcaption ──────────────────────────────────────────

export interface ImageFigureOptions {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  srcset?: string;
  sizes?: string;
}

export function createImageFigure(options: ImageFigureOptions): HTMLElement {
  const figure = createElement('figure', options.className || 'figure');

  const img = document.createElement('img');
  img.src = options.src;
  img.alt = options.alt;
  img.loading = options.loading || 'lazy';
  if (options.width) img.width = options.width;
  if (options.height) img.height = options.height;
  if (options.srcset) img.srcset = options.srcset;
  if (options.sizes) img.sizes = options.sizes;
  figure.appendChild(img);

  const figcaption = createElement('figcaption', 'figure__caption', options.caption);
  figure.appendChild(figcaption);

  return figure;
}

// ─── Heading Level Manager ─────────────────────────────────────────────────

export class HeadingLevelManager {
  private currentLevel: number = 1;

  reset(): void {
    this.currentLevel = 1;
  }

  getCurrentLevel(): number {
    return this.currentLevel;
  }

  createHeading(text: string, className?: string): HTMLHeadingElement {
    const level = Math.min(this.currentLevel, 6) as 1 | 2 | 3 | 4 | 5 | 6;
    const heading = document.createElement(`h${level}`);
    heading.textContent = text;
    if (className) heading.className = className;
    return heading;
  }

  increaseLevel(): void {
    if (this.currentLevel < 6) {
      this.currentLevel++;
    }
  }

  decreaseLevel(): void {
    if (this.currentLevel > 1) {
      this.currentLevel--;
    }
  }

  setLevel(level: 1 | 2 | 3 | 4 | 5 | 6): void {
    this.currentLevel = level;
  }
}

// ─── Initialize Skip Link and SR Announcer ─────────────────────────────────

export function initializeAccessibility(): void {
  // Add skip link if not present
  if (!document.querySelector('.skip-link')) {
    const skipLink = createSkipLink('main-content', 'Skip to main content');
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  // Add screen reader announcement region if not present
  if (!document.getElementById('sr-announcements')) {
    const announcer = document.createElement('div');
    announcer.id = 'sr-announcements';
    announcer.className = 'visually-hidden';
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);
  }
}

// ─── Create Navigation List ────────────────────────────────────────────────

export interface NavLinkItem {
  text: string;
  href: string;
  active?: boolean;
  srOnly?: string;  // Screen reader only text
  children?: NavLinkItem[];
}

export function createNavList(
  items: NavLinkItem[],
  className?: string
): HTMLUListElement {
  const ul = document.createElement('ul');
  if (className) ul.className = className;
  ul.setAttribute('role', 'list');

  items.forEach(item => {
    const li = document.createElement('li');

    const link = document.createElement('a');
    link.href = item.href;
    link.setAttribute('data-route', '');

    if (item.active) {
      link.setAttribute('aria-current', 'page');
    }

    link.textContent = item.text;

    if (item.srOnly) {
      const srText = createSrOnlyText(item.srOnly);
      link.appendChild(srText);
    }

    li.appendChild(link);

    if (item.children && item.children.length > 0) {
      const subNav = createNavList(item.children);
      li.appendChild(subNav);
    }

    ul.appendChild(li);
  });

  return ul;
}

// ─── Breadcrumb Component ──────────────────────────────────────────────────

export interface BreadcrumbItem {
  text: string;
  href?: string;
  current?: boolean;
}

export function createBreadcrumbNav(
  items: BreadcrumbItem[],
  className?: string
): HTMLElement {
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Breadcrumb');
  if (className) nav.className = className;

  const ol = document.createElement('ol');
  ol.className = 'breadcrumb__list';
  ol.setAttribute('itemscope', '');
  ol.setAttribute('itemtype', 'https://schema.org/BreadcrumbList');

  items.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'breadcrumb__item';
    li.setAttribute('itemprop', 'itemListElement');
    li.setAttribute('itemscope', '');
    li.setAttribute('itemtype', 'https://schema.org/ListItem');

    if (item.current || !item.href) {
      const span = createElement('span', 'breadcrumb__current', item.text);
      span.setAttribute('itemprop', 'name');
      span.setAttribute('aria-current', 'page');
      li.appendChild(span);
    } else {
      const link = document.createElement('a');
      link.href = item.href;
      link.className = 'breadcrumb__link';
      link.setAttribute('itemprop', 'item');
      link.setAttribute('data-route', '');

      const name = createElement('span', undefined, item.text);
      name.setAttribute('itemprop', 'name');
      link.appendChild(name);
      li.appendChild(link);
    }

    const position = document.createElement('meta');
    position.setAttribute('itemprop', 'position');
    position.setAttribute('content', String(index + 1));
    li.appendChild(position);

    ol.appendChild(li);
  });

  nav.appendChild(ol);
  return nav;
}
