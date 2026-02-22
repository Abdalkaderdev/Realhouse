// ═══════════════════════════════════════════════════════════════════════════
// Project Inquiry Form Component
// Quick inquiry modal for project pages - Real House
// ═══════════════════════════════════════════════════════════════════════════

import type { Project } from '../data/projects';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  preferredContact: 'phone' | 'whatsapp' | 'email';
  projectId: string;
  projectName: string;
  timestamp: string;
}

export interface InquiryFormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = '9647507922138';
const PHONE_NUMBER = '+964 750 792 2138';
const STORAGE_KEY = 'realhouse_inquiries';

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

function createSVGIcon(iconId: string, className?: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', className || 'icon');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${iconId}`);
  svg.appendChild(use);
  return svg;
}

function createSuccessIconSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('aria-hidden', 'true');

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M22 11.08V12a10 10 0 1 1-5.93-9.14');
  svg.appendChild(path1);

  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', '22 4 12 14.01 9 11.01');
  svg.appendChild(polyline);

  return svg;
}

function createErrorIconSVG(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('aria-hidden', 'true');

  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', '12');
  circle.setAttribute('cy', '12');
  circle.setAttribute('r', '10');
  svg.appendChild(circle);

  const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line1.setAttribute('x1', '15');
  line1.setAttribute('y1', '9');
  line1.setAttribute('x2', '9');
  line1.setAttribute('y2', '15');
  svg.appendChild(line1);

  const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line2.setAttribute('x1', '9');
  line2.setAttribute('y1', '9');
  line2.setAttribute('x2', '15');
  line2.setAttribute('y2', '15');
  svg.appendChild(line2);

  return svg;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  // Allow various phone formats including international
  const phoneRegex = /^[\d\s\-+()]{7,20}$/;
  return phoneRegex.test(phone);
}

