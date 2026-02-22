// ═══════════════════════════════════════════════════════════════════════════
// Mortgage Calculator Page for Real House
// Full page calculator with mortgage tips for Kurdistan/Iraq
// ═══════════════════════════════════════════════════════════════════════════

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createMortgageCalculator } from '../components/mortgage-calculator';
import {
  createBreadcrumbs,
  injectBreadcrumbSchema
} from '../components/internal-linking';

gsap.registerPlugin(ScrollTrigger);

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

// ─── Partner Banks Data ──────────────────────────────────────────────────────

interface PartnerBank {
  name: string;
  logo: string;
  description: string;
  interestRange: string;
  loanTerms: string;
  features: string[];
  contact?: string;
}

const partnerBanks: PartnerBank[] = [
  {
    name: 'Kurdistan International Bank',
    logo: '/images/partners/kib-placeholder.svg',
    description: 'Leading bank in Kurdistan offering competitive mortgage rates for residential and commercial properties.',
    interestRange: '8-10%',
    loanTerms: 'Up to 20 years',
    features: ['Fast approval process', 'Flexible payment terms', 'No early repayment fees'],
    contact: '+964 66 222 2222'
  },
  {
    name: 'North Bank',
    logo: '/images/partners/north-placeholder.svg',
    description: 'Established bank with extensive experience in real estate financing across Iraq.',
    interestRange: '9-11%',
    loanTerms: 'Up to 15 years',
    features: ['Islamic financing options', 'Construction loans available', 'Property insurance included'],
    contact: '+964 66 333 3333'
  },
  {
    name: 'Cihan Bank',
    logo: '/images/partners/cihan-placeholder.svg',
    description: 'Modern banking services with specialized real estate loan products for first-time buyers.',
    interestRange: '8.5-10.5%',
    loanTerms: 'Up to 25 years',
    features: ['First-time buyer discounts', 'Online application', 'Free property valuation'],
    contact: '+964 66 444 4444'
  }
];

// ─── Mortgage Tips Data ──────────────────────────────────────────────────────

interface MortgageTip {
  icon: string;
  title: string;
  content: string;
}

const mortgageTips: MortgageTip[] = [
  {
    icon: 'document',
    title: 'Prepare Your Documents',
    content: 'Banks in Kurdistan typically require: valid ID/passport, proof of income (salary slips or tax returns), bank statements (6 months), property documents, and employment verification letter.'
  },
  {
    icon: 'money',
    title: 'Save for Down Payment',
    content: 'Most Iraqi banks require a minimum down payment of 20-30% of the property value. Saving more can help you secure better interest rates and lower monthly payments.'
  },
  {
    icon: 'credit',
    title: 'Check Your Credit History',
    content: 'While Iraq doesn\'t have a formal credit scoring system like Western countries, banks will review your payment history with other institutions. Maintain good standing with existing loans.'
  },
  {
    icon: 'compare',
    title: 'Compare Multiple Lenders',
    content: 'Interest rates can vary significantly between banks. Compare offers from at least 3 different lenders before making a decision. Consider both conventional and Islamic financing options.'
  },
  {
    icon: 'insurance',
    title: 'Consider Insurance',
    content: 'Property insurance is often required by lenders. Also consider life insurance to protect your family in case of unforeseen circumstances. Some banks bundle these into loan packages.'
  },
  {
    icon: 'legal',
    title: 'Verify Property Title',
    content: 'Ensure the property has clear ownership (Tapu) and is free from legal disputes. Work with a qualified lawyer to verify all documentation before signing any agreements.'
  }
];

// ─── FAQ Data ────────────────────────────────────────────────────────────────

interface FAQ {
  question: string;
  answer: string;
}

