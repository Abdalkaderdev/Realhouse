// ═══════════════════════════════════════════════════════════════════════════
// Mortgage/Payment Calculator Component for Real House
// Features: Property Price, Down Payment, Loan Term, Interest Rate,
// Monthly Payment, Total Payment, Interest Paid, Amortization, Chart, Print
// ═══════════════════════════════════════════════════════════════════════════

import { t } from '../i18n';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MortgageInput {
  propertyPrice: number;
  downPayment: number;
  downPaymentPercent: number;
  loanTerm: number; // years
  interestRate: number; // annual percentage
}

export interface MortgageResult {
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  monthlyBreakdown: MonthlyBreakdown[];
}

interface MonthlyBreakdown {
  month: number;
  principal: number;
  interest: number;
  balance: number;
  totalPrincipal: number;
  totalInterest: number;
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

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function formatCurrencyDetailed(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// ─── Mortgage Calculation ────────────────────────────────────────────────────

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const loanAmount = input.propertyPrice - input.downPayment;
  const monthlyRate = input.interestRate / 100 / 12;
  const numberOfPayments = input.loanTerm * 12;

  // Monthly payment formula: M = P[r(1+r)^n]/[(1+r)^n-1]
  let monthlyPayment: number;

  if (monthlyRate === 0) {
    // No interest case
    monthlyPayment = loanAmount / numberOfPayments;
  } else {
    const x = Math.pow(1 + monthlyRate, numberOfPayments);
    monthlyPayment = (loanAmount * monthlyRate * x) / (x - 1);
  }

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  // Generate amortization schedule
  const monthlyBreakdown: MonthlyBreakdown[] = [];
  let balance = loanAmount;
  let cumulativePrincipal = 0;
  let cumulativeInterest = 0;

  for (let month = 1; month <= numberOfPayments; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance = Math.max(0, balance - principalPayment);
    cumulativePrincipal += principalPayment;
    cumulativeInterest += interestPayment;

    monthlyBreakdown.push({
      month,
      principal: principalPayment,
      interest: interestPayment,
      balance,
      totalPrincipal: cumulativePrincipal,
      totalInterest: cumulativeInterest
    });
  }

  return {
    loanAmount,
    monthlyPayment,
    totalPayment,
    totalInterest,
    monthlyBreakdown
  };
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function createCalculatorIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('class', 'mortgage-calc__icon');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm-8 8H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V7h2v2z');
  svg.appendChild(path);

  return svg;
}

function createPrintIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z');
  svg.appendChild(path);

  return svg;
}

function createResetIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z');
  svg.appendChild(path);

  return svg;
}

function createInfoIcon(): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('class', 'mortgage-calc__info-icon');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z');
  svg.appendChild(path);

  return svg;
}

// ─── Pie Chart Component ─────────────────────────────────────────────────────

