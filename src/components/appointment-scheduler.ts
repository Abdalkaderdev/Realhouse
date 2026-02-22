// ═══════════════════════════════════════════════════════════════════════════
// Viewing Appointment Scheduler Component
// ═══════════════════════════════════════════════════════════════════════════

import { Property } from '../data/properties';

export interface Appointment {
  id: string;
  propertyId: string;
  propertyTitle: string;
  date: string; // ISO date string (YYYY-MM-DD)
  time: string; // HH:MM format
  name: string;
  email: string;
  phone: string;
  notes: string;
  createdAt: string;
}

// Available time slots (9am-6pm, hourly)
const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

// Month names for display
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Helper function to create elements
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

// Format time for display (e.g., "09:00" -> "9:00 AM")
function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Format date for display (e.g., "2026-02-19" -> "Thursday, February 19, 2026")
function formatDateLong(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
  const monthName = MONTH_NAMES[date.getMonth()];
  return `${dayName}, ${monthName} ${date.getDate()}, ${date.getFullYear()}`;
}

// Get appointments from localStorage
function getStoredAppointments(): Appointment[] {
  try {
    const stored = localStorage.getItem('rh-appointments');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Save appointment to localStorage
function saveAppointment(appointment: Appointment): void {
  const appointments = getStoredAppointments();
  appointments.push(appointment);
  localStorage.setItem('rh-appointments', JSON.stringify(appointments));
}

// Generate unique ID
function generateId(): string {
  return 'apt-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// Check if a date is a weekend (Saturday = 6, Sunday = 0)
function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

// Check if a date is in the past
function isPastDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

// Create the appointment scheduler modal
export function createAppointmentScheduler(property: Property): HTMLElement {
  const modal = createElement('div', 'appointment-modal');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'appointment-modal-title');

  // State
  let currentMonth = new Date();
  let selectedDate: string | null = null;
  let selectedTime: string | null = null;

  // Create backdrop
  const backdrop = createElement('div', 'appointment-modal__backdrop');
  backdrop.addEventListener('click', () => closeModal());
  modal.appendChild(backdrop);

  // Create content
  const content = createElement('div', 'appointment-modal__content');

  // Header
  const header = createElement('div', 'appointment-modal__header');
  const title = createElement('h2', 'appointment-modal__title', 'Schedule Viewing');
  title.id = 'appointment-modal-title';
  header.appendChild(title);

  const closeBtn = createElement('button', 'appointment-modal__close');
  closeBtn.setAttribute('aria-label', 'Close modal');
  closeBtn.textContent = '\u00D7'; // multiplication sign as close icon
  closeBtn.addEventListener('click', () => closeModal());
  header.appendChild(closeBtn);
  content.appendChild(header);

  // Property info
  const propertyInfo = createElement('div', 'appointment-modal__property');
  const propertyName = createElement('p', 'appointment-modal__property-name', property.title);
  const propertyLocation = createElement('p', 'appointment-modal__property-location',
    `${property.location.district}, ${property.location.city}`);
  propertyInfo.appendChild(propertyName);
  propertyInfo.appendChild(propertyLocation);
  content.appendChild(propertyInfo);

  // Steps container
  const stepsContainer = createElement('div', 'appointment-modal__steps');

  // Step 1: Date selection
  const step1 = createElement('div', 'appointment-modal__step appointment-modal__step--active');
  step1.id = 'appointment-step-1';

  const step1Title = createElement('h3', 'appointment-modal__step-title', 'Select Date');
  step1.appendChild(step1Title);

  // Calendar
  const calendarContainer = createElement('div', 'appointment-calendar');

  // Calendar header
  const calendarHeader = createElement('div', 'appointment-calendar__header');

  const prevBtn = createElement('button', 'appointment-calendar__nav');
  prevBtn.textContent = '\u2039'; // single left-pointing angle quotation mark
  prevBtn.setAttribute('aria-label', 'Previous month');

  const monthDisplay = createElement('span', 'appointment-calendar__month');

  const nextBtn = createElement('button', 'appointment-calendar__nav');
  nextBtn.textContent = '\u203A'; // single right-pointing angle quotation mark
  nextBtn.setAttribute('aria-label', 'Next month');

  calendarHeader.appendChild(prevBtn);
  calendarHeader.appendChild(monthDisplay);
  calendarHeader.appendChild(nextBtn);
  calendarContainer.appendChild(calendarHeader);

  // Day names
  const dayNames = createElement('div', 'appointment-calendar__days');
  DAY_NAMES.forEach(day => {
    const dayEl = createElement('span', 'appointment-calendar__day-name', day);
    dayNames.appendChild(dayEl);
  });
  calendarContainer.appendChild(dayNames);

  // Calendar grid
  const calendarGrid = createElement('div', 'appointment-calendar__grid');
  calendarContainer.appendChild(calendarGrid);
  step1.appendChild(calendarContainer);

  // Continue button for step 1
  const continueBtn1 = createElement('button', 'btn btn--primary btn--full appointment-modal__continue', 'Continue');
  continueBtn1.disabled = true;
  continueBtn1.addEventListener('click', () => goToStep(2));
  step1.appendChild(continueBtn1);

  stepsContainer.appendChild(step1);

  // Step 2: Time selection
  const step2 = createElement('div', 'appointment-modal__step');
  step2.id = 'appointment-step-2';

  const step2Header = createElement('div', 'appointment-modal__step-header');
  const backBtn2 = createElement('button', 'appointment-modal__back');
  backBtn2.textContent = '\u2039 Back';
  backBtn2.addEventListener('click', () => goToStep(1));
  const step2Title = createElement('h3', 'appointment-modal__step-title', 'Select Time');
  step2Header.appendChild(backBtn2);
  step2Header.appendChild(step2Title);
  step2.appendChild(step2Header);

  const selectedDateDisplay = createElement('p', 'appointment-modal__selected-date');
  step2.appendChild(selectedDateDisplay);

  const timeSlotsContainer = createElement('div', 'appointment-time-slots');
  TIME_SLOTS.forEach(time => {
    const timeBtn = createElement('button', 'appointment-time-slots__slot', formatTime(time));
    timeBtn.setAttribute('data-time', time);
    timeBtn.addEventListener('click', () => selectTime(time, timeBtn));
    timeSlotsContainer.appendChild(timeBtn);
  });
  step2.appendChild(timeSlotsContainer);

  const continueBtn2 = createElement('button', 'btn btn--primary btn--full appointment-modal__continue', 'Continue');
  continueBtn2.disabled = true;
  continueBtn2.addEventListener('click', () => goToStep(3));
  step2.appendChild(continueBtn2);

  stepsContainer.appendChild(step2);

  // Step 3: Contact form
  const step3 = createElement('div', 'appointment-modal__step');
  step3.id = 'appointment-step-3';

  const step3Header = createElement('div', 'appointment-modal__step-header');
  const backBtn3 = createElement('button', 'appointment-modal__back');
  backBtn3.textContent = '\u2039 Back';
  backBtn3.addEventListener('click', () => goToStep(2));
  const step3Title = createElement('h3', 'appointment-modal__step-title', 'Your Details');
  step3Header.appendChild(backBtn3);
  step3Header.appendChild(step3Title);
  step3.appendChild(step3Header);

  const form = createElement('form', 'appointment-form');
  form.setAttribute('novalidate', '');

  // Name field
  const nameGroup = createElement('div', 'appointment-form__group');
  const nameLabel = createElement('label', 'appointment-form__label', 'Full Name');
  nameLabel.setAttribute('for', 'apt-name');
  const nameInput = createElement('input', 'appointment-form__input');
  nameInput.type = 'text';
  nameInput.id = 'apt-name';
  nameInput.name = 'name';
  nameInput.placeholder = 'John Doe';
  nameInput.required = true;
  nameInput.autocomplete = 'name';
  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);
  form.appendChild(nameGroup);

  // Email field
  const emailGroup = createElement('div', 'appointment-form__group');
  const emailLabel = createElement('label', 'appointment-form__label', 'Email Address');
  emailLabel.setAttribute('for', 'apt-email');
  const emailInput = createElement('input', 'appointment-form__input');
  emailInput.type = 'email';
  emailInput.id = 'apt-email';
  emailInput.name = 'email';
  emailInput.placeholder = 'john@example.com';
  emailInput.required = true;
  emailInput.autocomplete = 'email';
  emailGroup.appendChild(emailLabel);
  emailGroup.appendChild(emailInput);
  form.appendChild(emailGroup);

  // Phone field
  const phoneGroup = createElement('div', 'appointment-form__group');
  const phoneLabel = createElement('label', 'appointment-form__label', 'Phone Number');
  phoneLabel.setAttribute('for', 'apt-phone');
  const phoneInput = createElement('input', 'appointment-form__input');
  phoneInput.type = 'tel';
  phoneInput.id = 'apt-phone';
  phoneInput.name = 'phone';
  phoneInput.placeholder = '+1 (555) 000-0000';
  phoneInput.required = true;
  phoneInput.autocomplete = 'tel';
  phoneGroup.appendChild(phoneLabel);
  phoneGroup.appendChild(phoneInput);
  form.appendChild(phoneGroup);

  // Notes field
  const notesGroup = createElement('div', 'appointment-form__group');
  const notesLabel = createElement('label', 'appointment-form__label', 'Notes (optional)');
  notesLabel.setAttribute('for', 'apt-notes');
  const notesInput = createElement('textarea', 'appointment-form__textarea');
  notesInput.id = 'apt-notes';
  notesInput.name = 'notes';
  notesInput.placeholder = 'Any special requests or questions...';
  notesInput.rows = 3;
  notesGroup.appendChild(notesLabel);
  notesGroup.appendChild(notesInput);
  form.appendChild(notesGroup);

  // Error message container
  const formError = createElement('div', 'appointment-form__error');
  formError.setAttribute('role', 'alert');
  formError.setAttribute('aria-live', 'polite');
  form.appendChild(formError);

  const submitBtn = createElement('button', 'btn btn--primary btn--full', 'Confirm Appointment');
  submitBtn.type = 'submit';
  form.appendChild(submitBtn);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formError.textContent = ''; // Clear previous errors
    submitAppointment();
  });

  step3.appendChild(form);
  stepsContainer.appendChild(step3);

  // Step 4: Confirmation
  const step4 = createElement('div', 'appointment-modal__step');
  step4.id = 'appointment-step-4';

  const confirmationContent = createElement('div', 'appointment-confirmation');
  const checkmark = createElement('div', 'appointment-confirmation__checkmark');
  checkmark.textContent = '\u2713'; // checkmark
  confirmationContent.appendChild(checkmark);

  const confirmationTitle = createElement('h3', 'appointment-confirmation__title', 'Appointment Confirmed!');
  confirmationContent.appendChild(confirmationTitle);

  const confirmationDetails = createElement('div', 'appointment-confirmation__details');
  confirmationContent.appendChild(confirmationDetails);

  const confirmationNote = createElement('p', 'appointment-confirmation__note',
    'A confirmation email will be sent to you shortly. Our agent will contact you to confirm the viewing.');
  confirmationContent.appendChild(confirmationNote);

  const doneBtn = createElement('button', 'btn btn--primary btn--full', 'Done');
  doneBtn.addEventListener('click', () => closeModal());
  confirmationContent.appendChild(doneBtn);

  step4.appendChild(confirmationContent);
  stepsContainer.appendChild(step4);

  content.appendChild(stepsContainer);
  modal.appendChild(content);

  // Calendar rendering function
  function renderCalendar() {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Update month display
    monthDisplay.textContent = `${MONTH_NAMES[month]} ${year}`;

    // Clear grid
    while (calendarGrid.firstChild) {
      calendarGrid.removeChild(calendarGrid.firstChild);
    }

    // First day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();

    // Get today and max date (30 days from now)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);

    // Add padding for days before the first
    for (let i = 0; i < startPadding; i++) {
      const emptyDay = createElement('span', 'appointment-calendar__day appointment-calendar__day--empty');
      calendarGrid.appendChild(emptyDay);
    }

    // Add days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      const dayEl = createElement('button', 'appointment-calendar__day');
      dayEl.textContent = String(day);
      dayEl.setAttribute('data-date', dateStr);

      // Check if disabled
      const isPast = isPastDate(date);
      const isWeekendDay = isWeekend(date);
      const isOutOfRange = date > maxDate;

      if (isPast || isWeekendDay || isOutOfRange) {
        dayEl.classList.add('appointment-calendar__day--disabled');
        dayEl.disabled = true;
      } else {
        dayEl.addEventListener('click', () => selectDate(dateStr, dayEl));
      }

      // Check if selected
      if (dateStr === selectedDate) {
        dayEl.classList.add('appointment-calendar__day--selected');
      }

      // Check if today
      if (date.getTime() === today.getTime()) {
        dayEl.classList.add('appointment-calendar__day--today');
      }

      calendarGrid.appendChild(dayEl);
    }
  }

  // Navigation handlers
  prevBtn.addEventListener('click', () => {
    const today = new Date();
    const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (newMonth >= minMonth) {
      currentMonth = newMonth;
      renderCalendar();
    }
  });

  nextBtn.addEventListener('click', () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    const maxMonth = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);

    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    if (newMonth <= maxMonth) {
      currentMonth = newMonth;
      renderCalendar();
    }
  });

  // Select date
  function selectDate(dateStr: string, element: HTMLElement) {
    selectedDate = dateStr;

    // Update visual selection
    calendarGrid.querySelectorAll('.appointment-calendar__day').forEach(day => {
      day.classList.remove('appointment-calendar__day--selected');
    });
    element.classList.add('appointment-calendar__day--selected');

    // Enable continue button
    continueBtn1.disabled = false;
  }

  // Select time
  function selectTime(time: string, element: HTMLElement) {
    selectedTime = time;

    // Update visual selection
    timeSlotsContainer.querySelectorAll('.appointment-time-slots__slot').forEach(slot => {
      slot.classList.remove('appointment-time-slots__slot--selected');
    });
    element.classList.add('appointment-time-slots__slot--selected');

    // Enable continue button
    continueBtn2.disabled = false;
  }

  // Go to step
  function goToStep(step: number) {
    // Hide all steps
    stepsContainer.querySelectorAll('.appointment-modal__step').forEach(s => {
      s.classList.remove('appointment-modal__step--active');
    });

    // Show target step
    const targetStep = document.getElementById(`appointment-step-${step}`);
    if (targetStep) {
      targetStep.classList.add('appointment-modal__step--active');
    }

    // Update content based on step
    if (step === 2 && selectedDate) {
      selectedDateDisplay.textContent = formatDateLong(selectedDate);
    }
  }

  // Submit appointment
  function submitAppointment() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const notes = notesInput.value.trim();

    // Validate required fields
    if (!name || !email || !phone) {
      formError.textContent = 'Please fill in all required fields.';
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formError.textContent = 'Please enter a valid email address.';
      return;
    }

    // Validate phone format
    const phoneRegex = /^[\d\s\-+()]{7,20}$/;
    if (!phoneRegex.test(phone)) {
      formError.textContent = 'Please enter a valid phone number.';
      return;
    }

    if (!selectedDate || !selectedTime) {
      formError.textContent = 'Please select a date and time.';
      return;
    }

    // Create appointment
    const appointment: Appointment = {
      id: generateId(),
      propertyId: property.id,
      propertyTitle: property.title,
      date: selectedDate,
      time: selectedTime,
      name,
      email,
      phone,
      notes,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    saveAppointment(appointment);

    // Update confirmation details using safe DOM methods
    while (confirmationDetails.firstChild) {
      confirmationDetails.removeChild(confirmationDetails.firstChild);
    }

    const dateDetail = createElement('p', 'appointment-confirmation__detail');
    const dateLabel = createElement('strong', undefined, 'Date: ');
    dateDetail.appendChild(dateLabel);
    dateDetail.appendChild(document.createTextNode(formatDateLong(selectedDate)));
    confirmationDetails.appendChild(dateDetail);

    const timeDetail = createElement('p', 'appointment-confirmation__detail');
    const timeLabel = createElement('strong', undefined, 'Time: ');
    timeDetail.appendChild(timeLabel);
    timeDetail.appendChild(document.createTextNode(formatTime(selectedTime)));
    confirmationDetails.appendChild(timeDetail);

    const propertyDetail = createElement('p', 'appointment-confirmation__detail');
    const propertyLabel = createElement('strong', undefined, 'Property: ');
    propertyDetail.appendChild(propertyLabel);
    propertyDetail.appendChild(document.createTextNode(property.title));
    confirmationDetails.appendChild(propertyDetail);

    // Go to confirmation step
    goToStep(4);
  }

  // Close modal
  function closeModal() {
    modal.classList.remove('appointment-modal--active');
    setTimeout(() => {
      modal.remove();
    }, 300);
    document.body.style.overflow = '';
  }

  // Initial render
  renderCalendar();

  // Show modal with animation
  requestAnimationFrame(() => {
    modal.classList.add('appointment-modal--active');
    document.body.style.overflow = 'hidden';
  });

  // Handle escape key
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleKeyDown);
    }
  };
  document.addEventListener('keydown', handleKeyDown);

  return modal;
}

// Open the appointment scheduler for a property
export function openAppointmentScheduler(property: Property): void {
  const modal = createAppointmentScheduler(property);
  document.body.appendChild(modal);
}
