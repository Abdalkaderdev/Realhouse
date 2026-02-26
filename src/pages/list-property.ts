// ===============================================================================
// List Your Property Page - Multi-Step Property Submission Form
// Real House IQ - Premium Real Estate Erbil
// ===============================================================================

import { t } from '../i18n';

const BASE_URL = 'https://realhouseiq.com';
const STORAGE_KEY = 'realhouse_property_listing';

// --- Types -------------------------------------------------------------------

interface PropertyListing {
  // Step 1: Property Type
  propertyType: string;

  // Step 2: Property Details
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuilt: number;
  floors: number;
  parkingSpaces: number;
  furnishing: string;
  features: string[];

  // Step 3: Location
  city: string;
  neighborhood: string;
  address: string;
  nearbyLandmarks: string;

  // Step 4: Pricing
  listingType: 'sale' | 'rent';
  price: number;
  currency: string;
  paymentTerms: string;
  negotiable: boolean;

  // Step 5: Photos
  photos: string[];

  // Step 6: Contact Info
  ownerName: string;
  phone: string;
  email: string;
  preferredContact: string;
  availableTime: string;

  // Meta
  currentStep: number;
  completedAt?: string;
  referenceNumber?: string;
}

const INITIAL_LISTING: PropertyListing = {
  propertyType: '',
  bedrooms: 0,
  bathrooms: 0,
  area: 0,
  yearBuilt: new Date().getFullYear(),
  floors: 1,
  parkingSpaces: 0,
  furnishing: 'unfurnished',
  features: [],
  city: 'Erbil',
  neighborhood: '',
  address: '',
  nearbyLandmarks: '',
  listingType: 'sale',
  price: 0,
  currency: 'USD',
  paymentTerms: '',
  negotiable: false,
  photos: [],
  ownerName: '',
  phone: '',
  email: '',
  preferredContact: 'whatsapp',
  availableTime: '',
  currentStep: 1
};

function getPropertyTypes() {
  return [
    { id: 'apartment', label: t('listProperty.propertyTypes.apartment'), icon: 'icon-building' },
    { id: 'villa', label: t('listProperty.propertyTypes.villa'), icon: 'icon-home' },
    { id: 'house', label: t('listProperty.propertyTypes.house'), icon: 'icon-home' },
    { id: 'land', label: t('listProperty.propertyTypes.land'), icon: 'icon-area' },
    { id: 'commercial', label: t('listProperty.propertyTypes.commercial'), icon: 'icon-shopping' }
  ];
}

const NEIGHBORHOODS = [
  'Gulan', 'Dream City', 'Ankawa', 'Italian Village', 'English Village',
  'Empire World', 'Havalan', 'Divan City', 'Majidi Mall Area', 'Kurdistan City',
  '100 Meter Street', '60 Meter Street', 'Ainkawa', 'Kasnazan', 'Other'
];

function getFeatures() {
  return [
    { id: 'centralAC', label: t('listProperty.features.centralAC') },
    { id: 'balcony', label: t('listProperty.features.balcony') },
    { id: 'garden', label: t('listProperty.features.garden') },
    { id: 'pool', label: t('listProperty.features.pool') },
    { id: 'gym', label: t('listProperty.features.gym') },
    { id: 'elevator', label: t('listProperty.features.elevator') },
    { id: 'security', label: t('listProperty.features.security') },
    { id: 'electricity24_7', label: t('listProperty.features.electricity24_7') },
    { id: 'solarPanels', label: t('listProperty.features.solarPanels') },
    { id: 'smartHome', label: t('listProperty.features.smartHome') },
    { id: 'storageRoom', label: t('listProperty.features.storageRoom') },
    { id: 'maidRoom', label: t('listProperty.features.maidRoom') },
    { id: 'driverRoom', label: t('listProperty.features.driverRoom') },
    { id: 'rooftopAccess', label: t('listProperty.features.rooftopAccess') },
    { id: 'seaLakeView', label: t('listProperty.features.seaLakeView') },
    { id: 'cityView', label: t('listProperty.features.cityView') },
    { id: 'mountainView', label: t('listProperty.features.mountainView') }
  ];
}