function validateForm(data: Partial<InquiryFormData>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name';
  }

  if (!data.phone || !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function saveInquiryToStorage(inquiry: InquiryFormData): void {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    const inquiries: InquiryFormData[] = existing ? JSON.parse(existing) : [];
    inquiries.push(inquiry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  } catch (e) {
    console.warn('Could not save inquiry to localStorage:', e);
  }
}

function generateWhatsAppLink(project: Project, formData: Partial<InquiryFormData>): string {
  const message = encodeURIComponent(
    `Hello Real House,\n\n` +
    `I'm interested in the *${project.name}* project.\n\n` +
    `Name: ${formData.name || ''}\n` +
    `Phone: ${formData.phone || ''}\n` +
    `Email: ${formData.email || ''}\n` +
    `${formData.message ? `\nMessage: ${formData.message}` : ''}\n\n` +
    `Please contact me with more details.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

// ─── Modal State Management ──────────────────────────────────────────────────

let activeModal: HTMLElement | null = null;
let previousActiveElement: Element | null = null;

function trapFocus(modal: HTMLElement): void {
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0] as HTMLElement;
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
}

// ─── Create Inquiry Form ─────────────────────────────────────────────────────

function createInquiryForm(project: Project, onClose: () => void): HTMLElement {
  const form = createElement('form', 'inquiry-form');
  form.setAttribute('novalidate', '');

  // Project Info Header
  const projectInfo = createElement('div', 'inquiry-form__project');
  const projectName = createElement('p', 'inquiry-form__project-name', project.name);
  const projectLocation = createElement('p', 'inquiry-form__project-location');
  projectLocation.textContent = `${project.location.district}, ${project.location.city}`;
  projectInfo.appendChild(projectName);
  projectInfo.appendChild(projectLocation);
  form.appendChild(projectInfo);

  // Form Fields Container
  const fieldsContainer = createElement('div', 'inquiry-form__fields');

  // Name Field
  const nameGroup = createElement('div', 'inquiry-form__group');
  const nameLabel = createElement('label', 'inquiry-form__label', 'Full Name');
  nameLabel.setAttribute('for', 'inquiry-name');
  const nameInput = createElement('input', 'inquiry-form__input');
  nameInput.type = 'text';
  nameInput.id = 'inquiry-name';
  nameInput.name = 'name';
  nameInput.placeholder = 'Enter your full name';
  nameInput.required = true;
  nameInput.autocomplete = 'name';
  nameInput.setAttribute('aria-required', 'true');
  const nameError = createElement('span', 'inquiry-form__error');
  nameError.setAttribute('role', 'alert');
  nameError.setAttribute('aria-live', 'polite');
  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);
  nameGroup.appendChild(nameError);
  fieldsContainer.appendChild(nameGroup);

  // Phone Field
  const phoneGroup = createElement('div', 'inquiry-form__group');
  const phoneLabel = createElement('label', 'inquiry-form__label', 'Phone Number');
  phoneLabel.setAttribute('for', 'inquiry-phone');
  const phoneInput = createElement('input', 'inquiry-form__input');
  phoneInput.type = 'tel';
  phoneInput.id = 'inquiry-phone';
  phoneInput.name = 'phone';
  phoneInput.placeholder = '+964 xxx xxx xxxx';
  phoneInput.required = true;
  phoneInput.autocomplete = 'tel';
  phoneInput.setAttribute('aria-required', 'true');
  const phoneError = createElement('span', 'inquiry-form__error');
  phoneError.setAttribute('role', 'alert');
  phoneError.setAttribute('aria-live', 'polite');
  phoneGroup.appendChild(phoneLabel);
  phoneGroup.appendChild(phoneInput);
  phoneGroup.appendChild(phoneError);
  fieldsContainer.appendChild(phoneGroup);

  // Email Field
  const emailGroup = createElement('div', 'inquiry-form__group');
  const emailLabel = createElement('label', 'inquiry-form__label', 'Email Address');
  emailLabel.setAttribute('for', 'inquiry-email');
  const emailInput = createElement('input', 'inquiry-form__input');
  emailInput.type = 'email';
  emailInput.id = 'inquiry-email';
  emailInput.name = 'email';
  emailInput.placeholder = 'your@email.com';
  emailInput.required = true;
  emailInput.autocomplete = 'email';
  emailInput.setAttribute('aria-required', 'true');
  const emailError = createElement('span', 'inquiry-form__error');
  emailError.setAttribute('role', 'alert');
  emailError.setAttribute('aria-live', 'polite');
  emailGroup.appendChild(emailLabel);
  emailGroup.appendChild(emailInput);
  emailGroup.appendChild(emailError);
  fieldsContainer.appendChild(emailGroup);

  // Message Field (Optional)
  const messageGroup = createElement('div', 'inquiry-form__group');
  const messageLabel = createElement('label', 'inquiry-form__label');
  messageLabel.setAttribute('for', 'inquiry-message');
  const messageLabelText = document.createTextNode('Message ');
  const optionalSpan = createElement('span', 'inquiry-form__optional', '(Optional)');
  messageLabel.appendChild(messageLabelText);
  messageLabel.appendChild(optionalSpan);
  const messageTextarea = createElement('textarea', 'inquiry-form__textarea');
  messageTextarea.id = 'inquiry-message';
  messageTextarea.name = 'message';
  messageTextarea.placeholder = 'Tell us about your requirements...';
  messageTextarea.rows = 3;
  messageGroup.appendChild(messageLabel);
  messageGroup.appendChild(messageTextarea);
  fieldsContainer.appendChild(messageGroup);

  // Preferred Contact Method
  const contactGroup = createElement('div', 'inquiry-form__group');
  const contactLabel = createElement('p', 'inquiry-form__label', 'Preferred Contact Method');
  contactGroup.appendChild(contactLabel);

  const radioGroup = createElement('div', 'inquiry-form__radio-group');
  radioGroup.setAttribute('role', 'radiogroup');
  radioGroup.setAttribute('aria-label', 'Preferred contact method');

  const contactOptions = [
    { value: 'phone', label: 'Phone Call', icon: 'icon-phone' },
    { value: 'whatsapp', label: 'WhatsApp', icon: 'icon-whatsapp' },
    { value: 'email', label: 'Email', icon: 'icon-email' }
  ];

  contactOptions.forEach((option, index) => {
    const radioWrapper = createElement('label', 'inquiry-form__radio');
    const radioInput = createElement('input', 'inquiry-form__radio-input');
    radioInput.type = 'radio';
    radioInput.name = 'preferredContact';
    radioInput.value = option.value;
    if (index === 0) radioInput.checked = true;

    const radioCustom = createElement('span', 'inquiry-form__radio-custom');
    const radioIcon = createSVGIcon(option.icon, 'inquiry-form__radio-icon');
    const radioLabel = createElement('span', 'inquiry-form__radio-label', option.label);

    radioWrapper.appendChild(radioInput);
    radioWrapper.appendChild(radioCustom);
    radioWrapper.appendChild(radioIcon);
    radioWrapper.appendChild(radioLabel);
    radioGroup.appendChild(radioWrapper);
  });

  contactGroup.appendChild(radioGroup);
  fieldsContainer.appendChild(contactGroup);

  form.appendChild(fieldsContainer);

  // Action Buttons
  const actions = createElement('div', 'inquiry-form__actions');

  // Submit Button
  const submitBtn = createElement('button', 'inquiry-form__submit btn btn--primary');
  submitBtn.type = 'submit';
  const submitText = createElement('span', 'inquiry-form__submit-text', 'Send Inquiry');
  const submitSpinner = createElement('span', 'inquiry-form__spinner');
  submitSpinner.setAttribute('aria-hidden', 'true');
  submitBtn.appendChild(submitText);
  submitBtn.appendChild(submitSpinner);
  actions.appendChild(submitBtn);

  // Quick Actions Row
  const quickActions = createElement('div', 'inquiry-form__quick-actions');

  // WhatsApp Button
  const whatsappBtn = createElement('a', 'inquiry-form__whatsapp');
  whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I'm interested in ${project.name}`)}`;
  whatsappBtn.target = '_blank';
  whatsappBtn.rel = 'noopener noreferrer';
  whatsappBtn.setAttribute('aria-label', 'Contact via WhatsApp');
  whatsappBtn.appendChild(createSVGIcon('icon-whatsapp', 'inquiry-form__action-icon'));
  whatsappBtn.appendChild(document.createTextNode('WhatsApp'));
  quickActions.appendChild(whatsappBtn);

  // Call Button
  const callBtn = createElement('a', 'inquiry-form__call');
  callBtn.href = `tel:${PHONE_NUMBER.replace(/\s/g, '')}`;
  callBtn.setAttribute('aria-label', 'Call us directly');
  callBtn.appendChild(createSVGIcon('icon-phone', 'inquiry-form__action-icon'));
  callBtn.appendChild(document.createTextNode('Call Now'));
  quickActions.appendChild(callBtn);

  actions.appendChild(quickActions);
  form.appendChild(actions);

  // Success State
  const successState = createElement('div', 'inquiry-form__success');
  successState.setAttribute('role', 'alert');
  successState.setAttribute('aria-live', 'polite');
  const successIcon = createElement('div', 'inquiry-form__success-icon');
  successIcon.appendChild(createSuccessIconSVG());
  const successTitle = createElement('h3', 'inquiry-form__success-title', 'Inquiry Sent!');
  const successMessage = createElement('p', 'inquiry-form__success-message');
  successMessage.textContent = 'Thank you for your interest. Our team will contact you shortly.';

  const successActions = createElement('div', 'inquiry-form__success-actions');

  const whatsappFollowUp = createElement('a', 'inquiry-form__whatsapp');
  whatsappFollowUp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I just submitted an inquiry about ${project.name}`)}`;
  whatsappFollowUp.target = '_blank';
  whatsappFollowUp.rel = 'noopener noreferrer';
  whatsappFollowUp.appendChild(createSVGIcon('icon-whatsapp', 'inquiry-form__action-icon'));
  whatsappFollowUp.appendChild(document.createTextNode('Continue on WhatsApp'));
  successActions.appendChild(whatsappFollowUp);

  const closeSuccessBtn = createElement('button', 'btn btn--ghost', 'Close');
  closeSuccessBtn.type = 'button';
  closeSuccessBtn.addEventListener('click', onClose);
  successActions.appendChild(closeSuccessBtn);

  successState.appendChild(successIcon);
  successState.appendChild(successTitle);
  successState.appendChild(successMessage);
  successState.appendChild(successActions);
  form.appendChild(successState);

  // Error State
  const errorState = createElement('div', 'inquiry-form__error-state');
  errorState.setAttribute('role', 'alert');
  errorState.setAttribute('aria-live', 'polite');
  const errorIcon = createElement('div', 'inquiry-form__error-icon');
  errorIcon.appendChild(createErrorIconSVG());
  const errorTitle = createElement('h3', 'inquiry-form__error-title', 'Something went wrong');
  const errorMessage = createElement('p', 'inquiry-form__error-message', 'Please try again or contact us directly.');
  const retryBtn = createElement('button', 'btn btn--primary', 'Try Again');
  retryBtn.type = 'button';
  retryBtn.addEventListener('click', () => {
    form.classList.remove('inquiry-form--error');
    form.classList.remove('inquiry-form--success');
  });
  errorState.appendChild(errorIcon);
  errorState.appendChild(errorTitle);
  errorState.appendChild(errorMessage);
  errorState.appendChild(retryBtn);
  form.appendChild(errorState);

  // Form Submission Handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Clear previous errors
    form.querySelectorAll('.inquiry-form__group--error').forEach(group => {
      group.classList.remove('inquiry-form__group--error');
    });
    form.querySelectorAll('.inquiry-form__error').forEach(error => {
      error.textContent = '';
    });

    // Gather form data
    const formData: Partial<InquiryFormData> = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageTextarea.value.trim(),
      preferredContact: (form.querySelector('input[name="preferredContact"]:checked') as HTMLInputElement)?.value as 'phone' | 'whatsapp' | 'email',
      projectId: project.id,
      projectName: project.name,
      timestamp: new Date().toISOString()
    };

    // Validate
    const validation = validateForm(formData);

    if (!validation.isValid) {
      // Show errors
      Object.entries(validation.errors).forEach(([field, message]) => {
        const group = form.querySelector(`#inquiry-${field}`)?.parentElement;
        const errorEl = group?.querySelector('.inquiry-form__error');
        if (group) group.classList.add('inquiry-form__group--error');
        if (errorEl) errorEl.textContent = message;
      });

      // Focus first error field
      const firstError = Object.keys(validation.errors)[0];
      const firstErrorInput = form.querySelector(`#inquiry-${firstError}`) as HTMLElement;
      if (firstErrorInput) firstErrorInput.focus();
      return;
    }

    // Submit
    form.classList.add('inquiry-form--submitting');
    submitBtn.disabled = true;

    try {
      // Simulate API call (replace with actual API endpoint)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Save to localStorage for demo
      saveInquiryToStorage(formData as InquiryFormData);

      // Update WhatsApp follow-up link with form data
      whatsappFollowUp.href = generateWhatsAppLink(project, formData);

      form.classList.remove('inquiry-form--submitting');
      form.classList.add('inquiry-form--success');
    } catch (error) {
      form.classList.remove('inquiry-form--submitting');
      form.classList.add('inquiry-form--error');
    } finally {
      submitBtn.disabled = false;
    }
  });

  // Real-time validation
  [nameInput, phoneInput, emailInput].forEach(input => {
    input.addEventListener('blur', () => {
      const group = input.parentElement;
      const errorEl = group?.querySelector('.inquiry-form__error');

      if (input.required && !input.value.trim()) {
        group?.classList.add('inquiry-form__group--error');
        if (errorEl) errorEl.textContent = `${input.placeholder || 'This field'} is required`;
      } else if (input.type === 'email' && input.value && !validateEmail(input.value)) {
        group?.classList.add('inquiry-form__group--error');
        if (errorEl) errorEl.textContent = 'Please enter a valid email';
      } else if (input.type === 'tel' && input.value && !validatePhone(input.value)) {
        group?.classList.add('inquiry-form__group--error');
        if (errorEl) errorEl.textContent = 'Please enter a valid phone number';
      } else {
        group?.classList.remove('inquiry-form__group--error');
        if (errorEl) errorEl.textContent = '';
      }
    });

    input.addEventListener('input', () => {
      const group = input.parentElement;
      if (group?.classList.contains('inquiry-form__group--error')) {
        group.classList.remove('inquiry-form__group--error');
        const errorEl = group.querySelector('.inquiry-form__error');
        if (errorEl) errorEl.textContent = '';
      }
    });
  });

  return form;
}