function createPaymentChart(principal: number, interest: number): HTMLElement {
  const chartContainer = createElement('div', 'mortgage-calc__chart');

  const total = principal + interest;
  const principalPercent = (principal / total) * 100;
  const interestPercent = (interest / total) * 100;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('class', 'mortgage-calc__pie-chart');

  // Create pie chart using stroke-dasharray technique
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const principalDash = (principalPercent / 100) * circumference;
  const interestDash = (interestPercent / 100) * circumference;

  // Background circle
  const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  bgCircle.setAttribute('cx', '50');
  bgCircle.setAttribute('cy', '50');
  bgCircle.setAttribute('r', String(radius));
  bgCircle.setAttribute('fill', 'none');
  bgCircle.setAttribute('stroke', 'var(--c-surface-3)');
  bgCircle.setAttribute('stroke-width', '20');
  svg.appendChild(bgCircle);

  // Principal segment (gold)
  const principalCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  principalCircle.setAttribute('cx', '50');
  principalCircle.setAttribute('cy', '50');
  principalCircle.setAttribute('r', String(radius));
  principalCircle.setAttribute('fill', 'none');
  principalCircle.setAttribute('stroke', 'var(--c-gold)');
  principalCircle.setAttribute('stroke-width', '20');
  principalCircle.setAttribute('stroke-dasharray', `${principalDash} ${circumference}`);
  principalCircle.setAttribute('stroke-dashoffset', '0');
  principalCircle.setAttribute('transform', 'rotate(-90 50 50)');
  principalCircle.setAttribute('class', 'mortgage-calc__pie-segment mortgage-calc__pie-segment--principal');
  svg.appendChild(principalCircle);

  // Interest segment (muted)
  const interestCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  interestCircle.setAttribute('cx', '50');
  interestCircle.setAttribute('cy', '50');
  interestCircle.setAttribute('r', String(radius));
  interestCircle.setAttribute('fill', 'none');
  interestCircle.setAttribute('stroke', 'var(--c-text-3)');
  interestCircle.setAttribute('stroke-width', '20');
  interestCircle.setAttribute('stroke-dasharray', `${interestDash} ${circumference}`);
  interestCircle.setAttribute('stroke-dashoffset', String(-principalDash));
  interestCircle.setAttribute('transform', 'rotate(-90 50 50)');
  interestCircle.setAttribute('class', 'mortgage-calc__pie-segment mortgage-calc__pie-segment--interest');
  svg.appendChild(interestCircle);

  chartContainer.appendChild(svg);

  // Legend
  const legend = createElement('div', 'mortgage-calc__chart-legend');

  const principalItem = createElement('div', 'mortgage-calc__legend-item');
  const principalDot = createElement('span', 'mortgage-calc__legend-dot mortgage-calc__legend-dot--principal');
  const principalLabel = createElement('span', 'mortgage-calc__legend-label');
  principalLabel.textContent = `${t('mortgage.principal')}: ${formatCurrency(principal)} (${principalPercent.toFixed(1)}%)`;
  principalItem.appendChild(principalDot);
  principalItem.appendChild(principalLabel);
  legend.appendChild(principalItem);

  const interestItem = createElement('div', 'mortgage-calc__legend-item');
  const interestDot = createElement('span', 'mortgage-calc__legend-dot mortgage-calc__legend-dot--interest');
  const interestLabel = createElement('span', 'mortgage-calc__legend-label');
  interestLabel.textContent = `${t('mortgage.interest')}: ${formatCurrency(interest)} (${interestPercent.toFixed(1)}%)`;
  interestItem.appendChild(interestDot);
  interestItem.appendChild(interestLabel);
  legend.appendChild(interestItem);

  chartContainer.appendChild(legend);

  return chartContainer;
}

// ─── Amortization Table Component ────────────────────────────────────────────

