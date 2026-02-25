// ═══════════════════════════════════════════════════════════════════════════
// Video Tour Component
// Video player for property video tours with YouTube embed support
// ═══════════════════════════════════════════════════════════════════════════

import { t } from '../i18n';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface VideoTourOptions {
  videoUrl: string;
  propertyTitle: string;
  thumbnailUrl?: string;
}

// ─── Helper Functions ────────────────────────────────────────────────────────

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

// ─── YouTube URL Parser ──────────────────────────────────────────────────────

function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/,
    /youtube\.com\/shorts\/([^&\?\/]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

function getYouTubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'max' = 'high'): string {
  const qualityMap = {
    'default': 'default',
    'medium': 'mqdefault',
    'high': 'hqdefault',
    'max': 'maxresdefault'
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

function getYouTubeEmbedUrl(videoId: string, autoplay: boolean = true): string {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1'
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function createPlaySVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M8 5v14l11-7z');
  svg.appendChild(path);

  return svg;
}

function createCloseSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line1.setAttribute('x1', '18');
  line1.setAttribute('y1', '6');
  line1.setAttribute('x2', '6');
  line1.setAttribute('y2', '18');
  svg.appendChild(line1);

  const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line2.setAttribute('x1', '6');
  line2.setAttribute('y1', '6');
  line2.setAttribute('x2', '18');
  line2.setAttribute('y2', '18');
  svg.appendChild(line2);

  return svg;
}

function createVideoSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '2');
  rect.setAttribute('y', '2');
  rect.setAttribute('width', '20');
  rect.setAttribute('height', '20');
  rect.setAttribute('rx', '2.18');
  rect.setAttribute('ry', '2.18');
  svg.appendChild(rect);

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', '7');
  line.setAttribute('y1', '2');
  line.setAttribute('x2', '7');
  line.setAttribute('y2', '22');
  svg.appendChild(line);

  const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line2.setAttribute('x1', '17');
  line2.setAttribute('y1', '2');
  line2.setAttribute('x2', '17');
  line2.setAttribute('y2', '22');
  svg.appendChild(line2);

  const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line3.setAttribute('x1', '2');
  line3.setAttribute('y1', '12');
  line3.setAttribute('x2', '22');
  line3.setAttribute('y2', '12');
  svg.appendChild(line3);

  const line4 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line4.setAttribute('x1', '2');
  line4.setAttribute('y1', '7');
  line4.setAttribute('x2', '7');
  line4.setAttribute('y2', '7');
  svg.appendChild(line4);

  const line5 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line5.setAttribute('x1', '2');
  line5.setAttribute('y1', '17');
  line5.setAttribute('x2', '7');
  line5.setAttribute('y2', '17');
  svg.appendChild(line5);

  const line6 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line6.setAttribute('x1', '17');
  line6.setAttribute('y1', '17');
  line6.setAttribute('x2', '22');
  line6.setAttribute('y2', '17');
  svg.appendChild(line6);

  const line7 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line7.setAttribute('x1', '17');
  line7.setAttribute('y1', '7');
  line7.setAttribute('x2', '22');
  line7.setAttribute('y2', '7');
  svg.appendChild(line7);

  return svg;
}

// ─── Video Tour Thumbnail Card ───────────────────────────────────────────────

export function createVideoTourCard(options: VideoTourOptions): HTMLElement {
  const { videoUrl, propertyTitle, thumbnailUrl } = options;

  const videoId = extractYouTubeVideoId(videoUrl);
  if (!videoId) {
    console.warn('Invalid YouTube URL:', videoUrl);
    return createElement('div');
  }

  const thumbnail = thumbnailUrl || getYouTubeThumbnail(videoId, 'high');

  const card = createElement('div', 'video-tour-card');

  // Thumbnail wrapper
  const thumbnailWrapper = createElement('div', 'video-tour-card__thumbnail');

  const thumbnailImg = createElement('img', 'video-tour-card__image');
  thumbnailImg.src = thumbnail;
  thumbnailImg.alt = `Video tour of ${propertyTitle}`;
  thumbnailImg.loading = 'lazy';

  // Handle thumbnail load error - use fallback
  thumbnailImg.addEventListener('error', () => {
    thumbnailImg.src = getYouTubeThumbnail(videoId, 'default');
  });

  thumbnailWrapper.appendChild(thumbnailImg);

  // Play button overlay
  const playOverlay = createElement('div', 'video-tour-card__play-overlay');
  const playButton = createElement('button', 'video-tour-card__play-btn');
  playButton.setAttribute('aria-label', `Play video tour of ${propertyTitle}`);
  playButton.appendChild(createPlaySVG());
  playOverlay.appendChild(playButton);
  thumbnailWrapper.appendChild(playOverlay);

  // Duration badge (placeholder - could be fetched from YouTube API)
  const badge = createElement('span', 'video-tour-card__badge', t('modals.videoTour'));
  thumbnailWrapper.appendChild(badge);

  card.appendChild(thumbnailWrapper);

  // Info section
  const info = createElement('div', 'video-tour-card__info');
  const title = createElement('span', 'video-tour-card__title', t('modals.propertyVideoTour'));
  const subtitle = createElement('span', 'video-tour-card__subtitle', t('modals.clickToWatch'));
  info.appendChild(title);
  info.appendChild(subtitle);
  card.appendChild(info);

  // Click handler to open modal
  card.addEventListener('click', () => {
    openVideoModal({ videoUrl, propertyTitle });
  });

  return card;
}