// --- Helper Functions --------------------------------------------------------

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
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${iconId}`);
  svg.appendChild(use);
  return svg;
}

function saveToStorage(data: PropertyListing): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

function loadFromStorage(): PropertyListing {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...INITIAL_LISTING, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Failed to load from localStorage:', e);
  }
  return { ...INITIAL_LISTING };
}

function clearStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear localStorage:', e);
  }
}

function generateReferenceNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `RH-${timestamp}-${random}`;
}

function formatPrice(price: number, currency: string): string {
  if (currency === 'USD') {
    return `$${price.toLocaleString()}`;
  }
  return `${price.toLocaleString()} IQD`;
}

function clearElement(element: HTMLElement): void {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// --- Page Render -------------------------------------------------------------

export function renderListPropertyPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const page = createElement('div', 'list-property-page');

  // Load saved data
  let formData = loadFromStorage();

  // Hero Section
  page.appendChild(createHeroSection());

  // Main Content
  const main = createElement('div', 'list-property-page__main');
  const container = createElement('div', 'container');

  // Progress Indicator
  const progressContainer = createElement('div', 'list-property-page__progress-container');
  progressContainer.appendChild(createProgressIndicator(formData.currentStep));
  container.appendChild(progressContainer);

  // Form Container
  const formContainer = createElement('div', 'list-property-page__form-container');
  formContainer.id = 'list-property-form-container';
  container.appendChild(formContainer);

  main.appendChild(container);
  page.appendChild(main);

  // Trust Signals
  page.appendChild(createTrustSignals());

  fragment.appendChild(page);

  // Initialize form after DOM attachment
  setTimeout(() => {
    const formContainerEl = document.getElementById('list-property-form-container');
    if (formContainerEl) {
      renderFormStep(formContainerEl, formData);
    }
  }, 0);

  return fragment;
}

// --- Hero Section ------------------------------------------------------------

function createHeroSection(): HTMLElement {
  const hero = createElement('section', 'list-property-hero');
  const container = createElement('div', 'container');

  const content = createElement('div', 'list-property-hero__content');

  const badge = createElement('span', 'list-property-hero__badge', t('listProperty.freeListing'));
  content.appendChild(badge);

  const title = createElement('h1', 'list-property-hero__title');
  title.textContent = t('listProperty.listYourProperty') + ' ';
  const em = createElement('em', undefined, t('listProperty.withUs'));
  title.appendChild(em);
  content.appendChild(title);

  const subtitle = createElement('p', 'list-property-hero__subtitle');
  subtitle.textContent = t('listProperty.heroSubtitle');
  content.appendChild(subtitle);

  const stats = createElement('div', 'list-property-hero__stats');
  const statsData = [
    { value: '500+', label: t('listProperty.propertiesSold') },
    { value: '48hrs', label: t('listProperty.averageResponse') },
    { value: '98%', label: t('listProperty.clientSatisfaction') }
  ];

  statsData.forEach(stat => {
    const statEl = createElement('div', 'list-property-hero__stat');
    const value = createElement('span', 'list-property-hero__stat-value', stat.value);
    const label = createElement('span', 'list-property-hero__stat-label', stat.label);
    statEl.appendChild(value);
    statEl.appendChild(label);
    stats.appendChild(statEl);
  });
  content.appendChild(stats);

  container.appendChild(content);
  hero.appendChild(container);

  return hero;
}

// --- Progress Indicator ------------------------------------------------------

function createProgressIndicator(currentStep: number): HTMLElement {
  const progress = createElement('div', 'list-property-progress');

  const steps = [
    { num: 1, label: t('listProperty.steps.type') },
    { num: 2, label: t('listProperty.steps.details') },
    { num: 3, label: t('listProperty.steps.location') },
    { num: 4, label: t('listProperty.steps.pricing') },
    { num: 5, label: t('listProperty.steps.photos') },
    { num: 6, label: t('listProperty.steps.contact') },
    { num: 7, label: t('listProperty.steps.review') }
  ];

  const stepsContainer = createElement('div', 'list-property-progress__steps');

  steps.forEach((step, index) => {
    const stepEl = createElement('div', 'list-property-progress__step');

    if (step.num < currentStep) {
      stepEl.classList.add('list-property-progress__step--completed');
    } else if (step.num === currentStep) {
      stepEl.classList.add('list-property-progress__step--active');
    }

    const circle = createElement('div', 'list-property-progress__circle');
    if (step.num < currentStep) {
      circle.appendChild(createSVGUse('icon-check'));
    } else {
      circle.textContent = step.num.toString();
    }
    stepEl.appendChild(circle);

    const label = createElement('span', 'list-property-progress__label', step.label);
    stepEl.appendChild(label);

    stepsContainer.appendChild(stepEl);

    // Add connector line (except after last step)
    if (index < steps.length - 1) {
      const connector = createElement('div', 'list-property-progress__connector');
      if (step.num < currentStep) {
        connector.classList.add('list-property-progress__connector--completed');
      }
      stepsContainer.appendChild(connector);
    }
  });

  progress.appendChild(stepsContainer);

  // Progress bar for mobile
  const progressBar = createElement('div', 'list-property-progress__bar');
  const progressFill = createElement('div', 'list-property-progress__fill');
  progressFill.style.width = `${((currentStep - 1) / 6) * 100}%`;
  progressBar.appendChild(progressFill);
  progress.appendChild(progressBar);

  const progressText = createElement('span', 'list-property-progress__text', t('listProperty.stepOf', { current: currentStep.toString(), total: '7' }));
  progress.appendChild(progressText);

  return progress;
}

// --- Form Step Renderer ------------------------------------------------------

function renderFormStep(container: HTMLElement, data: PropertyListing): void {
  clearElement(container);

  const form = createElement('form', 'list-property-form');
  form.id = 'list-property-form';
  form.setAttribute('novalidate', '');

  switch (data.currentStep) {
    case 1:
      form.appendChild(createStep1(data));
      break;
    case 2:
      form.appendChild(createStep2(data));
      break;
    case 3:
      form.appendChild(createStep3(data));
      break;
    case 4:
      form.appendChild(createStep4(data));
      break;
    case 5:
      form.appendChild(createStep5(data));
      break;
    case 6:
      form.appendChild(createStep6(data));
      break;
    case 7:
      form.appendChild(createStep7(data));
      break;
    case 8:
      form.appendChild(createSuccessState(data));
      break;
  }

  container.appendChild(form);
}

// --- Step 1: Property Type ---------------------------------------------------

function createStep1(data: PropertyListing): HTMLElement {
  const step = createElement('div', 'list-property-step');

  const header = createElement('div', 'list-property-step__header');
  const title = createElement('h2', 'list-property-step__title', t('listProperty.step1Title'));
  header.appendChild(title);
  const subtitle = createElement('p', 'list-property-step__subtitle', t('listProperty.step1Subtitle'));
  header.appendChild(subtitle);
  step.appendChild(header);

  const content = createElement('div', 'list-property-step__content');

  const typeGrid = createElement('div', 'list-property-types');

  getPropertyTypes().forEach(type => {
    const typeCard = createElement('label', 'list-property-type');
    if (data.propertyType === type.id) {
      typeCard.classList.add('list-property-type--selected');
    }

    const input = createElement('input');
    input.type = 'radio';
    input.name = 'propertyType';
    input.value = type.id;
    input.checked = data.propertyType === type.id;
    input.className = 'list-property-type__input';
    typeCard.appendChild(input);

    const iconWrapper = createElement('div', 'list-property-type__icon');
    iconWrapper.appendChild(createSVGUse(type.icon));
    typeCard.appendChild(iconWrapper);

    const label = createElement('span', 'list-property-type__label', type.label);
    typeCard.appendChild(label);

    const checkmark = createElement('div', 'list-property-type__check');
    checkmark.appendChild(createSVGUse('icon-check'));
    typeCard.appendChild(checkmark);

    typeCard.addEventListener('click', () => {
      document.querySelectorAll('.list-property-type').forEach(el => {
        el.classList.remove('list-property-type--selected');
      });
      typeCard.classList.add('list-property-type--selected');
    });

    typeGrid.appendChild(typeCard);
  });

  content.appendChild(typeGrid);
  step.appendChild(content);

  // Navigation
  step.appendChild(createNavigation(data, 1, validateStep1));

  return step;
}

function validateStep1(data: PropertyListing): { valid: boolean; errors: string[] } {
  const form = document.getElementById('list-property-form') as HTMLFormElement;
  const selected = form?.querySelector('input[name="propertyType"]:checked') as HTMLInputElement;

  if (!selected) {
    return { valid: false, errors: [t('listProperty.errors.selectPropertyType')] };
  }

  data.propertyType = selected.value;
  return { valid: true, errors: [] };
}

// --- Step 2: Property Details ------------------------------------------------

function createStep2(data: PropertyListing): HTMLElement {
  const step = createElement('div', 'list-property-step');

  const header = createElement('div', 'list-property-step__header');
  const title = createElement('h2', 'list-property-step__title', t('listProperty.step2Title'));
  header.appendChild(title);
  const subtitle = createElement('p', 'list-property-step__subtitle', t('listProperty.step2Subtitle'));
  header.appendChild(subtitle);
  step.appendChild(header);

  const content = createElement('div', 'list-property-step__content');

  const grid = createElement('div', 'list-property-form__grid');

  // Bedrooms (hide for land/commercial)
  if (!['land', 'commercial'].includes(data.propertyType)) {
    grid.appendChild(createNumberInput('bedrooms', t('listProperty.bedrooms'), data.bedrooms, 0, 20));
    grid.appendChild(createNumberInput('bathrooms', t('listProperty.bathrooms'), data.bathrooms, 0, 15));
  }

  // Area
  const areaGroup = createFormGroup('area', t('listProperty.areaSqm'), 'number');
  const areaInput = areaGroup.querySelector('input') as HTMLInputElement;
  areaInput.value = data.area > 0 ? data.area.toString() : '';
  areaInput.placeholder = t('listProperty.areaPlaceholder');
  areaInput.min = '1';
  grid.appendChild(areaGroup);

  // Year Built (not for land)
  if (data.propertyType !== 'land') {
    const yearGroup = createFormGroup('yearBuilt', t('listProperty.yearBuilt'), 'number');
    const yearInput = yearGroup.querySelector('input') as HTMLInputElement;
    yearInput.value = data.yearBuilt > 0 ? data.yearBuilt.toString() : '';
    yearInput.placeholder = t('listProperty.yearBuiltPlaceholder');
    yearInput.min = '1900';
    yearInput.max = new Date().getFullYear().toString();
    grid.appendChild(yearGroup);
  }

  // Floors
  if (!['land'].includes(data.propertyType)) {
    grid.appendChild(createNumberInput('floors', t('listProperty.floors'), data.floors, 1, 50));
  }

  // Parking
  if (data.propertyType !== 'land') {
    grid.appendChild(createNumberInput('parkingSpaces', t('listProperty.parkingSpaces'), data.parkingSpaces, 0, 20));
  }

  content.appendChild(grid);

  // Furnishing (not for land)
  if (data.propertyType !== 'land') {
    const furnishingGroup = createElement('div', 'list-property-form__group list-property-form__group--full');
    const furnishingLabel = createElement('label', 'list-property-form__label', t('listProperty.furnishingStatus'));
    furnishingGroup.appendChild(furnishingLabel);

    const furnishingOptions = createElement('div', 'list-property-form__radio-group');
    const furnishingChoices = [
      { value: 'unfurnished', label: t('listProperty.furnishing.unfurnished') },
      { value: 'semifurnished', label: t('listProperty.furnishing.semiFurnished') },
      { value: 'fullyfurnished', label: t('listProperty.furnishing.fullyFurnished') }
    ];
    furnishingChoices.forEach(option => {
      const radioLabel = createElement('label', 'list-property-form__radio');

      const input = createElement('input');
      input.type = 'radio';
      input.name = 'furnishing';
      input.value = option.value;
      input.checked = data.furnishing === option.value;
      radioLabel.appendChild(input);

      const radioText = createElement('span', undefined, option.label);
      radioLabel.appendChild(radioText);

      furnishingOptions.appendChild(radioLabel);
    });
    furnishingGroup.appendChild(furnishingOptions);
    content.appendChild(furnishingGroup);
  }

  // Features
  if (data.propertyType !== 'land') {
    const featuresGroup = createElement('div', 'list-property-form__group list-property-form__group--full');
    const featuresLabel = createElement('label', 'list-property-form__label', t('listProperty.propertyFeatures'));
    featuresGroup.appendChild(featuresLabel);

    const featuresGrid = createElement('div', 'list-property-features');
    getFeatures().forEach(feature => {
      const featureLabel = createElement('label', 'list-property-feature');

      const checkbox = createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'features';
      checkbox.value = feature.id;
      checkbox.checked = data.features.includes(feature.id);
      featureLabel.appendChild(checkbox);

      const featureText = createElement('span', undefined, feature.label);
      featureLabel.appendChild(featureText);

      featuresGrid.appendChild(featureLabel);
    });
    featuresGroup.appendChild(featuresGrid);
    content.appendChild(featuresGroup);
  }

  step.appendChild(content);
  step.appendChild(createNavigation(data, 2, validateStep2));

  return step;
}

function createNumberInput(name: string, label: string, value: number, min: number, max: number): HTMLElement {
  const group = createElement('div', 'list-property-form__group');

  const labelEl = createElement('label', 'list-property-form__label', label);
  labelEl.setAttribute('for', name);
  group.appendChild(labelEl);

  const counter = createElement('div', 'list-property-counter');

  const minusBtn = createElement('button', 'list-property-counter__btn', '-');
  minusBtn.type = 'button';
  counter.appendChild(minusBtn);

  const input = createElement('input', 'list-property-counter__input');
  input.type = 'number';
  input.id = name;
  input.name = name;
  input.value = value.toString();
  input.min = min.toString();
  input.max = max.toString();
  input.readOnly = true;
  counter.appendChild(input);

  const plusBtn = createElement('button', 'list-property-counter__btn', '+');
  plusBtn.type = 'button';
  counter.appendChild(plusBtn);

  minusBtn.addEventListener('click', () => {
    const currentVal = parseInt(input.value) || 0;
    if (currentVal > min) {
      input.value = (currentVal - 1).toString();
    }
  });

  plusBtn.addEventListener('click', () => {
    const currentVal = parseInt(input.value) || 0;
    if (currentVal < max) {
      input.value = (currentVal + 1).toString();
    }
  });

  group.appendChild(counter);
  return group;
}

function createFormGroup(name: string, label: string, type: string): HTMLElement {
  const group = createElement('div', 'list-property-form__group');

  const labelEl = createElement('label', 'list-property-form__label', label);
  labelEl.setAttribute('for', name);
  group.appendChild(labelEl);

  const input = createElement('input', 'list-property-form__input');
  input.type = type;
  input.id = name;
  input.name = name;
  group.appendChild(input);

  return group;
}

function validateStep2(data: PropertyListing): { valid: boolean; errors: string[] } {
  const form = document.getElementById('list-property-form') as HTMLFormElement;
  const errors: string[] = [];

  // Get values
  const area = parseFloat((form.querySelector('[name="area"]') as HTMLInputElement)?.value) || 0;
  const bedrooms = parseInt((form.querySelector('[name="bedrooms"]') as HTMLInputElement)?.value) || 0;
  const bathrooms = parseInt((form.querySelector('[name="bathrooms"]') as HTMLInputElement)?.value) || 0;
  const yearBuilt = parseInt((form.querySelector('[name="yearBuilt"]') as HTMLInputElement)?.value) || 0;
  const floors = parseInt((form.querySelector('[name="floors"]') as HTMLInputElement)?.value) || 1;
  const parkingSpaces = parseInt((form.querySelector('[name="parkingSpaces"]') as HTMLInputElement)?.value) || 0;
  const furnishing = (form.querySelector('[name="furnishing"]:checked') as HTMLInputElement)?.value || 'unfurnished';

  const features: string[] = [];
  form.querySelectorAll('[name="features"]:checked').forEach((checkbox: Element) => {
    features.push((checkbox as HTMLInputElement).value);
  });

  // Validation
  if (area <= 0) {
    errors.push(t('listProperty.errors.enterValidArea'));
  }

  if (!['land', 'commercial'].includes(data.propertyType) && bedrooms <= 0) {
    errors.push(t('listProperty.errors.specifyBedrooms'));
  }

  // Update data
  data.area = area;
  data.bedrooms = bedrooms;
  data.bathrooms = bathrooms;
  data.yearBuilt = yearBuilt;
  data.floors = floors;
  data.parkingSpaces = parkingSpaces;
  data.furnishing = furnishing;
  data.features = features;

  return { valid: errors.length === 0, errors };
}

// --- Step 3: Location --------------------------------------------------------

function createStep3(data: PropertyListing): HTMLElement {
  const step = createElement('div', 'list-property-step');

  const header = createElement('div', 'list-property-step__header');
  const title = createElement('h2', 'list-property-step__title', t('listProperty.step3Title'));
  header.appendChild(title);
  const subtitle = createElement('p', 'list-property-step__subtitle', t('listProperty.step3Subtitle'));
  header.appendChild(subtitle);
  step.appendChild(header);

  const content = createElement('div', 'list-property-step__content');

  const grid = createElement('div', 'list-property-form__grid');

  // City
  const cityGroup = createFormGroup('city', t('listProperty.city'), 'text');
  const cityInput = cityGroup.querySelector('input') as HTMLInputElement;
  cityInput.value = data.city || 'Erbil';
  cityInput.placeholder = t('listProperty.cityPlaceholder');
  grid.appendChild(cityGroup);

  // Neighborhood
  const neighborhoodGroup = createElement('div', 'list-property-form__group');
  const neighborhoodLabel = createElement('label', 'list-property-form__label', t('listProperty.neighborhoodDistrict'));
  neighborhoodLabel.setAttribute('for', 'neighborhood');
  neighborhoodGroup.appendChild(neighborhoodLabel);

  const neighborhoodSelect = createElement('select', 'list-property-form__select');
  neighborhoodSelect.id = 'neighborhood';
  neighborhoodSelect.name = 'neighborhood';

  const defaultOption = createElement('option', undefined, t('listProperty.selectNeighborhood'));
  defaultOption.value = '';
  neighborhoodSelect.appendChild(defaultOption);

  NEIGHBORHOODS.forEach(neighborhood => {
    const option = createElement('option', undefined, neighborhood);
    option.value = neighborhood;
    option.selected = data.neighborhood === neighborhood;
    neighborhoodSelect.appendChild(option);
  });

  neighborhoodGroup.appendChild(neighborhoodSelect);
  grid.appendChild(neighborhoodGroup);

  content.appendChild(grid);

  // Address
  const addressGroup = createElement('div', 'list-property-form__group list-property-form__group--full');
  const addressLabel = createElement('label', 'list-property-form__label', t('listProperty.fullAddress'));
  addressLabel.setAttribute('for', 'address');
  addressGroup.appendChild(addressLabel);

  const addressInput = createElement('textarea', 'list-property-form__textarea');
  addressInput.id = 'address';
  addressInput.name = 'address';
  addressInput.placeholder = t('listProperty.addressPlaceholder');
  addressInput.rows = 3;
  addressInput.value = data.address;
  addressGroup.appendChild(addressInput);
  content.appendChild(addressGroup);

  // Nearby Landmarks
  const landmarksGroup = createElement('div', 'list-property-form__group list-property-form__group--full');
  const landmarksLabel = createElement('label', 'list-property-form__label', t('listProperty.nearbyLandmarks'));
  landmarksLabel.setAttribute('for', 'nearbyLandmarks');
  landmarksGroup.appendChild(landmarksLabel);

  const landmarksInput = createElement('input', 'list-property-form__input');
  landmarksInput.id = 'nearbyLandmarks';
  landmarksInput.name = 'nearbyLandmarks';
  landmarksInput.placeholder = t('listProperty.landmarksPlaceholder');
  landmarksInput.value = data.nearbyLandmarks;
  landmarksGroup.appendChild(landmarksInput);
  content.appendChild(landmarksGroup);

  step.appendChild(content);
  step.appendChild(createNavigation(data, 3, validateStep3));

  return step;
}

function validateStep3(data: PropertyListing): { valid: boolean; errors: string[] } {
  const form = document.getElementById('list-property-form') as HTMLFormElement;
  const errors: string[] = [];

  const city = (form.querySelector('[name="city"]') as HTMLInputElement)?.value.trim();
  const neighborhood = (form.querySelector('[name="neighborhood"]') as HTMLSelectElement)?.value;
  const address = (form.querySelector('[name="address"]') as HTMLTextAreaElement)?.value.trim();
  const nearbyLandmarks = (form.querySelector('[name="nearbyLandmarks"]') as HTMLInputElement)?.value.trim();

  if (!city) {
    errors.push(t('listProperty.errors.enterCity'));
  }

  if (!neighborhood) {
    errors.push(t('listProperty.errors.selectNeighborhood'));
  }

  if (!address) {
    errors.push(t('listProperty.errors.provideAddress'));
  }

  data.city = city;
  data.neighborhood = neighborhood;
  data.address = address;
  data.nearbyLandmarks = nearbyLandmarks;

  return { valid: errors.length === 0, errors };
}

// --- Step 4: Pricing ---------------------------------------------------------

function createStep4(data: PropertyListing): HTMLElement {
  const step = createElement('div', 'list-property-step');

  const header = createElement('div', 'list-property-step__header');
  const title = createElement('h2', 'list-property-step__title', t('listProperty.step4Title'));
  header.appendChild(title);
  const subtitle = createElement('p', 'list-property-step__subtitle', t('listProperty.step4Subtitle'));
  header.appendChild(subtitle);
  step.appendChild(header);

  const content = createElement('div', 'list-property-step__content');

  // Listing Type
  const listingTypeGroup = createElement('div', 'list-property-form__group list-property-form__group--full');
  const listingTypeLabel = createElement('label', 'list-property-form__label', t('listProperty.listingType'));
  listingTypeGroup.appendChild(listingTypeLabel);

  const listingTypeOptions = createElement('div', 'list-property-form__toggle-group');

  const saleOption = createElement('label', 'list-property-form__toggle');
  if (data.listingType === 'sale') saleOption.classList.add('list-property-form__toggle--active');
  const saleInput = createElement('input');
  saleInput.type = 'radio';
  saleInput.name = 'listingType';
  saleInput.value = 'sale';
  saleInput.checked = data.listingType === 'sale';
  saleOption.appendChild(saleInput);
  const saleText = createElement('span', undefined, t('listProperty.forSale'));
  saleOption.appendChild(saleText);
  listingTypeOptions.appendChild(saleOption);

  const rentOption = createElement('label', 'list-property-form__toggle');
  if (data.listingType === 'rent') rentOption.classList.add('list-property-form__toggle--active');
  const rentInput = createElement('input');
  rentInput.type = 'radio';
  rentInput.name = 'listingType';
  rentInput.value = 'rent';
  rentInput.checked = data.listingType === 'rent';
  rentOption.appendChild(rentInput);
  const rentText = createElement('span', undefined, t('listProperty.forRent'));
  rentOption.appendChild(rentText);
  listingTypeOptions.appendChild(rentOption);

  // Toggle active state
  [saleOption, rentOption].forEach(option => {
    option.addEventListener('click', () => {
      listingTypeOptions.querySelectorAll('.list-property-form__toggle').forEach(el => {
        el.classList.remove('list-property-form__toggle--active');
      });
      option.classList.add('list-property-form__toggle--active');
    });
  });

  listingTypeGroup.appendChild(listingTypeOptions);
  content.appendChild(listingTypeGroup);

  // Price
  const priceGrid = createElement('div', 'list-property-form__grid');

  const priceGroup = createElement('div', 'list-property-form__group');
  const priceLabel = createElement('label', 'list-property-form__label', t('listProperty.price'));
  priceLabel.setAttribute('for', 'price');
  priceGroup.appendChild(priceLabel);

  const priceInputWrapper = createElement('div', 'list-property-form__input-wrapper');
  const priceInput = createElement('input', 'list-property-form__input');
  priceInput.type = 'number';
  priceInput.id = 'price';
  priceInput.name = 'price';
  priceInput.value = data.price > 0 ? data.price.toString() : '';
  priceInput.placeholder = t('listProperty.pricePlaceholder');
  priceInput.min = '0';
  priceInputWrapper.appendChild(priceInput);
  priceGroup.appendChild(priceInputWrapper);
  priceGrid.appendChild(priceGroup);

  // Currency
  const currencyGroup = createElement('div', 'list-property-form__group');
  const currencyLabel = createElement('label', 'list-property-form__label', t('listProperty.currency'));
  currencyLabel.setAttribute('for', 'currency');
  currencyGroup.appendChild(currencyLabel);

  const currencySelect = createElement('select', 'list-property-form__select');
  currencySelect.id = 'currency';
  currencySelect.name = 'currency';

  const currencies = [
    { value: 'USD', label: t('listProperty.currencyUSD') },
    { value: 'IQD', label: t('listProperty.currencyIQD') }
  ];
  currencies.forEach(currency => {
    const option = createElement('option', undefined, currency.label);
    option.value = currency.value;
    option.selected = data.currency === currency.value;
    currencySelect.appendChild(option);
  });

  currencyGroup.appendChild(currencySelect);
  priceGrid.appendChild(currencyGroup);

  content.appendChild(priceGrid);

  // Payment Terms
  const termsGroup = createElement('div', 'list-property-form__group list-property-form__group--full');
  const termsLabel = createElement('label', 'list-property-form__label', t('listProperty.paymentTerms'));
  termsLabel.setAttribute('for', 'paymentTerms');
  termsGroup.appendChild(termsLabel);

  const termsInput = createElement('input', 'list-property-form__input');
  termsInput.id = 'paymentTerms';
  termsInput.name = 'paymentTerms';
  termsInput.placeholder = t('listProperty.paymentTermsPlaceholder');
  termsInput.value = data.paymentTerms;
  termsGroup.appendChild(termsInput);
  content.appendChild(termsGroup);

  // Negotiable
  const negotiableGroup = createElement('div', 'list-property-form__group list-property-form__group--full');
  const negotiableLabel = createElement('label', 'list-property-form__checkbox');

  const negotiableCheckbox = createElement('input');
  negotiableCheckbox.type = 'checkbox';
  negotiableCheckbox.name = 'negotiable';
  negotiableCheckbox.checked = data.negotiable;
  negotiableLabel.appendChild(negotiableCheckbox);

  const negotiableText = createElement('span', undefined, t('listProperty.priceNegotiable'));
  negotiableLabel.appendChild(negotiableText);
  negotiableGroup.appendChild(negotiableLabel);
  content.appendChild(negotiableGroup);

  step.appendChild(content);
  step.appendChild(createNavigation(data, 4, validateStep4));

  return step;
}

function validateStep4(data: PropertyListing): { valid: boolean; errors: string[] } {
  const form = document.getElementById('list-property-form') as HTMLFormElement;
  const errors: string[] = [];

  const listingType = (form.querySelector('[name="listingType"]:checked') as HTMLInputElement)?.value as 'sale' | 'rent';
  const price = parseFloat((form.querySelector('[name="price"]') as HTMLInputElement)?.value) || 0;
  const currency = (form.querySelector('[name="currency"]') as HTMLSelectElement)?.value;
  const paymentTerms = (form.querySelector('[name="paymentTerms"]') as HTMLInputElement)?.value.trim();
  const negotiable = (form.querySelector('[name="negotiable"]') as HTMLInputElement)?.checked;

  if (!listingType) {
    errors.push(t('listProperty.errors.selectListingType'));
  }

  if (price <= 0) {
    errors.push(t('listProperty.errors.enterValidPrice'));
  }

  data.listingType = listingType;
  data.price = price;
  data.currency = currency;
  data.paymentTerms = paymentTerms;
  data.negotiable = negotiable;

  return { valid: errors.length === 0, errors };
}

// --- Step 5: Photos ----------------------------------------------------------

function createStep5(data: PropertyListing): HTMLElement {
  const step = createElement('div', 'list-property-step');

  const header = createElement('div', 'list-property-step__header');
  const title = createElement('h2', 'list-property-step__title', t('listProperty.step5Title'));
  header.appendChild(title);
  const subtitle = createElement('p', 'list-property-step__subtitle', t('listProperty.step5Subtitle'));
  header.appendChild(subtitle);
  step.appendChild(header);

  const content = createElement('div', 'list-property-step__content');

  // Drag & Drop Area
  const dropzone = createElement('div', 'list-property-dropzone');
  dropzone.id = 'photo-dropzone';

  const dropzoneIcon = createElement('div', 'list-property-dropzone__icon');
  // Upload cloud icon
  const uploadSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  uploadSvg.setAttribute('viewBox', '0 0 24 24');
  uploadSvg.setAttribute('fill', 'none');
  uploadSvg.setAttribute('stroke', 'currentColor');
  uploadSvg.setAttribute('stroke-width', '2');
  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path1.setAttribute('d', 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4');
  uploadSvg.appendChild(path1);
  const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polyline.setAttribute('points', '17 8 12 3 7 8');
  uploadSvg.appendChild(polyline);
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', '12');
  line.setAttribute('y1', '3');
  line.setAttribute('x2', '12');
  line.setAttribute('y2', '15');
  uploadSvg.appendChild(line);
  dropzoneIcon.appendChild(uploadSvg);
  dropzone.appendChild(dropzoneIcon);

  const dropzoneText = createElement('div', 'list-property-dropzone__text');
  const dropzoneTitle = createElement('p', 'list-property-dropzone__title', t('listProperty.dragDropPhotos'));
  dropzoneText.appendChild(dropzoneTitle);
  const dropzoneOr = createElement('p', 'list-property-dropzone__or', t('listProperty.or'));
  dropzoneText.appendChild(dropzoneOr);
  dropzone.appendChild(dropzoneText);

  const browseBtn = createElement('label', 'btn btn--outline list-property-dropzone__btn');
  browseBtn.textContent = t('listProperty.browseFiles');
  const fileInput = createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.multiple = true;
  fileInput.className = 'visually-hidden';
  fileInput.id = 'photo-input';
  browseBtn.appendChild(fileInput);
  dropzone.appendChild(browseBtn);

  const dropzoneHint = createElement('p', 'list-property-dropzone__hint', t('listProperty.supportedFormats'));
  dropzone.appendChild(dropzoneHint);

  content.appendChild(dropzone);

  // Photo Preview Grid
  const previewGrid = createElement('div', 'list-property-photos');
  previewGrid.id = 'photo-preview';

  // Show existing photos
  data.photos.forEach((photo, index) => {
    previewGrid.appendChild(createPhotoPreview(photo, index));
  });

  content.appendChild(previewGrid);

  // Note
  const noteBox = createElement('div', 'list-property-note');
  const noteIcon = createElement('span', 'list-property-note__icon');
  noteIcon.appendChild(createSVGUse('icon-info'));
  noteBox.appendChild(noteIcon);
  const noteText = createElement('p', undefined, t('listProperty.photoNote'));
  noteBox.appendChild(noteText);
  content.appendChild(noteBox);

  step.appendChild(content);
  step.appendChild(createNavigation(data, 5, validateStep5));

  // Setup drag & drop after render
  setTimeout(() => {
    setupDropzone(data);
  }, 0);

  return step;
}

function createPhotoPreview(src: string, index: number): HTMLElement {
  const preview = createElement('div', 'list-property-photo');
  preview.setAttribute('data-index', index.toString());

  const img = createElement('img');
  img.src = src;
  img.alt = `Property photo ${index + 1}`;
  preview.appendChild(img);

  const removeBtn = createElement('button', 'list-property-photo__remove');
  removeBtn.type = 'button';
  removeBtn.textContent = '\u00D7';
  removeBtn.addEventListener('click', () => {
    preview.remove();
  });
  preview.appendChild(removeBtn);

  if (index === 0) {
    const badge = createElement('span', 'list-property-photo__badge', t('listProperty.mainPhoto'));
    preview.appendChild(badge);
  }

  return preview;
}

function setupDropzone(data: PropertyListing): void {
  const dropzone = document.getElementById('photo-dropzone');
  const fileInput = document.getElementById('photo-input') as HTMLInputElement;
  const previewGrid = document.getElementById('photo-preview');

  if (!dropzone || !fileInput || !previewGrid) return;

  // Drag events
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => {
      dropzone.classList.add('list-property-dropzone--active');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, () => {
      dropzone.classList.remove('list-property-dropzone--active');
    });
  });

  // Handle drop
  dropzone.addEventListener('drop', (e) => {
    const files = (e as DragEvent).dataTransfer?.files;
    if (files) {
      handleFiles(files, previewGrid, data);
    }
  });

  // Handle file input
  fileInput.addEventListener('change', () => {
    if (fileInput.files) {
      handleFiles(fileInput.files, previewGrid, data);
    }
  });
}

function handleFiles(files: FileList, previewGrid: HTMLElement, data: PropertyListing): void {
  Array.from(files).forEach(file => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('File too large. Maximum size is 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        data.photos.push(result);
        const index = data.photos.length - 1;
        previewGrid.appendChild(createPhotoPreview(result, index));
      }
    };
    reader.readAsDataURL(file);
  });
}

function validateStep5(data: PropertyListing): { valid: boolean; errors: string[] } {
  const previewGrid = document.getElementById('photo-preview');
  const photos = previewGrid?.querySelectorAll('.list-property-photo img');

  // Collect photos from preview (in case of changes)
  data.photos = [];
  photos?.forEach(img => {
    data.photos.push((img as HTMLImageElement).src);
  });

  // Photos are optional but recommended
  return { valid: true, errors: [] };
}

// --- Step 6: Contact Info ----------------------------------------------------

function createStep6(data: PropertyListing): HTMLElement {
  const step = createElement('div', 'list-property-step');

  const header = createElement('div', 'list-property-step__header');
  const title = createElement('h2', 'list-property-step__title', t('listProperty.step6Title'));
  header.appendChild(title);
  const subtitle = createElement('p', 'list-property-step__subtitle', t('listProperty.step6Subtitle'));
  header.appendChild(subtitle);
  step.appendChild(header);

  const content = createElement('div', 'list-property-step__content');

  const grid = createElement('div', 'list-property-form__grid');

  // Owner Name
  const nameGroup = createFormGroup('ownerName', t('listProperty.fullName'), 'text');
  const nameInput = nameGroup.querySelector('input') as HTMLInputElement;
  nameInput.value = data.ownerName;
  nameInput.placeholder = t('listProperty.fullNamePlaceholder');
  nameInput.required = true;
  grid.appendChild(nameGroup);

  // Phone
  const phoneGroup = createFormGroup('phone', t('listProperty.phoneNumber'), 'tel');
  const phoneInput = phoneGroup.querySelector('input') as HTMLInputElement;
  phoneInput.value = data.phone;
  phoneInput.placeholder = t('listProperty.phonePlaceholder');
  phoneInput.required = true;
  grid.appendChild(phoneGroup);

  // Email
  const emailGroup = createFormGroup('email', t('listProperty.emailAddress'), 'email');
  const emailInput = emailGroup.querySelector('input') as HTMLInputElement;
  emailInput.value = data.email;
  emailInput.placeholder = t('listProperty.emailPlaceholder');
  grid.appendChild(emailGroup);

  content.appendChild(grid);

  // Preferred Contact Method
  const contactMethodGroup = createElement('div', 'list-property-form__group list-property-form__group--full');
  const contactMethodLabel = createElement('label', 'list-property-form__label', t('listProperty.preferredContactMethod'));
  contactMethodGroup.appendChild(contactMethodLabel);

  const contactMethodOptions = createElement('div', 'list-property-form__radio-group');
  [
    { value: 'whatsapp', label: t('listProperty.contactMethods.whatsapp') },
    { value: 'phone', label: t('listProperty.contactMethods.phone') },
    { value: 'email', label: t('listProperty.contactMethods.email') }
  ].forEach(option => {
    const radioLabel = createElement('label', 'list-property-form__radio');

    const input = createElement('input');
    input.type = 'radio';
    input.name = 'preferredContact';
    input.value = option.value;
    input.checked = data.preferredContact === option.value;
    radioLabel.appendChild(input);

    const radioText = createElement('span', undefined, option.label);
    radioLabel.appendChild(radioText);

    contactMethodOptions.appendChild(radioLabel);
  });
  contactMethodGroup.appendChild(contactMethodOptions);
  content.appendChild(contactMethodGroup);

  // Available Time
  const timeGroup = createElement('div', 'list-property-form__group list-property-form__group--full');
  const timeLabel = createElement('label', 'list-property-form__label', t('listProperty.bestTimeToContact'));
  timeLabel.setAttribute('for', 'availableTime');
  timeGroup.appendChild(timeLabel);

  const timeInput = createElement('input', 'list-property-form__input');
  timeInput.id = 'availableTime';
  timeInput.name = 'availableTime';
  timeInput.placeholder = t('listProperty.bestTimePlaceholder');
  timeInput.value = data.availableTime;
  timeGroup.appendChild(timeInput);
  content.appendChild(timeGroup);

  step.appendChild(content);
  step.appendChild(createNavigation(data, 6, validateStep6));

  return step;
}

function validateStep6(data: PropertyListing): { valid: boolean; errors: string[] } {
  const form = document.getElementById('list-property-form') as HTMLFormElement;
  const errors: string[] = [];

  const ownerName = (form.querySelector('[name="ownerName"]') as HTMLInputElement)?.value.trim();
  const phone = (form.querySelector('[name="phone"]') as HTMLInputElement)?.value.trim();
  const email = (form.querySelector('[name="email"]') as HTMLInputElement)?.value.trim();
  const preferredContact = (form.querySelector('[name="preferredContact"]:checked') as HTMLInputElement)?.value;
  const availableTime = (form.querySelector('[name="availableTime"]') as HTMLInputElement)?.value.trim();

  if (!ownerName) {
    errors.push(t('listProperty.errors.enterName'));
  }

  if (!phone) {
    errors.push(t('listProperty.errors.enterPhone'));
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push(t('listProperty.errors.enterValidEmail'));
  }

  data.ownerName = ownerName;
  data.phone = phone;
  data.email = email;
  data.preferredContact = preferredContact || 'whatsapp';
  data.availableTime = availableTime;

  return { valid: errors.length === 0, errors };
}

// --- Step 7: Review ----------------------------------------------------------

function createStep7(data: PropertyListing): HTMLElement {
  const step = createElement('div', 'list-property-step');

  const header = createElement('div', 'list-property-step__header');
  const title = createElement('h2', 'list-property-step__title', t('listProperty.step7Title'));
  header.appendChild(title);
  const subtitle = createElement('p', 'list-property-step__subtitle', t('listProperty.step7Subtitle'));
  header.appendChild(subtitle);
  step.appendChild(header);

  const content = createElement('div', 'list-property-step__content');

  // Review Sections
  const reviewSections = createElement('div', 'list-property-review');

  // Property Type
  reviewSections.appendChild(createReviewSection(t('listProperty.propertyType'), [
    { label: t('listProperty.steps.type'), value: getPropertyTypes().find(pt => pt.id === data.propertyType)?.label || data.propertyType }
  ], 1, data));

  // Property Details
  const detailsItems = [
    { label: t('listProperty.area'), value: `${data.area} sqm` }
  ];
  if (!['land', 'commercial'].includes(data.propertyType)) {
    detailsItems.unshift(
      { label: t('listProperty.bedrooms'), value: data.bedrooms.toString() },
      { label: t('listProperty.bathrooms'), value: data.bathrooms.toString() }
    );
  }
  if (data.propertyType !== 'land') {
    detailsItems.push(
      { label: t('listProperty.yearBuilt'), value: data.yearBuilt.toString() },
      { label: t('listProperty.furnishing'), value: data.furnishing }
    );
  }
  if (data.features.length > 0) {
    // Map feature IDs to their translated labels
    const featureLabels = data.features.map(featureId => {
      const feature = getFeatures().find(f => f.id === featureId);
      return feature ? feature.label : featureId;
    });
    detailsItems.push({ label: t('listProperty.propertyFeatures'), value: featureLabels.join(', ') });
  }
  reviewSections.appendChild(createReviewSection(t('listProperty.propertyDetails'), detailsItems, 2, data));

  // Location
  reviewSections.appendChild(createReviewSection(t('listProperty.location'), [
    { label: t('listProperty.city'), value: data.city },
    { label: t('listProperty.neighborhoodDistrict'), value: data.neighborhood },
    { label: t('listProperty.fullAddress'), value: data.address },
    ...(data.nearbyLandmarks ? [{ label: t('listProperty.landmarks'), value: data.nearbyLandmarks }] : [])
  ], 3, data));

  // Pricing
  reviewSections.appendChild(createReviewSection(t('listProperty.pricing'), [
    { label: t('listProperty.listingType'), value: data.listingType === 'sale' ? t('listProperty.forSale') : t('listProperty.forRent') },
    { label: t('listProperty.price'), value: formatPrice(data.price, data.currency) + (data.negotiable ? ` (${t('listProperty.negotiable')})` : '') },
    ...(data.paymentTerms ? [{ label: t('listProperty.paymentTerms'), value: data.paymentTerms }] : [])
  ], 4, data));

  // Photos
  const photosSection = createElement('div', 'list-property-review__section');
  const photosHeader = createElement('div', 'list-property-review__header');
  const photosTitle = createElement('h3', 'list-property-review__title', t('listProperty.photos'));
  photosHeader.appendChild(photosTitle);
  const photosEdit = createElement('button', 'list-property-review__edit', t('listProperty.edit'));
  photosEdit.type = 'button';
  photosEdit.addEventListener('click', () => goToStep(5, data));
  photosHeader.appendChild(photosEdit);
  photosSection.appendChild(photosHeader);

  const photosContent = createElement('div', 'list-property-review__photos');
  if (data.photos.length > 0) {
    data.photos.slice(0, 4).forEach(photo => {
      const img = createElement('img', 'list-property-review__photo');
      img.src = photo;
      img.alt = 'Property photo';
      photosContent.appendChild(img);
    });
    if (data.photos.length > 4) {
      const more = createElement('span', 'list-property-review__more', `+${data.photos.length - 4} ${t('listProperty.more')}`);
      photosContent.appendChild(more);
    }
  } else {
    const noPhotos = createElement('p', 'list-property-review__empty', t('listProperty.noPhotosUploaded'));
    photosContent.appendChild(noPhotos);
  }
  photosSection.appendChild(photosContent);
  reviewSections.appendChild(photosSection);

  // Contact Info
  reviewSections.appendChild(createReviewSection(t('listProperty.contactInfo'), [
    { label: t('listProperty.fullName'), value: data.ownerName },
    { label: t('listProperty.phoneNumber'), value: data.phone },
    ...(data.email ? [{ label: t('listProperty.emailAddress'), value: data.email }] : []),
    { label: t('listProperty.preferredContact'), value: data.preferredContact },
    ...(data.availableTime ? [{ label: t('listProperty.available'), value: data.availableTime }] : [])
  ], 6, data));

  content.appendChild(reviewSections);

  // Terms & Conditions
  const termsGroup = createElement('div', 'list-property-form__group list-property-form__group--full');
  const termsLabel = createElement('label', 'list-property-form__checkbox');

  const termsCheckbox = createElement('input');
  termsCheckbox.type = 'checkbox';
  termsCheckbox.name = 'agreeTerms';
  termsCheckbox.id = 'agreeTerms';
  termsCheckbox.required = true;
  termsLabel.appendChild(termsCheckbox);

  const termsText = createElement('span');
  termsText.textContent = t('listProperty.termsAgree') + ' ';
  const termsLink = createElement('a', undefined, t('listProperty.termsOfService'));
  termsLink.href = '/terms';
  termsLink.setAttribute('data-route', '');
  termsText.appendChild(termsLink);
  termsText.appendChild(document.createTextNode(' ' + t('listProperty.and') + ' '));
  const privacyLink = createElement('a', undefined, t('listProperty.privacyPolicy'));
  privacyLink.href = '/privacy';
  privacyLink.setAttribute('data-route', '');
  termsText.appendChild(privacyLink);
  termsLabel.appendChild(termsText);
  termsGroup.appendChild(termsLabel);
  content.appendChild(termsGroup);

  step.appendChild(content);
  step.appendChild(createNavigation(data, 7, validateStep7, true));

  return step;
}

function createReviewSection(title: string, items: { label: string; value: string }[], stepNum: number, data: PropertyListing): HTMLElement {
  const section = createElement('div', 'list-property-review__section');

  const header = createElement('div', 'list-property-review__header');
  const titleEl = createElement('h3', 'list-property-review__title', title);
  header.appendChild(titleEl);

  const editBtn = createElement('button', 'list-property-review__edit', t('listProperty.edit'));
  editBtn.type = 'button';
  editBtn.addEventListener('click', () => goToStep(stepNum, data));
  header.appendChild(editBtn);
  section.appendChild(header);

  const list = createElement('dl', 'list-property-review__list');
  items.forEach(item => {
    const dt = createElement('dt', undefined, item.label);
    list.appendChild(dt);
    const dd = createElement('dd', undefined, item.value);
    list.appendChild(dd);
  });
  section.appendChild(list);

  return section;
}

function validateStep7(data: PropertyListing): { valid: boolean; errors: string[] } {
  const form = document.getElementById('list-property-form') as HTMLFormElement;
  const errors: string[] = [];

  const agreeTerms = (form.querySelector('[name="agreeTerms"]') as HTMLInputElement)?.checked;

  if (!agreeTerms) {
    errors.push(t('listProperty.errors.agreeTerms'));
  }

  return { valid: errors.length === 0, errors };
}

// --- Success State -----------------------------------------------------------

function createSuccessState(data: PropertyListing): HTMLElement {
  const success = createElement('div', 'list-property-success');

  const iconWrapper = createElement('div', 'list-property-success__icon');
  iconWrapper.appendChild(createSVGUse('icon-check'));
  success.appendChild(iconWrapper);

  const title = createElement('h2', 'list-property-success__title', t('listProperty.successTitle'));
  success.appendChild(title);

  const refNum = createElement('div', 'list-property-success__ref');
  const refLabel = createElement('span', undefined, t('listProperty.referenceNumber') + ' ');
  refNum.appendChild(refLabel);
  const refValue = createElement('strong', undefined, data.referenceNumber || '');
  refNum.appendChild(refValue);
  success.appendChild(refNum);

  const message = createElement('p', 'list-property-success__message');
  message.textContent = t('listProperty.successMessage');
  success.appendChild(message);

  const actions = createElement('div', 'list-property-success__actions');

  const homeBtn = createElement('a', 'btn btn--primary', t('listProperty.backToHome'));
  homeBtn.href = '/';
  homeBtn.setAttribute('data-route', '');
  actions.appendChild(homeBtn);

  const newListingBtn = createElement('button', 'btn btn--outline', t('listProperty.listAnotherProperty'));
  newListingBtn.type = 'button';
  newListingBtn.addEventListener('click', () => {
    clearStorage();
    const container = document.getElementById('list-property-form-container');
    if (container) {
      renderFormStep(container, { ...INITIAL_LISTING });
      updateProgressIndicator(1);
    }
  });
  actions.appendChild(newListingBtn);

  success.appendChild(actions);

  // WhatsApp/Email info
  const contactInfo = createElement('div', 'list-property-success__contact');
  const contactText = createElement('p', undefined, t('listProperty.questionsContact'));
  contactInfo.appendChild(contactText);

  const whatsappLink = createElement('a', 'list-property-success__link', 'WhatsApp: +964 750 792 2138');
  whatsappLink.href = 'https://wa.me/9647507922138';
  whatsappLink.target = '_blank';
  contactInfo.appendChild(whatsappLink);

  success.appendChild(contactInfo);

  return success;
}

// --- Navigation --------------------------------------------------------------

function createNavigation(
  data: PropertyListing,
  currentStep: number,
  validateFn: (data: PropertyListing) => { valid: boolean; errors: string[] },
  isLastStep: boolean = false
): HTMLElement {
  const nav = createElement('div', 'list-property-nav');

  // Error container
  const errorContainer = createElement('div', 'list-property-nav__errors');
  errorContainer.id = 'form-errors';
  nav.appendChild(errorContainer);

  const buttons = createElement('div', 'list-property-nav__buttons');

  // Back button
  if (currentStep > 1) {
    const backBtn = createElement('button', 'btn btn--outline list-property-nav__back', t('listProperty.back'));
    backBtn.type = 'button';
    backBtn.addEventListener('click', () => {
      const validation = validateFn(data);
      // Save even if invalid (to preserve progress)
      data.currentStep = currentStep - 1;
      saveToStorage(data);

      const container = document.getElementById('list-property-form-container');
      if (container) {
        renderFormStep(container, data);
        updateProgressIndicator(data.currentStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    buttons.appendChild(backBtn);
  }

  // Next/Submit button
  const nextBtn = createElement('button', 'btn btn--primary list-property-nav__next');
  nextBtn.type = 'button';
  nextBtn.textContent = isLastStep ? t('listProperty.submitListing') : t('listProperty.continue');

  nextBtn.addEventListener('click', () => {
    const validation = validateFn(data);
    const errorContainerEl = document.getElementById('form-errors');

    if (!validation.valid) {
      if (errorContainerEl) {
        clearElement(errorContainerEl);
        validation.errors.forEach(error => {
          const errorEl = createElement('p', 'list-property-nav__error', error);
          errorContainerEl.appendChild(errorEl);
        });
      }
      return;
    }

    if (errorContainerEl) {
      clearElement(errorContainerEl);
    }

    if (isLastStep) {
      // Submit the form
      data.referenceNumber = generateReferenceNumber();
      data.completedAt = new Date().toISOString();
      data.currentStep = 8;

      // Log to console (for now)
      console.log('=== Property Listing Submitted ===');
      console.log('Reference:', data.referenceNumber);
      console.log('Data:', JSON.stringify(data, null, 2));

      // Clear storage after successful submission
      clearStorage();

      const container = document.getElementById('list-property-form-container');
      if (container) {
        renderFormStep(container, data);
        updateProgressIndicator(7); // Keep progress at step 7 (complete)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      data.currentStep = currentStep + 1;
      saveToStorage(data);

      const container = document.getElementById('list-property-form-container');
      if (container) {
        renderFormStep(container, data);
        updateProgressIndicator(data.currentStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  });

  buttons.appendChild(nextBtn);
  nav.appendChild(buttons);

  return nav;
}

function goToStep(stepNum: number, data: PropertyListing): void {
  data.currentStep = stepNum;
  saveToStorage(data);

  const container = document.getElementById('list-property-form-container');
  if (container) {
    renderFormStep(container, data);
    updateProgressIndicator(stepNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function updateProgressIndicator(currentStep: number): void {
  const progressContainer = document.querySelector('.list-property-page__progress-container');
  if (progressContainer) {
    clearElement(progressContainer as HTMLElement);
    progressContainer.appendChild(createProgressIndicator(currentStep));
  }
}

// --- Trust Signals -----------------------------------------------------------

function createTrustSignals(): HTMLElement {
  const section = createElement('section', 'list-property-trust');
  const container = createElement('div', 'container');

  const grid = createElement('div', 'list-property-trust__grid');

  const signals = [
    { icon: 'icon-shield', title: t('listProperty.trustSignals.freeService'), desc: t('listProperty.trustSignals.freeServiceDesc') },
    { icon: 'icon-clock', title: t('listProperty.trustSignals.fastResponse'), desc: t('listProperty.trustSignals.fastResponseDesc') },
    { icon: 'icon-users', title: t('listProperty.trustSignals.expertAgents'), desc: t('listProperty.trustSignals.expertAgentsDesc') },
    { icon: 'icon-star', title: t('listProperty.trustSignals.wideReach'), desc: t('listProperty.trustSignals.wideReachDesc') }
  ];

  signals.forEach(signal => {
    const card = createElement('div', 'list-property-trust__card');

    const iconWrapper = createElement('div', 'list-property-trust__icon');
    iconWrapper.appendChild(createSVGUse(signal.icon));
    card.appendChild(iconWrapper);

    const title = createElement('h3', 'list-property-trust__title', signal.title);
    card.appendChild(title);

    const desc = createElement('p', 'list-property-trust__desc', signal.desc);
    card.appendChild(desc);

    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

// --- SEO Setup ---------------------------------------------------------------

export function setupListPropertyPageSEO(): void {
  // Update page title and meta description
  document.title = 'List Your Property | Sell or Rent Property Erbil | Real House';

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', 'List your property for free on Real House Erbil. Sell or rent apartments, villas, land in Kurdistan. Reach thousands of buyers. Submit your listing today!');
  }

  // Inject JSON-LD Schema
  injectListPropertySchema();
}

function injectListPropertySchema(): void {
  const existingSchema = document.querySelector('script[data-schema="list-property"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/list-property#webpage`,
    'name': 'List Your Property | Real House Erbil',
    'description': 'Submit your property for sale or rent in Erbil, Kurdistan. Free listing service with expert agent support.',
    'url': `${BASE_URL}/list-property`,
    'isPartOf': {
      '@id': `${BASE_URL}/#website`
    },
    'potentialAction': {
      '@type': 'CreateAction',
      'name': 'List Property',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${BASE_URL}/list-property`
      },
      'result': {
        '@type': 'RealEstateListing',
        'name': 'Property Listing'
      }
    },
    'mainEntity': {
      '@type': 'Service',
      'name': 'Property Listing Service',
      'provider': {
        '@type': 'RealEstateAgent',
        'name': 'Real House',
        'url': BASE_URL
      },
      'serviceType': 'Real Estate Listing',
      'areaServed': {
        '@type': 'City',
        'name': 'Erbil',
        'containedInPlace': {
          '@type': 'State',
          'name': 'Kurdistan Region'
        }
      },
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
        'description': 'Free property listing service'
      }
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-schema', 'list-property');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}
