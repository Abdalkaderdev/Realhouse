// ═══════════════════════════════════════════════════════════════════════════
// Lead Capture Component for Real House
// Newsletter signup and floating CTA
// ═══════════════════════════════════════════════════════════════════════════

import { t } from '../i18n';

// ─── Helper Function ──────────────────────────────────────────────────────
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

// ─── Create Lead Capture Section ──────────────────────────────────────────
export function createLeadCaptureSection(): HTMLElement {
  const leadCapture = createElement('section', 'lead-capture');
  const leadCaptureContainer = createElement('div', 'container');
  const leadCaptureCard = createElement('div', 'lead-capture__card');

  // Content
  const leadCaptureContent = createElement('div', 'lead-capture__content');
  const leadCaptureTitle = createElement('h2', 'lead-capture__title', t('leadCapture.title'));
  const leadCaptureSubtitle = createElement('p', 'lead-capture__subtitle', t('leadCapture.subtitle'));
  leadCaptureContent.appendChild(leadCaptureTitle);
  leadCaptureContent.appendChild(leadCaptureSubtitle);
  leadCaptureCard.appendChild(leadCaptureContent);

  // Form
  const leadCaptureForm = createElement('form', 'lead-capture__form');
  leadCaptureForm.setAttribute('novalidate', '');

  const formRow = createElement('div', 'lead-capture__form-row');
  const emailInput = createElement('input', 'lead-capture__input');
  emailInput.type = 'email';
  emailInput.name = 'newsletter-email';
  emailInput.placeholder = t('leadCapture.emailPlaceholder');
  emailInput.required = true;
  emailInput.autocomplete = 'email';
  emailInput.setAttribute('aria-label', t('leadCapture.emailAriaLabel'));
  formRow.appendChild(emailInput);

  const subscribeBtn = createElement('button', 'btn btn--primary lead-capture__submit', t('leadCapture.subscribe'));
  subscribeBtn.type = 'submit';
  formRow.appendChild(subscribeBtn);
  leadCaptureForm.appendChild(formRow);

  // Error message
  const formError = createElement('div', 'lead-capture__error');
  formError.setAttribute('aria-live', 'polite');
  leadCaptureForm.appendChild(formError);

  // Success message
  const formSuccess = createElement('div', 'lead-capture__success');
  formSuccess.setAttribute('aria-live', 'polite');
  leadCaptureForm.appendChild(formSuccess);

  // Privacy note
  const privacyNote = createElement('p', 'lead-capture__privacy');
  privacyNote.textContent = t('leadCapture.privacyNote');
  leadCaptureForm.appendChild(privacyNote);

  // Form submission handler
  leadCaptureForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (emailInput as HTMLInputElement).value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset states
    formError.textContent = '';
    formError.style.display = 'none';
    formSuccess.style.display = 'none';
    emailInput.classList.remove('error');

    // Validate email
    if (!email) {
      formError.textContent = t('leadCapture.enterEmail');
      formError.style.display = 'block';
      emailInput.classList.add('error');
      return;
    }

    if (!emailPattern.test(email)) {
      formError.textContent = t('leadCapture.invalidEmail');
      formError.style.display = 'block';
      emailInput.classList.add('error');
      return;
    }

    // Show loading state
    subscribeBtn.textContent = t('leadCapture.subscribing');
    (subscribeBtn as HTMLButtonElement).disabled = true;

    // Simulate API call (in production, send to your API)
    setTimeout(() => {
      // Store in localStorage
      const subscribers = JSON.parse(localStorage.getItem('rh-newsletter-subscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('rh-newsletter-subscribers', JSON.stringify(subscribers));
      }
      localStorage.setItem('rh-newsletter-subscribed', 'true');

      // Show success message
      formSuccess.textContent = t('leadCapture.successMessage');
      formSuccess.style.display = 'block';
      (emailInput as HTMLInputElement).value = '';

      // Reset button
      subscribeBtn.textContent = t('leadCapture.subscribed');
      setTimeout(() => {
        subscribeBtn.textContent = t('leadCapture.subscribe');
        (subscribeBtn as HTMLButtonElement).disabled = false;
      }, 2000);
    }, 800);
  });

  leadCaptureCard.appendChild(leadCaptureForm);
  leadCaptureContainer.appendChild(leadCaptureCard);
  leadCapture.appendChild(leadCaptureContainer);

  return leadCapture;
}

// ─── Create Floating CTA Button ───────────────────────────────────────────
export function createFloatingCTA(): HTMLElement {
  const floatingCta = createElement('div', 'floating-cta');
  floatingCta.id = 'floating-cta';

  const floatingCtaBtn = createElement('a', 'floating-cta__btn', t('leadCapture.scheduleConsultation'));
  floatingCtaBtn.href = '/contact';
  floatingCtaBtn.setAttribute('data-route', '');
  floatingCtaBtn.setAttribute('aria-label', t('leadCapture.scheduleConsultationAria'));

  // Create calendar icon
  const calendarIconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  calendarIconSvg.setAttribute('viewBox', '0 0 24 24');
  calendarIconSvg.setAttribute('fill', 'none');
  calendarIconSvg.setAttribute('stroke', 'currentColor');
  calendarIconSvg.setAttribute('stroke-width', '2');
  calendarIconSvg.classList.add('floating-cta__icon');

  const calendarRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  calendarRect.setAttribute('x', '3');
  calendarRect.setAttribute('y', '4');
  calendarRect.setAttribute('width', '18');
  calendarRect.setAttribute('height', '18');
  calendarRect.setAttribute('rx', '2');
  calendarRect.setAttribute('ry', '2');
  calendarIconSvg.appendChild(calendarRect);

  const calLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  calLine1.setAttribute('x1', '16');
  calLine1.setAttribute('y1', '2');
  calLine1.setAttribute('x2', '16');
  calLine1.setAttribute('y2', '6');
  calendarIconSvg.appendChild(calLine1);

  const calLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  calLine2.setAttribute('x1', '8');
  calLine2.setAttribute('y1', '2');
  calLine2.setAttribute('x2', '8');
  calLine2.setAttribute('y2', '6');
  calendarIconSvg.appendChild(calLine2);

  const calLine3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  calLine3.setAttribute('x1', '3');
  calLine3.setAttribute('y1', '10');
  calLine3.setAttribute('x2', '21');
  calLine3.setAttribute('y2', '10');
  calendarIconSvg.appendChild(calLine3);

  floatingCtaBtn.insertBefore(calendarIconSvg, floatingCtaBtn.firstChild);
  floatingCta.appendChild(floatingCtaBtn);

  return floatingCta;
}

// ─── Initialize Floating CTA Scroll Behavior ──────────────────────────────
export function initFloatingCTAScroll(): void {
  setTimeout(() => {
    const floatingCtaEl = document.getElementById('floating-cta');
    const heroEl = document.getElementById('hero');

    if (floatingCtaEl && heroEl) {
      const handleScroll = () => {
        const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
        const scrollY = window.scrollY;

        if (scrollY > heroBottom - 100) {
          floatingCtaEl.classList.add('visible');
        } else {
          floatingCtaEl.classList.remove('visible');
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check
    }
  }, 100);
}
