// ═══════════════════════════════════════════════════════════════════════════
// Print Property PDF Component
// Generates print-friendly version with QR code for property detail pages
// ═══════════════════════════════════════════════════════════════════════════

import type { Property } from '../data/properties';
import { generatePropertySlug } from '../data/properties';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PrintPropertyOptions {
  property: Property;
  showQRCode?: boolean;
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

// ─── QR Code Generator ───────────────────────────────────────────────────────

function generateQRCodeURL(url: string, size: number = 150): string {
  // Using Google Charts API for QR code generation
  const encodedUrl = encodeURIComponent(url);
  return `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${encodedUrl}&choe=UTF-8`;
}

// ─── Create Logo SVG ─────────────────────────────────────────────────────────

function createLogoSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 40 48');
  svg.setAttribute('width', '40');
  svg.setAttribute('height', '48');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M20 0L0 15v33h15V30h10v18h15V15L20 0z');
  path1.setAttribute('fill', '#C9A84C');
  svg.appendChild(path1);

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('d', 'M20 5L5 17v26h10V28h10v15h10V17L20 5z');
  path2.setAttribute('fill', '#0a0a0f');
  svg.appendChild(path2);

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '15');
  rect.setAttribute('y', '32');
  rect.setAttribute('width', '10');
  rect.setAttribute('height', '11');
  rect.setAttribute('fill', '#C9A84C');
  svg.appendChild(rect);

  return svg;
}

// ─── Create Print Header ─────────────────────────────────────────────────────

function createPrintHeader(): HTMLElement {
  const header = createElement('div', 'print-property-header print-only');

  // Logo section
  const logoSection = createElement('div', 'print-property-header__logo');
  logoSection.appendChild(createLogoSVG());

  const brandName = createElement('span', 'print-property-header__brand', 'Real House');
  logoSection.appendChild(brandName);

  header.appendChild(logoSection);

  // Contact section
  const contactSection = createElement('div', 'print-property-header__contact');

  const websiteSpan = createElement('span', undefined, 'www.realhouseiq.com');
  contactSection.appendChild(websiteSpan);

  const phoneSpan = createElement('span', undefined, '+964 750 792 2138');
  contactSection.appendChild(phoneSpan);

  const emailSpan = createElement('span', undefined, 'info@realhouseiq.com');
  contactSection.appendChild(emailSpan);

  header.appendChild(contactSection);

  return header;
}

// ─── Create Print Footer ─────────────────────────────────────────────────────

function createPrintFooter(property: Property): HTMLElement {
  const footer = createElement('div', 'print-property-footer print-only');

  // Left side - Company info
  const leftSection = createElement('div', 'print-property-footer__left');

  const brand = createElement('span', 'print-property-footer__brand', 'Real House');
  leftSection.appendChild(brand);

  const location = createElement('span', 'print-property-footer__location', 'Gulan Street, Erbil, Kurdistan Region, Iraq');
  leftSection.appendChild(location);

  const license = createElement('span', undefined, 'Licensed Real Estate Agency');
  leftSection.appendChild(license);

  footer.appendChild(leftSection);

  // Right side - Property reference and date
  const rightSection = createElement('div', 'print-property-footer__right');
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const refSpan = createElement('span', undefined, `Property Reference: ${property.id}`);
  rightSection.appendChild(refSpan);

  const dateSpan = createElement('span', undefined, `Generated: ${date}`);
  rightSection.appendChild(dateSpan);

  const disclaimer = createElement('span', undefined, 'Prices and availability subject to change');
  rightSection.appendChild(disclaimer);

  footer.appendChild(rightSection);

  return footer;
}

// ─── Create QR Code Section ──────────────────────────────────────────────────

function createQRCodeSection(property: Property): HTMLElement {
  const slug = generatePropertySlug(property);
  const propertyUrl = `https://realhouseiq.com/properties/${slug}`;

  const section = createElement('div', 'print-property-qr print-only');

  const title = createElement('h4', 'print-property-qr__title', 'View Online');
  section.appendChild(title);

  const qrWrapper = createElement('div', 'print-property-qr__wrapper');
  const qrImg = createElement('img', 'print-property-qr__image');
  qrImg.src = generateQRCodeURL(propertyUrl, 120);
  qrImg.alt = 'QR Code - Scan to view property online';
  qrWrapper.appendChild(qrImg);
  section.appendChild(qrWrapper);

  const urlText = createElement('span', 'print-property-qr__url', 'realhouseiq.com');
  section.appendChild(urlText);

  return section;
}