// ─── Video Tour Section ──────────────────────────────────────────────────────

export function createVideoTourSection(options: VideoTourOptions): HTMLElement {
  const section = createElement('div', 'video-tour-section');

  // Section header
  const header = createElement('div', 'video-tour-section__header');
  const icon = createElement('span', 'video-tour-section__icon');
  icon.appendChild(createVideoSVG());
  const title = createElement('h2', 'property-detail__section-title', t('modals.videoTour'));
  header.appendChild(icon);
  header.appendChild(title);
  section.appendChild(header);

  // Video card
  const card = createVideoTourCard(options);
  section.appendChild(card);

  return section;
}

// ─── Video Modal ─────────────────────────────────────────────────────────────

export function openVideoModal(options: VideoTourOptions): void {
  const { videoUrl, propertyTitle } = options;

  const videoId = extractYouTubeVideoId(videoUrl);
  if (!videoId) {
    console.warn('Invalid YouTube URL:', videoUrl);
    return;
  }

  // Create modal overlay
  const overlay = createElement('div', 'video-tour-modal');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', `Video tour of ${propertyTitle}`);

  // Modal container
  const container = createElement('div', 'video-tour-modal__container');

  // Header with title and close button
  const header = createElement('div', 'video-tour-modal__header');

  const titleWrapper = createElement('div', 'video-tour-modal__title-wrapper');
  const title = createElement('h2', 'video-tour-modal__title', t('modals.videoTour'));
  const subtitle = createElement('span', 'video-tour-modal__subtitle', propertyTitle);
  titleWrapper.appendChild(title);
  titleWrapper.appendChild(subtitle);
  header.appendChild(titleWrapper);

  const closeBtn = createElement('button', 'video-tour-modal__close-btn');
  closeBtn.setAttribute('aria-label', t('modals.closeVideo'));
  closeBtn.appendChild(createCloseSVG());
  header.appendChild(closeBtn);

  container.appendChild(header);

  // Video container
  const videoContainer = createElement('div', 'video-tour-modal__video-container');

  // Loading spinner
  const loader = createElement('div', 'video-tour-modal__loader');
  const spinner = createElement('div', 'video-tour-modal__spinner');
  loader.appendChild(spinner);
  videoContainer.appendChild(loader);

  // Iframe
  const iframe = createElement('iframe', 'video-tour-modal__iframe');
  iframe.src = getYouTubeEmbedUrl(videoId, true);
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');

  iframe.addEventListener('load', () => {
    loader.classList.add('hidden');
    iframe.classList.add('loaded');
  });

  videoContainer.appendChild(iframe);
  container.appendChild(videoContainer);

  overlay.appendChild(container);

  // Close handlers
  const closeModal = () => {
    overlay.classList.add('closing');
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = '';
    }, 300);
  };

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  // Escape key handler
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);

  // Add to DOM
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  // Animate in
  requestAnimationFrame(() => {
    overlay.classList.add('active');
  });

  // Focus close button
  closeBtn.focus();
}

// ─── Create Video Tour Button ────────────────────────────────────────────────

export function createVideoTourButton(options: VideoTourOptions): HTMLButtonElement {
  const { videoUrl, propertyTitle } = options;

  const btn = createElement('button', 'video-tour-btn');
  btn.setAttribute('aria-label', `Watch video tour of ${propertyTitle}`);
  btn.setAttribute('type', 'button');

  btn.appendChild(createPlaySVG());

  const text = createElement('span', 'video-tour-btn__text', t('modals.videoTour'));
  btn.appendChild(text);

  btn.addEventListener('click', () => {
    openVideoModal({ videoUrl, propertyTitle });
  });

  return btn;
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export { extractYouTubeVideoId, getYouTubeThumbnail, getYouTubeEmbedUrl };