// ─── Create Inquiry Modal ────────────────────────────────────────────────────

export function createInquiryModal(project: Project): HTMLElement {
  const modal = createElement('div', 'inquiry-modal');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'inquiry-modal-title');
  modal.setAttribute('aria-describedby', 'inquiry-modal-desc');

  // Backdrop
  const backdrop = createElement('div', 'inquiry-modal__backdrop');
  modal.appendChild(backdrop);

  // Content Container
  const content = createElement('div', 'inquiry-modal__content');

  // Header
  const header = createElement('div', 'inquiry-modal__header');
  const title = createElement('h2', 'inquiry-modal__title', 'Quick Inquiry');
  title.id = 'inquiry-modal-title';
  header.appendChild(title);

  const closeBtn = createElement('button', 'inquiry-modal__close');
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Close inquiry form');
  closeBtn.textContent = '\u00D7'; // Unicode multiplication sign (x)
  header.appendChild(closeBtn);

  content.appendChild(header);

  // Hidden description for screen readers
  const description = createElement('p', 'sr-only');
  description.id = 'inquiry-modal-desc';
  description.textContent = `Inquiry form for ${project.name} project. Fill in your details to request more information.`;
  content.appendChild(description);

  // Form
  const closeModal = () => {
    modal.classList.remove('inquiry-modal--active');
    document.body.classList.remove('modal-open');
    activeModal = null;

    // Restore focus
    if (previousActiveElement && previousActiveElement instanceof HTMLElement) {
      previousActiveElement.focus();
    }

    // Clean up after animation
    setTimeout(() => {
      if (modal.parentElement) {
        modal.parentElement.removeChild(modal);
      }
    }, 300);
  };

  const form = createInquiryForm(project, closeModal);
  content.appendChild(form);

  modal.appendChild(content);

  // Event Listeners
  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  // Keyboard handling
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Focus trap
  trapFocus(modal);

  return modal;
}