// ─── Create Print Button ─────────────────────────────────────────────────────

function createPrinterSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const polyline1 = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline1.setAttribute('points', '6 9 6 2 18 2 18 9');
  svg.appendChild(polyline1);

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2');
  svg.appendChild(path);

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', '6');
  rect.setAttribute('y', '14');
  rect.setAttribute('width', '12');
  rect.setAttribute('height', '8');
  svg.appendChild(rect);

  return svg;
}

function createDownloadSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4');
  svg.appendChild(path);

  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', '7 10 12 15 17 10');
  svg.appendChild(polyline);

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', '12');
  line.setAttribute('y1', '15');
  line.setAttribute('x2', '12');
  line.setAttribute('y2', '3');
  svg.appendChild(line);

  return svg;
}

export function createPrintButton(property: Property, variant: 'icon' | 'full' = 'full'): HTMLButtonElement {
  const btn = createElement('button', `print-property-btn print-property-btn--${variant} no-print`);
  btn.setAttribute('aria-label', 'Print or download property details as PDF');
  btn.setAttribute('type', 'button');

  btn.appendChild(createPrinterSVG());

  if (variant === 'full') {
    const text = createElement('span', 'print-property-btn__text', 'Print / PDF');
    btn.appendChild(text);
  }

  btn.addEventListener('click', () => {
    printProperty({ property, showQRCode: true });
  });

  return btn;
}

export function createDownloadPDFButton(property: Property, variant: 'icon' | 'full' = 'full'): HTMLButtonElement {
  const btn = createElement('button', `print-property-btn print-property-btn--download print-property-btn--${variant} no-print`);
  btn.setAttribute('aria-label', 'Download property details as PDF');
  btn.setAttribute('type', 'button');

  btn.appendChild(createDownloadSVG());

  if (variant === 'full') {
    const text = createElement('span', 'print-property-btn__text', 'Download PDF');
    btn.appendChild(text);
  }

  btn.addEventListener('click', () => {
    printProperty({ property, showQRCode: true });
  });

  return btn;
}

// ─── Print Property Function ─────────────────────────────────────────────────

export function printProperty(options: PrintPropertyOptions): void {
  const { property, showQRCode = true } = options;

  // Inject print-specific elements
  injectPrintElements(property, showQRCode);

  // Trigger print dialog
  setTimeout(() => {
    window.print();

    // Remove print-specific elements after printing
    setTimeout(() => {
      removePrintElements();
    }, 1000);
  }, 100);
}

// ─── Inject Print Elements ───────────────────────────────────────────────────

function injectPrintElements(property: Property, showQRCode: boolean): void {
  // Remove any existing print elements
  removePrintElements();

  // Find the property detail container
  const propertyDetail = document.querySelector('.property-detail');
  if (!propertyDetail) return;

  // Add print header at the beginning
  const header = createPrintHeader();
  header.setAttribute('data-print-element', 'true');
  propertyDetail.insertBefore(header, propertyDetail.firstChild);

  // Add QR code section to sidebar or main content
  if (showQRCode) {
    const qrSection = createQRCodeSection(property);
    qrSection.setAttribute('data-print-element', 'true');

    const sidebar = propertyDetail.querySelector('.property-detail__sidebar');
    if (sidebar) {
      sidebar.appendChild(qrSection);
    } else {
      const mainContent = propertyDetail.querySelector('.property-detail__main');
      if (mainContent) {
        mainContent.appendChild(qrSection);
      }
    }
  }

  // Add print footer at the end
  const footer = createPrintFooter(property);
  footer.setAttribute('data-print-element', 'true');
  propertyDetail.appendChild(footer);

  // Add print mode class
  document.body.classList.add('print-mode');
}

// ─── Remove Print Elements ───────────────────────────────────────────────────

function removePrintElements(): void {
  // Remove all dynamically added print elements
  const printElements = document.querySelectorAll('[data-print-element="true"]');
  printElements.forEach(el => el.remove());

  // Remove print mode class
  document.body.classList.remove('print-mode');
}

// ─── Create Print Action Bar ─────────────────────────────────────────────────

export function createPrintActionBar(property: Property): HTMLElement {
  const bar = createElement('div', 'print-property-actions no-print');

  const printBtn = createPrintButton(property, 'full');
  bar.appendChild(printBtn);

  return bar;
}

// ─── Export for use in property detail page ──────────────────────────────────

export { generateQRCodeURL };