function createAmortizationTable(breakdown: MonthlyBreakdown[], showYearly: boolean = true): HTMLElement {
  const container = createElement('div', 'mortgage-calc__amortization');

  const header = createElement('h4', 'mortgage-calc__section-title', t('mortgage.amortizationSchedule'));
  container.appendChild(header);

  // Toggle between monthly and yearly view
  const toggleContainer = createElement('div', 'mortgage-calc__toggle-container');

  const monthlyBtn = createElement('button', `mortgage-calc__toggle-btn ${!showYearly ? 'active' : ''}`, t('mortgage.monthly'));
  const yearlyBtn = createElement('button', `mortgage-calc__toggle-btn ${showYearly ? 'active' : ''}`, t('mortgage.yearly'));

  toggleContainer.appendChild(monthlyBtn);
  toggleContainer.appendChild(yearlyBtn);
  container.appendChild(toggleContainer);

  const tableWrapper = createElement('div', 'mortgage-calc__table-wrapper');
  const table = createElement('table', 'mortgage-calc__table');

  // Table header
  const thead = createElement('thead');
  const headerRow = createElement('tr');
  const headers = showYearly
    ? [t('mortgage.year'), t('mortgage.principal'), t('mortgage.interest'), t('mortgage.balance')]
    : [t('mortgage.month'), t('mortgage.principal'), t('mortgage.interest'), t('mortgage.balance')];

  headers.forEach(h => {
    const th = createElement('th', '', h);
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Table body
  const tbody = createElement('tbody');

  if (showYearly) {
    // Group by year
    const years = Math.ceil(breakdown.length / 12);
    for (let year = 1; year <= years; year++) {
      const startMonth = (year - 1) * 12;
      const endMonth = Math.min(year * 12, breakdown.length);
      const yearData = breakdown.slice(startMonth, endMonth);

      const yearPrincipal = yearData.reduce((sum, m) => sum + m.principal, 0);
      const yearInterest = yearData.reduce((sum, m) => sum + m.interest, 0);
      const endBalance = yearData[yearData.length - 1]?.balance || 0;

      const row = createElement('tr');
      const yearCell = createElement('td', '', String(year));
      const principalCell = createElement('td', '', formatCurrency(yearPrincipal));
      const interestCell = createElement('td', '', formatCurrency(yearInterest));
      const balanceCell = createElement('td', '', formatCurrency(endBalance));
      row.appendChild(yearCell);
      row.appendChild(principalCell);
      row.appendChild(interestCell);
      row.appendChild(balanceCell);
      tbody.appendChild(row);
    }
  } else {
    // Show first 12 months with expand option
    const displayMonths = Math.min(12, breakdown.length);
    for (let i = 0; i < displayMonths; i++) {
      const m = breakdown[i];
      const row = createElement('tr');
      const monthCell = createElement('td', '', String(m.month));
      const principalCell = createElement('td', '', formatCurrencyDetailed(m.principal));
      const interestCell = createElement('td', '', formatCurrencyDetailed(m.interest));
      const balanceCell = createElement('td', '', formatCurrency(m.balance));
      row.appendChild(monthCell);
      row.appendChild(principalCell);
      row.appendChild(interestCell);
      row.appendChild(balanceCell);
      tbody.appendChild(row);
    }

    if (breakdown.length > 12) {
      const expandRow = createElement('tr', 'mortgage-calc__expand-row');
      const expandCell = createElement('td');
      expandCell.setAttribute('colspan', '4');
      const expandBtn = createElement('button', 'mortgage-calc__expand-btn', t('mortgage.showAllMonths', { count: breakdown.length }));
      expandCell.appendChild(expandBtn);
      expandRow.appendChild(expandCell);
      tbody.appendChild(expandRow);
    }
  }

  table.appendChild(tbody);
  tableWrapper.appendChild(table);
  container.appendChild(tableWrapper);

  return container;
}

// ─── Results Component ───────────────────────────────────────────────────────

function createResultsSection(result: MortgageResult, input: MortgageInput): HTMLElement {
  const container = createElement('div', 'mortgage-calc__results');

  // Main result card
  const mainCard = createElement('div', 'mortgage-calc__result-card mortgage-calc__result-card--main');

  const monthlyLabel = createElement('span', 'mortgage-calc__result-label', t('mortgage.monthlyPayment'));
  mainCard.appendChild(monthlyLabel);

  const monthlyValue = createElement('span', 'mortgage-calc__result-value mortgage-calc__result-value--large');
  monthlyValue.textContent = formatCurrencyDetailed(result.monthlyPayment);
  mainCard.appendChild(monthlyValue);

  container.appendChild(mainCard);

  // Summary grid
  const summaryGrid = createElement('div', 'mortgage-calc__summary-grid');

  const summaryItems = [
    { label: t('mortgage.propertyPrice'), value: formatCurrency(input.propertyPrice) },
    { label: t('mortgage.downPayment'), value: `${formatCurrency(input.downPayment)} (${input.downPaymentPercent.toFixed(0)}%)` },
    { label: t('mortgage.loanAmount'), value: formatCurrency(result.loanAmount) },
    { label: t('mortgage.loanTerm'), value: `${input.loanTerm} ${t('mortgage.years')}` },
    { label: t('mortgage.interestRateShort'), value: `${input.interestRate}% ${t('mortgage.perAnnum')}` },
    { label: t('mortgage.totalPayment'), value: formatCurrency(result.totalPayment) },
    { label: t('mortgage.totalInterest'), value: formatCurrency(result.totalInterest) }
  ];

  summaryItems.forEach(item => {
    const card = createElement('div', 'mortgage-calc__summary-item');
    const label = createElement('span', 'mortgage-calc__summary-label', item.label);
    const value = createElement('span', 'mortgage-calc__summary-value', item.value);
    card.appendChild(label);
    card.appendChild(value);
    summaryGrid.appendChild(card);
  });

  container.appendChild(summaryGrid);

  // Payment breakdown chart
  container.appendChild(createPaymentChart(result.loanAmount, result.totalInterest));

  // Amortization table
  container.appendChild(createAmortizationTable(result.monthlyBreakdown, true));

  return container;
}

// ═══════════════════════════════════════════════════════════════════════════
// Main Calculator Component
// ═══════════════════════════════════════════════════════════════════════════

export interface MortgageCalculatorOptions {
  initialPrice?: number;
  compact?: boolean;
  showTitle?: boolean;
  containerClass?: string;
}

export function createMortgageCalculator(options: MortgageCalculatorOptions = {}): HTMLElement {
  const {
    initialPrice = 0,
    compact = false,
    showTitle = true,
    containerClass = ''
  } = options;

  const container = createElement('div', `mortgage-calc ${compact ? 'mortgage-calc--compact' : ''} ${containerClass}`.trim());

  // State
  let isDownPaymentPercent = true;
  let currentResult: MortgageResult | null = null;
  let currentInput: MortgageInput | null = null;

  // Header
  if (showTitle) {
    const header = createElement('div', 'mortgage-calc__header');
    header.appendChild(createCalculatorIcon());
    const title = createElement('h3', 'mortgage-calc__title', t('mortgage.title'));
    header.appendChild(title);
    container.appendChild(header);
  }

  // Form
  const form = createElement('form', 'mortgage-calc__form');
  form.setAttribute('id', 'mortgage-calculator-form');

  // Property Price
  const priceGroup = createElement('div', 'mortgage-calc__form-group');
  const priceLabel = createElement('label', 'mortgage-calc__label', t('mortgage.propertyPrice'));
  priceLabel.setAttribute('for', 'mortgage-price');
  priceGroup.appendChild(priceLabel);

  const priceInputWrapper = createElement('div', 'mortgage-calc__input-wrapper');
  const priceCurrency = createElement('span', 'mortgage-calc__currency', '$');
  priceInputWrapper.appendChild(priceCurrency);

  const priceInput = createElement('input', 'mortgage-calc__input');
  priceInput.type = 'number';
  priceInput.id = 'mortgage-price';
  priceInput.name = 'propertyPrice';
  priceInput.min = '0';
  priceInput.step = '1000';
  priceInput.value = initialPrice > 0 ? String(initialPrice) : '';
  priceInput.placeholder = '250000';
  priceInput.required = true;
  priceInputWrapper.appendChild(priceInput);
  priceGroup.appendChild(priceInputWrapper);
  form.appendChild(priceGroup);

  // Down Payment
  const downGroup = createElement('div', 'mortgage-calc__form-group');
  const downLabelWrapper = createElement('div', 'mortgage-calc__label-wrapper');
  const downLabel = createElement('label', 'mortgage-calc__label', t('mortgage.downPayment'));
  downLabel.setAttribute('for', 'mortgage-down');
  downLabelWrapper.appendChild(downLabel);

  // Toggle between amount and percentage
  const downToggle = createElement('div', 'mortgage-calc__toggle');
  const amountBtn = createElement('button', 'mortgage-calc__toggle-btn', '$');
  amountBtn.type = 'button';
  amountBtn.setAttribute('data-mode', 'amount');
  const percentBtn = createElement('button', 'mortgage-calc__toggle-btn active', '%');
  percentBtn.type = 'button';
  percentBtn.setAttribute('data-mode', 'percent');
  downToggle.appendChild(amountBtn);
  downToggle.appendChild(percentBtn);
  downLabelWrapper.appendChild(downToggle);
  downGroup.appendChild(downLabelWrapper);

  const downInputWrapper = createElement('div', 'mortgage-calc__input-wrapper');
  const downSymbol = createElement('span', 'mortgage-calc__currency', '%');
  downInputWrapper.appendChild(downSymbol);

  const downInput = createElement('input', 'mortgage-calc__input');
  downInput.type = 'number';
  downInput.id = 'mortgage-down';
  downInput.name = 'downPayment';
  downInput.min = '0';
  downInput.max = isDownPaymentPercent ? '100' : '';
  downInput.step = isDownPaymentPercent ? '1' : '1000';
  downInput.value = '20';
  downInput.placeholder = '20';
  downInput.required = true;
  downInputWrapper.appendChild(downInput);
  downGroup.appendChild(downInputWrapper);
  form.appendChild(downGroup);

  // Handle down payment toggle
  const handleDownToggle = (mode: 'amount' | 'percent') => {
    isDownPaymentPercent = mode === 'percent';
    downSymbol.textContent = isDownPaymentPercent ? '%' : '$';
    downInput.max = isDownPaymentPercent ? '100' : '';
    downInput.step = isDownPaymentPercent ? '1' : '1000';

    amountBtn.classList.toggle('active', mode === 'amount');
    percentBtn.classList.toggle('active', mode === 'percent');

    // Convert value if price is set
    const price = parseFloat(priceInput.value) || 0;
    const currentDown = parseFloat(downInput.value) || 0;

    if (price > 0 && currentDown > 0) {
      if (mode === 'percent') {
        // Convert amount to percent
        downInput.value = String(Math.round((currentDown / price) * 100));
      } else {
        // Convert percent to amount
        downInput.value = String(Math.round(price * (currentDown / 100)));
      }
    }
  };

  amountBtn.addEventListener('click', () => handleDownToggle('amount'));
  percentBtn.addEventListener('click', () => handleDownToggle('percent'));

  // Loan Term
  const termGroup = createElement('div', 'mortgage-calc__form-group');
  const termLabel = createElement('label', 'mortgage-calc__label', t('mortgage.loanTerm'));
  termLabel.setAttribute('for', 'mortgage-term');
  termGroup.appendChild(termLabel);

  const termSelect = createElement('select', 'mortgage-calc__select');
  termSelect.id = 'mortgage-term';
  termSelect.name = 'loanTerm';

  const terms = [5, 10, 15, 20, 25, 30];
  terms.forEach(term => {
    const option = createElement('option', '', `${term} ${t('mortgage.years')}`);
    option.value = String(term);
    if (term === 20) option.selected = true;
    termSelect.appendChild(option);
  });
  termGroup.appendChild(termSelect);
  form.appendChild(termGroup);

  // Interest Rate
  const rateGroup = createElement('div', 'mortgage-calc__form-group');
  const rateLabelWrapper = createElement('div', 'mortgage-calc__label-wrapper');
  const rateLabel = createElement('label', 'mortgage-calc__label', t('mortgage.interestRate'));
  rateLabel.setAttribute('for', 'mortgage-rate');
  rateLabelWrapper.appendChild(rateLabel);

  // Info tooltip
  const rateInfo = createElement('span', 'mortgage-calc__tooltip');
  rateInfo.appendChild(createInfoIcon());
  const rateTooltip = createElement('span', 'mortgage-calc__tooltip-text', t('mortgage.typicalRates'));
  rateInfo.appendChild(rateTooltip);
  rateLabelWrapper.appendChild(rateInfo);
  rateGroup.appendChild(rateLabelWrapper);

  const rateInputWrapper = createElement('div', 'mortgage-calc__input-wrapper');
  const rateSymbol = createElement('span', 'mortgage-calc__currency mortgage-calc__currency--right', '%');

  const rateInput = createElement('input', 'mortgage-calc__input');
  rateInput.type = 'number';
  rateInput.id = 'mortgage-rate';
  rateInput.name = 'interestRate';
  rateInput.min = '0';
  rateInput.max = '30';
  rateInput.step = '0.1';
  rateInput.value = '10';
  rateInput.placeholder = '10';
  rateInput.required = true;
  rateInputWrapper.appendChild(rateInput);
  rateInputWrapper.appendChild(rateSymbol);
  rateGroup.appendChild(rateInputWrapper);
  form.appendChild(rateGroup);

  // Buttons
  const buttonsGroup = createElement('div', 'mortgage-calc__buttons');

  const calculateBtn = createElement('button', 'btn btn--gold mortgage-calc__submit', t('mortgage.calculate'));
  calculateBtn.type = 'submit';
  buttonsGroup.appendChild(calculateBtn);

  const resetBtn = createElement('button', 'btn btn--ghost mortgage-calc__reset');
  resetBtn.type = 'button';
  resetBtn.appendChild(createResetIcon());
  const resetText = document.createTextNode(' Reset');
  resetBtn.appendChild(resetText);
  buttonsGroup.appendChild(resetBtn);

  form.appendChild(buttonsGroup);
  container.appendChild(form);

  // Results container
  const resultsContainer = createElement('div', 'mortgage-calc__results-container');
  resultsContainer.id = 'mortgage-results';
  container.appendChild(resultsContainer);

  // Actions (print)
  const actionsContainer = createElement('div', 'mortgage-calc__actions');
  actionsContainer.style.display = 'none';

  const printBtn = createElement('button', 'btn btn--outline mortgage-calc__print');
  printBtn.type = 'button';
  printBtn.appendChild(createPrintIcon());
  const printText = document.createTextNode(` ${t('mortgage.print')}`);
  printBtn.appendChild(printText);
  actionsContainer.appendChild(printBtn);

  container.appendChild(actionsContainer);

  // ─── Event Handlers ────────────────────────────────────────────────────────

  const handleCalculate = (e: Event) => {
    e.preventDefault();

    const propertyPrice = parseFloat(priceInput.value) || 0;
    const downValue = parseFloat(downInput.value) || 0;
    const loanTerm = parseInt(termSelect.value) || 20;
    const interestRate = parseFloat(rateInput.value) || 10;

    if (propertyPrice <= 0) {
      showError('Please enter a valid property price');
      return;
    }

    let downPayment: number;
    let downPaymentPercent: number;

    if (isDownPaymentPercent) {
      downPaymentPercent = Math.min(100, Math.max(0, downValue));
      downPayment = propertyPrice * (downPaymentPercent / 100);
    } else {
      downPayment = Math.min(propertyPrice, Math.max(0, downValue));
      downPaymentPercent = (downPayment / propertyPrice) * 100;
    }

    if (downPayment >= propertyPrice) {
      showError(t('mortgage.downPaymentError'));
      return;
    }

    currentInput = {
      propertyPrice,
      downPayment,
      downPaymentPercent,
      loanTerm,
      interestRate
    };

    currentResult = calculateMortgage(currentInput);

    // Render results
    resultsContainer.textContent = '';
    resultsContainer.appendChild(createResultsSection(currentResult, currentInput));
    actionsContainer.style.display = 'flex';

    // Scroll to results on mobile
    if (window.innerWidth < 768) {
      resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Setup amortization toggle
    setupAmortizationToggle();
  };

  const showError = (message: string) => {
    const existingError = container.querySelector('.mortgage-calc__error');
    if (existingError) existingError.remove();

    const error = createElement('div', 'mortgage-calc__error', message);
    form.insertBefore(error, form.querySelector('.mortgage-calc__buttons'));

    setTimeout(() => error.remove(), 5000);
  };

  const handleReset = () => {
    form.reset();
    priceInput.value = initialPrice > 0 ? String(initialPrice) : '';
    downInput.value = '20';
    termSelect.value = '20';
    rateInput.value = '10';
    isDownPaymentPercent = true;
    downSymbol.textContent = '%';
    amountBtn.classList.remove('active');
    percentBtn.classList.add('active');
    resultsContainer.textContent = '';
    actionsContainer.style.display = 'none';
    currentResult = null;
    currentInput = null;
  };

  const handlePrint = () => {
    if (!currentResult || !currentInput) return;

    // Generate print content using DOM manipulation
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const doc = printWindow.document;

    // Build the document structure
    const html = doc.createElement('html');
    const head = doc.createElement('head');
    const title = doc.createElement('title');
    title.textContent = 'Mortgage Calculator Results - Real House';
    head.appendChild(title);

    const style = doc.createElement('style');
    style.textContent = `
      body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
      h1 { color: #C9A84C; border-bottom: 2px solid #C9A84C; padding-bottom: 10px; }
      h2 { margin-top: 30px; color: #333; }
      .result-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0; }
      .result-item { padding: 15px; background: #f5f5f5; border-radius: 8px; }
      .result-label { font-size: 12px; color: #666; margin-bottom: 5px; }
      .result-value { font-size: 18px; font-weight: bold; }
      .main-result { text-align: center; padding: 30px; background: #C9A84C; color: white; border-radius: 12px; margin: 20px 0; }
      .main-result .label { font-size: 14px; }
      .main-result .value { font-size: 36px; font-weight: bold; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
      th, td { padding: 10px; text-align: right; border-bottom: 1px solid #ddd; }
      th { background: #f5f5f5; font-weight: bold; }
      th:first-child, td:first-child { text-align: left; }
      .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
      @media print { body { padding: 20px; } }
    `;
    head.appendChild(style);
    html.appendChild(head);

    const body = doc.createElement('body');

    const h1 = doc.createElement('h1');
    h1.textContent = t('mortgage.resultsTitle');
    body.appendChild(h1);

    const datePara = doc.createElement('p');
    datePara.textContent = t('mortgage.generatedOn') + ' ' + new Date().toLocaleDateString('en-US', { dateStyle: 'full' });
    body.appendChild(datePara);

    const mainResult = doc.createElement('div');
    mainResult.className = 'main-result';
    const mainLabel = doc.createElement('div');
    mainLabel.className = 'label';
    mainLabel.textContent = t('mortgage.monthlyPayment');
    mainResult.appendChild(mainLabel);
    const mainValue = doc.createElement('div');
    mainValue.className = 'value';
    mainValue.textContent = formatCurrencyDetailed(currentResult.monthlyPayment);
    mainResult.appendChild(mainValue);
    body.appendChild(mainResult);

    const summaryTitle = doc.createElement('h2');
    summaryTitle.textContent = t('mortgage.loanSummary');
    body.appendChild(summaryTitle);

    const grid = doc.createElement('div');
    grid.className = 'result-grid';

    const printSummaryItems = [
      { label: t('mortgage.propertyPrice'), value: formatCurrency(currentInput.propertyPrice) },
      { label: t('mortgage.downPayment'), value: formatCurrency(currentInput.downPayment) + ' (' + currentInput.downPaymentPercent.toFixed(0) + '%)' },
      { label: t('mortgage.loanAmount'), value: formatCurrency(currentResult.loanAmount) },
      { label: t('mortgage.loanTerm'), value: currentInput.loanTerm + ' ' + t('mortgage.years') },
      { label: t('mortgage.interestRateShort'), value: currentInput.interestRate + '% ' + t('mortgage.perAnnum') },
      { label: t('mortgage.totalPayment'), value: formatCurrency(currentResult.totalPayment) },
      { label: t('mortgage.totalInterest'), value: formatCurrency(currentResult.totalInterest) }
    ];

    printSummaryItems.forEach(item => {
      const itemDiv = doc.createElement('div');
      itemDiv.className = 'result-item';
      const labelDiv = doc.createElement('div');
      labelDiv.className = 'result-label';
      labelDiv.textContent = item.label;
      itemDiv.appendChild(labelDiv);
      const valueDiv = doc.createElement('div');
      valueDiv.className = 'result-value';
      valueDiv.textContent = item.value;
      itemDiv.appendChild(valueDiv);
      grid.appendChild(itemDiv);
    });
    body.appendChild(grid);

    const amortTitle = doc.createElement('h2');
    amortTitle.textContent = t('mortgage.yearlyAmortization');
    body.appendChild(amortTitle);

    const table = doc.createElement('table');
    const thead = doc.createElement('thead');
    const printHeaderRow = doc.createElement('tr');
    [t('mortgage.year'), t('mortgage.principal'), t('mortgage.interest'), t('mortgage.balance')].forEach(h => {
      const th = doc.createElement('th');
      th.textContent = h;
      printHeaderRow.appendChild(th);
    });
    thead.appendChild(printHeaderRow);
    table.appendChild(thead);

    const printTbody = doc.createElement('tbody');
    const years = Math.ceil(currentResult.monthlyBreakdown.length / 12);
    for (let year = 1; year <= years; year++) {
      const startMonth = (year - 1) * 12;
      const endMonth = Math.min(year * 12, currentResult.monthlyBreakdown.length);
      const yearData = currentResult.monthlyBreakdown.slice(startMonth, endMonth);

      const yearPrincipal = yearData.reduce((sum, m) => sum + m.principal, 0);
      const yearInterest = yearData.reduce((sum, m) => sum + m.interest, 0);
      const endBalance = yearData[yearData.length - 1]?.balance || 0;

      const printRow = doc.createElement('tr');
      [String(year), formatCurrency(yearPrincipal), formatCurrency(yearInterest), formatCurrency(endBalance)].forEach(val => {
        const td = doc.createElement('td');
        td.textContent = val;
        printRow.appendChild(td);
      });
      printTbody.appendChild(printRow);
    }
    table.appendChild(printTbody);
    body.appendChild(table);

    const footer = doc.createElement('div');
    footer.className = 'footer';
    const footerP1 = doc.createElement('p');
    footerP1.textContent = t('mortgage.disclaimer');
    footer.appendChild(footerP1);
    const footerP2 = doc.createElement('p');
    footerP2.textContent = t('mortgage.poweredBy');
    footer.appendChild(footerP2);
    body.appendChild(footer);

    html.appendChild(body);
    doc.appendChild(html);
    doc.close();
    printWindow.print();
  };

  const setupAmortizationToggle = () => {
    const toggleBtns = container.querySelectorAll('.mortgage-calc__toggle-btn');
    const tableWrapper = container.querySelector('.mortgage-calc__table-wrapper');

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (!currentResult || !tableWrapper) return;

        toggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const isYearly = btn.textContent === 'Yearly';
        const newTable = createAmortizationTable(currentResult.monthlyBreakdown, isYearly);
        const amortization = container.querySelector('.mortgage-calc__amortization');
        if (amortization && amortization.parentNode) {
          amortization.parentNode.replaceChild(newTable, amortization);
          setupAmortizationToggle();
          setupExpandBtn();
        }
      });
    });

    setupExpandBtn();
  };

  const setupExpandBtn = () => {
    const expandBtn = container.querySelector('.mortgage-calc__expand-btn');
    if (expandBtn && currentResult) {
      expandBtn.addEventListener('click', () => {
        const tbody = container.querySelector('.mortgage-calc__table tbody');
        if (!tbody || !currentResult) return;

        tbody.textContent = '';
        currentResult.monthlyBreakdown.forEach(m => {
          const row = createElement('tr');
          const monthCell = createElement('td', '', String(m.month));
          const principalCell = createElement('td', '', formatCurrencyDetailed(m.principal));
          const interestCell = createElement('td', '', formatCurrencyDetailed(m.interest));
          const balanceCell = createElement('td', '', formatCurrency(m.balance));
          row.appendChild(monthCell);
          row.appendChild(principalCell);
          row.appendChild(interestCell);
          row.appendChild(balanceCell);
          tbody.appendChild(row);
        });
      });
    }
  };

  // Attach event listeners
  form.addEventListener('submit', handleCalculate);
  resetBtn.addEventListener('click', handleReset);
  printBtn.addEventListener('click', handlePrint);

  // Auto-calculate on input change (debounced)
  let debounceTimer: number | undefined;
  const autoCalculate = () => {
    clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      if (priceInput.value && downInput.value && rateInput.value) {
        form.dispatchEvent(new Event('submit'));
      }
    }, 500);
  };

  [priceInput, downInput, rateInput, termSelect].forEach(input => {
    input.addEventListener('change', autoCalculate);
  });

  return container;
}

// ─── Widget Version for Sidebar ──────────────────────────────────────────────

export function createMortgageWidget(propertyPrice: number): HTMLElement {
  return createMortgageCalculator({
    initialPrice: propertyPrice,
    compact: true,
    showTitle: true,
    containerClass: 'mortgage-calc--widget'
  });
}