// ─── Open Inquiry Modal ──────────────────────────────────────────────────────

export function openInquiryModal(project: Project): void {
  // Close any existing modal
  if (activeModal) {
    activeModal.classList.remove('inquiry-modal--active');
    document.body.classList.remove('modal-open');
    if (activeModal.parentElement) {
      activeModal.parentElement.removeChild(activeModal);
    }
  }

  // Store current focus
  previousActiveElement = document.activeElement;

  // Create and append modal
  const modal = createInquiryModal(project);
  document.body.appendChild(modal);
  activeModal = modal;

  // Trigger animation
  requestAnimationFrame(() => {
    modal.classList.add('inquiry-modal--active');
    document.body.classList.add('modal-open');

    // Focus first input
    const firstInput = modal.querySelector('.inquiry-form__input') as HTMLElement;
    if (firstInput) firstInput.focus();
  });
}

// ─── Create Inquiry Button ───────────────────────────────────────────────────

export function createInquiryButton(project: Project, variant: 'primary' | 'ghost' | 'sm' = 'ghost'): HTMLButtonElement {
  // For sm variant, use primary styling instead of ghost for better visual distinction
  const btnClass = variant === 'sm' ? 'btn btn--sm inquiry-btn' : `btn btn--${variant} inquiry-btn`;
  const btn = createElement('button', btnClass);
  btn.type = 'button';
  btn.setAttribute('aria-label', `Inquire about ${project.name}`);

  const icon = createSVGIcon('icon-email', 'inquiry-btn__icon');
  const text = createElement('span', 'inquiry-btn__text', variant === 'sm' ? 'Inquire' : 'Get Info');

  btn.appendChild(icon);
  btn.appendChild(text);

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    openInquiryModal(project);
  });

  return btn;
}

// ─── Get Stored Inquiries (for admin/demo purposes) ──────────────────────────

export function getStoredInquiries(): InquiryFormData[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function clearStoredInquiries(): void {
  localStorage.removeItem(STORAGE_KEY);
}