const mortgageFAQs: FAQ[] = [
  {
    question: 'Can foreigners get mortgages in Kurdistan/Iraq?',
    answer: 'Mortgage availability for foreigners varies by bank. Some banks offer financing to expatriates with residency permits and stable income in Iraq. It\'s best to consult directly with banks or work with a real estate agent who can guide you through the process.'
  },
  {
    question: 'What are typical mortgage interest rates in Iraq?',
    answer: 'Interest rates typically range from 8% to 12% annually, depending on the bank, loan term, and your financial profile. Rates may be higher than Western countries due to different economic conditions.'
  },
  {
    question: 'What is the maximum loan term available?',
    answer: 'Most banks offer loan terms up to 15-25 years. Shorter terms mean higher monthly payments but less total interest paid. Choose a term that balances affordability with total cost.'
  },
  {
    question: 'Is Islamic financing (Sharia-compliant) available?',
    answer: 'Yes, many banks in Kurdistan and Iraq offer Islamic financing options such as Murabaha and Ijara. These products comply with Islamic law and don\'t charge interest in the traditional sense.'
  },
  {
    question: 'What fees should I expect beyond the mortgage?',
    answer: 'Additional costs include: property registration fees (typically 3-5% of property value), bank processing fees (1-2%), property valuation fees, insurance premiums, and legal fees. Budget for an additional 5-8% of the property price.'
  },
  {
    question: 'Can I pay off my mortgage early?',
    answer: 'Many banks allow early repayment, but some may charge prepayment penalties (typically 1-3% of remaining balance). Check the terms carefully before signing your mortgage agreement.'
  }
];

// ─── Icon SVG Helper ─────────────────────────────────────────────────────────

