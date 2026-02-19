// ═══════════════════════════════════════════════════════════════════════════
// SEO Module - Export all SEO schema functions
// ═══════════════════════════════════════════════════════════════════════════

export {
  // Schema generators
  generatePropertySchema,
  generateResidenceSchema,
  generateBreadcrumbSchema,
  generateLocalBusinessSchema,
  generateOrganizationSchema,
  generatePropertyListSchema,
  generateWebSiteSchema,
  generateFAQSchema,

  // SEO helpers
  getPropertySEOMeta,
  getAllPropertyUrls,

  // DOM manipulation
  injectSchema,
  clearDynamicSchemas,
  updatePropertyMeta,

  // Page-specific SEO setup
  setupPropertyPageSEO,
  setupPropertiesPageSEO,
  setupContactPageSEO,
  setupAboutPageSEO,
  setupFAQPageSEO,
  setupHomePageSEO
} from './schema';