function createTipIcon(type: string): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('class', 'mortgage-page__tip-icon');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  switch (type) {
    case 'document':
      path.setAttribute('d', 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z');
      break;
    case 'money':
      path.setAttribute('d', 'M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z');
      break;
    case 'credit':
      path.setAttribute('d', 'M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z');
      break;
    case 'compare':
      path.setAttribute('d', 'M10 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h5v-2H5V5h5V3zm4 18h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-5v2h5v14h-5v2z');
      break;
    case 'insurance':
      path.setAttribute('d', 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z');
      break;
    case 'legal':
      path.setAttribute('d', 'M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z');
      break;
    default:
      path.setAttribute('d', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z');
  }

  svg.appendChild(path);
  return svg;
}

// ═══════════════════════════════════════════════════════════════════════════
// Main Page Render Function
// ═══════════════════════════════════════════════════════════════════════════

export function renderMortgageCalculatorPage(): DocumentFragment {
  const fragment = document.createDocumentFragment();
  const container = createElement('div', 'mortgage-page');

  // ─── Breadcrumbs ───────────────────────────────────────────────────────────

  const breadcrumbData = [
    { name: 'Home', url: '/' },
    { name: 'Resources', url: '/blog' },
    { name: 'Mortgage Calculator', url: '/mortgage-calculator' }
  ];

  const breadcrumbs = createBreadcrumbs(breadcrumbData);
  breadcrumbs.classList.add('mortgage-page__breadcrumbs');
  container.appendChild(breadcrumbs);

  // Inject schema
  injectBreadcrumbSchema(breadcrumbData);

  // ─── Hero Section ──────────────────────────────────────────────────────────

  const hero = createElement('section', 'mortgage-page__hero');

  const heroContent = createElement('div', 'mortgage-page__hero-content container');

  const heroTitle = createElement('h1', 'mortgage-page__hero-title');
  heroTitle.textContent = 'Mortgage Calculator';

  const heroSubtitle = createElement('p', 'mortgage-page__hero-subtitle');
  heroSubtitle.textContent = 'Plan your property purchase in Erbil with our comprehensive mortgage calculator. Estimate monthly payments, total costs, and see your complete amortization schedule.';

  heroContent.appendChild(heroTitle);
  heroContent.appendChild(heroSubtitle);
  hero.appendChild(heroContent);
  container.appendChild(hero);

  // ─── Main Content Grid ─────────────────────────────────────────────────────

  const mainContent = createElement('section', 'mortgage-page__main container');

  const contentGrid = createElement('div', 'mortgage-page__grid');

  // Calculator Column (Main)
  const calcColumn = createElement('div', 'mortgage-page__calc-column');

  const calcCard = createElement('div', 'mortgage-page__calc-card');
  const calculator = createMortgageCalculator({
    initialPrice: 0,
    compact: false,
    showTitle: true
  });
  calcCard.appendChild(calculator);
  calcColumn.appendChild(calcCard);

  // Sidebar Column
  const sidebarColumn = createElement('div', 'mortgage-page__sidebar');

  // Quick Tips Card
  const quickTipsCard = createElement('div', 'mortgage-page__card');
  const quickTipsTitle = createElement('h3', 'mortgage-page__card-title', 'Quick Tips');
  quickTipsCard.appendChild(quickTipsTitle);

  const quickTipsList = createElement('ul', 'mortgage-page__quick-tips');
  [
    'Aim for a down payment of 20-30% to get better rates',
    'Compare offers from at least 3 different banks',
    'Factor in additional costs (3-5% for registration)',
    'Check for prepayment penalties before signing',
    'Consider Islamic financing options available'
  ].forEach(tip => {
    const li = createElement('li', 'mortgage-page__quick-tip', tip);
    quickTipsList.appendChild(li);
  });
  quickTipsCard.appendChild(quickTipsList);
  sidebarColumn.appendChild(quickTipsCard);

  // Contact CTA Card
  const ctaCard = createElement('div', 'mortgage-page__card mortgage-page__card--cta');
  const ctaTitle = createElement('h3', 'mortgage-page__card-title', 'Need Help?');
  const ctaText = createElement('p', 'mortgage-page__cta-text');
  ctaText.textContent = 'Our team can help you navigate the mortgage process and connect you with trusted lenders in Erbil.';
  const ctaBtn = createElement('a', 'btn btn--gold mortgage-page__cta-btn', 'Contact Us');
  ctaBtn.setAttribute('href', '/contact');
  ctaBtn.setAttribute('data-route', '');
  ctaCard.appendChild(ctaTitle);
  ctaCard.appendChild(ctaText);
  ctaCard.appendChild(ctaBtn);
  sidebarColumn.appendChild(ctaCard);

  contentGrid.appendChild(calcColumn);
  contentGrid.appendChild(sidebarColumn);
  mainContent.appendChild(contentGrid);
  container.appendChild(mainContent);

  // ─── Tips Section ──────────────────────────────────────────────────────────

  const tipsSection = createElement('section', 'mortgage-page__tips container');

  const tipsSectionTitle = createElement('h2', 'mortgage-page__section-title', 'Getting a Mortgage in Kurdistan');
  const tipsSectionSubtitle = createElement('p', 'mortgage-page__section-subtitle');
  tipsSectionSubtitle.textContent = 'Essential information and tips to help you secure financing for your property purchase.';

  tipsSection.appendChild(tipsSectionTitle);
  tipsSection.appendChild(tipsSectionSubtitle);

  const tipsGrid = createElement('div', 'mortgage-page__tips-grid');

  mortgageTips.forEach(tip => {
    const tipCard = createElement('div', 'mortgage-page__tip-card');

    const tipHeader = createElement('div', 'mortgage-page__tip-header');
    tipHeader.appendChild(createTipIcon(tip.icon));
    const tipTitle = createElement('h3', 'mortgage-page__tip-title', tip.title);
    tipHeader.appendChild(tipTitle);
    tipCard.appendChild(tipHeader);

    const tipContent = createElement('p', 'mortgage-page__tip-content', tip.content);
    tipCard.appendChild(tipContent);

    tipsGrid.appendChild(tipCard);
  });

  tipsSection.appendChild(tipsGrid);
  container.appendChild(tipsSection);

  // ─── Partner Banks Section ─────────────────────────────────────────────────

  const banksSection = createElement('section', 'mortgage-page__banks container');

  const banksSectionTitle = createElement('h2', 'mortgage-page__section-title', 'Partner Banks & Lenders');
  const banksSectionSubtitle = createElement('p', 'mortgage-page__section-subtitle');
  banksSectionSubtitle.textContent = 'Trusted financial institutions in Kurdistan offering mortgage products for property buyers.';

  banksSection.appendChild(banksSectionTitle);
  banksSection.appendChild(banksSectionSubtitle);

  const banksGrid = createElement('div', 'mortgage-page__banks-grid');

  partnerBanks.forEach(bank => {
    const bankCard = createElement('div', 'mortgage-page__bank-card');

    const bankHeader = createElement('div', 'mortgage-page__bank-header');
    const bankLogo = createElement('div', 'mortgage-page__bank-logo');
    const logoPlaceholder = createElement('span', 'mortgage-page__bank-logo-text', bank.name.charAt(0));
    bankLogo.appendChild(logoPlaceholder);
    bankHeader.appendChild(bankLogo);

    const bankInfo = createElement('div', 'mortgage-page__bank-info');
    const bankName = createElement('h3', 'mortgage-page__bank-name', bank.name);
    bankInfo.appendChild(bankName);
    bankHeader.appendChild(bankInfo);
    bankCard.appendChild(bankHeader);

    const bankDesc = createElement('p', 'mortgage-page__bank-desc', bank.description);
    bankCard.appendChild(bankDesc);

    const bankStats = createElement('div', 'mortgage-page__bank-stats');

    const rateStat = createElement('div', 'mortgage-page__bank-stat');
    const rateLabel = createElement('span', 'mortgage-page__bank-stat-label', 'Interest Rate');
    const rateValue = createElement('span', 'mortgage-page__bank-stat-value', bank.interestRange);
    rateStat.appendChild(rateLabel);
    rateStat.appendChild(rateValue);
    bankStats.appendChild(rateStat);

    const termStat = createElement('div', 'mortgage-page__bank-stat');
    const termLabel = createElement('span', 'mortgage-page__bank-stat-label', 'Loan Terms');
    const termValue = createElement('span', 'mortgage-page__bank-stat-value', bank.loanTerms);
    termStat.appendChild(termLabel);
    termStat.appendChild(termValue);
    bankStats.appendChild(termStat);

    bankCard.appendChild(bankStats);

    const featuresList = createElement('ul', 'mortgage-page__bank-features');
    bank.features.forEach(feature => {
      const featureItem = createElement('li', '', feature);
      featuresList.appendChild(featureItem);
    });
    bankCard.appendChild(featuresList);

    const bankCta = createElement('a', 'btn btn--outline mortgage-page__bank-cta', 'Learn More');
    bankCta.setAttribute('href', '/contact');
    bankCta.setAttribute('data-route', '');
    bankCard.appendChild(bankCta);

    banksGrid.appendChild(bankCard);
  });

  banksSection.appendChild(banksGrid);
  container.appendChild(banksSection);

  // ─── FAQ Section ───────────────────────────────────────────────────────────

  const faqSection = createElement('section', 'mortgage-page__faq container');

  const faqSectionTitle = createElement('h2', 'mortgage-page__section-title', 'Frequently Asked Questions');
  const faqSectionSubtitle = createElement('p', 'mortgage-page__section-subtitle');
  faqSectionSubtitle.textContent = 'Common questions about mortgages and property financing in Kurdistan and Iraq.';

  faqSection.appendChild(faqSectionTitle);
  faqSection.appendChild(faqSectionSubtitle);

  const faqList = createElement('div', 'mortgage-page__faq-list');

  mortgageFAQs.forEach((faq, index) => {
    const faqItem = createElement('div', 'mortgage-page__faq-item');

    const faqQuestion = createElement('button', 'mortgage-page__faq-question');
    faqQuestion.setAttribute('aria-expanded', 'false');
    faqQuestion.setAttribute('aria-controls', `faq-answer-${index}`);

    const questionText = createElement('span', '', faq.question);
    faqQuestion.appendChild(questionText);

    const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chevron.setAttribute('viewBox', '0 0 24 24');
    chevron.setAttribute('fill', 'none');
    chevron.setAttribute('stroke', 'currentColor');
    chevron.setAttribute('stroke-width', '2');
    chevron.setAttribute('class', 'mortgage-page__faq-chevron');
    const chevronPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    chevronPath.setAttribute('d', 'M6 9l6 6 6-6');
    chevron.appendChild(chevronPath);
    faqQuestion.appendChild(chevron);

    faqItem.appendChild(faqQuestion);

    const faqAnswer = createElement('div', 'mortgage-page__faq-answer');
    faqAnswer.id = `faq-answer-${index}`;
    const answerText = createElement('p', '', faq.answer);
    faqAnswer.appendChild(answerText);
    faqItem.appendChild(faqAnswer);

    // FAQ toggle functionality
    faqQuestion.addEventListener('click', () => {
      const isExpanded = faqQuestion.getAttribute('aria-expanded') === 'true';
      faqQuestion.setAttribute('aria-expanded', String(!isExpanded));
      faqItem.classList.toggle('active', !isExpanded);
    });

    faqList.appendChild(faqItem);
  });

  faqSection.appendChild(faqList);
  container.appendChild(faqSection);

  // ─── Final CTA Section ─────────────────────────────────────────────────────

  const finalCta = createElement('section', 'mortgage-page__final-cta');

  const ctaContainer = createElement('div', 'mortgage-page__final-cta-content container');

  const ctaHeading = createElement('h2', 'mortgage-page__final-cta-title', 'Ready to Find Your Dream Property?');
  const ctaSubtext = createElement('p', 'mortgage-page__final-cta-text');
  ctaSubtext.textContent = 'Browse our collection of premium properties in Erbil and start your journey to home ownership.';

  const ctaButtons = createElement('div', 'mortgage-page__final-cta-buttons');

  const browseBtn = createElement('a', 'btn btn--gold', 'Browse Properties');
  browseBtn.setAttribute('href', '/properties');
  browseBtn.setAttribute('data-route', '');
  ctaButtons.appendChild(browseBtn);

  const contactBtn = createElement('a', 'btn btn--outline btn--light', 'Speak to an Agent');
  contactBtn.setAttribute('href', '/contact');
  contactBtn.setAttribute('data-route', '');
  ctaButtons.appendChild(contactBtn);

  ctaContainer.appendChild(ctaHeading);
  ctaContainer.appendChild(ctaSubtext);
  ctaContainer.appendChild(ctaButtons);
  finalCta.appendChild(ctaContainer);
  container.appendChild(finalCta);

  // ─── Animations ────────────────────────────────────────────────────────────

  requestAnimationFrame(() => {
    // Hero animation
    gsap.from('.mortgage-page__hero-title', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from('.mortgage-page__hero-subtitle', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out'
    });

    // Calculator card animation
    gsap.from('.mortgage-page__calc-card', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: 'power3.out'
    });

    // Sidebar cards
    gsap.from('.mortgage-page__card', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      delay: 0.5,
      ease: 'power3.out'
    });

    // Tips cards
    gsap.from('.mortgage-page__tip-card', {
      scrollTrigger: {
        trigger: '.mortgage-page__tips',
        start: 'top 80%'
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    });

    // Bank cards
    gsap.from('.mortgage-page__bank-card', {
      scrollTrigger: {
        trigger: '.mortgage-page__banks',
        start: 'top 80%'
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out'
    });

    // FAQ items
    gsap.from('.mortgage-page__faq-item', {
      scrollTrigger: {
        trigger: '.mortgage-page__faq',
        start: 'top 80%'
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power3.out'
    });
  });

  fragment.appendChild(container);
  return fragment;
}

// ═══════════════════════════════════════════════════════════════════════════
// Page Metadata
// ═══════════════════════════════════════════════════════════════════════════

export function getMortgageCalculatorPageMeta() {
  return {
    title: 'Mortgage Calculator Erbil | Property Payment Calculator | Real House',
    description: 'Calculate your monthly mortgage payments for properties in Erbil, Kurdistan. Free mortgage calculator with amortization schedule, tips for getting a mortgage in Iraq, and partner bank information.',
    keywords: 'mortgage calculator erbil, property loan iraq, mortgage rates kurdistan, home loan calculator, property financing erbil, real estate loan iraq',
    ogImage: '/og-mortgage-calculator.jpg'
  };
}
