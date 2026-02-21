// =============================================================================
// COMPREHENSIVE SEO MODULE - All Schema.org Markup Exports
// Maximum Google Rich Results Implementation - 20+ Schema Types
// =============================================================================
// Target Keywords: "real estate erbil", "property erbil", "houses for sale erbil",
// "apartments erbil iraq", "luxury homes kurdistan"
// =============================================================================

export {
  // ==========================================================================
  // 1. REAL ESTATE AGENT / LOCAL BUSINESS SCHEMA
  // ==========================================================================
  generateLocalBusinessSchema,
  generateEnhancedLocalBusinessSchema,

  // ==========================================================================
  // 2. REAL ESTATE LISTING SCHEMA (For Properties)
  // ==========================================================================
  generatePropertySchema,

  // ==========================================================================
  // 4. PLACE SCHEMA (Geo Coordinates)
  // ==========================================================================
  generateDistrictPlaceSchema,

  // ==========================================================================
  // 5. IMAGE SCHEMA
  // ==========================================================================
  generatePropertyImageSchema,

  // ==========================================================================
  // 6. VIDEO OBJECT SCHEMA (Virtual Tours)
  // ==========================================================================
  generateVirtualTourSchema,

  // ==========================================================================
  // 7. REVIEW & AGGREGATE RATING SCHEMAS
  // ==========================================================================
  generateReviewSchema,
  generateAggregateRatingSchema,
  generateAllReviewsSchema,

  // ==========================================================================
  // 8. FAQ PAGE SCHEMA (25+ Questions)
  // ==========================================================================
  generateFAQSchema,
  generateHomeFAQSchema,
  generateAboutFAQSchema,
  generateContactFAQSchema,
  generateCategoryFAQSchema,
  generateRealEstateFAQSchema, // Legacy alias

  // ==========================================================================
  // 9. HOW-TO SCHEMA
  // ==========================================================================
  generateHowToBuyPropertySchema,
  generateHowToSellPropertySchema,

  // ==========================================================================
  // 13. ITEM LIST SCHEMA
  // ==========================================================================
  generatePropertyListSchema,
  generateProjectListSchema,

  // ==========================================================================
  // ADDITIONAL SCHEMA TYPES
  // ==========================================================================
  generateProductSchema,
  generateResidenceSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateProjectSchema,
  generateServicesSchema,
  generateArticleSchema,
  generateBlogSchema,
  generateMetaTags,

  // ==========================================================================
  // BREADCRUMB SCHEMA
  // ==========================================================================
  generateBreadcrumbSchema,
  generatePageBreadcrumbs,

  // ==========================================================================
  // SEO HELPERS
  // ==========================================================================
  getPropertySEOMeta,
  getAllPropertyUrls,
  getAllProjectUrls,
  getAllDistrictSlugs,
  getDistrictInfo,

  // ==========================================================================
  // DOM MANIPULATION
  // ==========================================================================
  injectSchema,
  injectSchemaGraph,
  clearDynamicSchemas,
  updatePropertyMeta,

  // ==========================================================================
  // PAGE-SPECIFIC SEO SETUP
  // ==========================================================================
  setupPropertyPageSEO,
  setupPropertiesPageSEO,
  setupContactPageSEO,
  setupAboutPageSEO,
  setupFAQPageSEO,
  setupHomePageSEO,
  setupProjectsPageSEO,
  setupProjectPageSEO,
  setupFavoritesPageSEO,
  setupComparePageSEO,
  setupBlogPageSEO,
  setupBlogPostSEO,
  setupLocationsPageSEO,
  setupDistrictPageSEO,

  // ==========================================================================
  // PAGINATION SEO
  // ==========================================================================
  setupPaginationSEO,
  clearPaginationSEO,

  // ==========================================================================
  // CANONICAL & DUPLICATE CONTENT
  // ==========================================================================
  updateCanonicalUrl,
  setNoIndex,
  getCanonicalUrl,

  // ==========================================================================
  // HREFLANG FOR MULTILINGUAL
  // ==========================================================================
  setupHreflangTags,

  // ==========================================================================
  // SCHEMA VALIDATION & DEBUG
  // ==========================================================================
  validateSchema,
  debugSchemas
} from './schema';

// =============================================================================
// SOCIAL MEDIA SEO EXPORTS
// =============================================================================

export {
  // Open Graph Tags
  generateOpenGraphTags,
  generateTwitterCardTags,
  generatePinterestTags,
  generateLinkedInTags,

  // Page-Specific Social Meta Generators
  generatePropertySocialMeta,
  generateProjectSocialMeta,
  generateBlogSocialMeta,
  generatePageSocialMeta,

  // Social Meta Application Functions
  applySocialMeta,
  applyPropertySocialMeta,
  applyProjectSocialMeta,
  applyBlogSocialMeta,
  applyPageSocialMeta,

  // Social Proof Schema
  generateAggregateRatingSchema as generateSocialAggregateRatingSchema,
  generateSocialProofReviewSchema,
  generateOrganizationSocialProofSchema,

  // Social Share Helpers
  getShareUrl,
  generateDynamicOGImageUrl,

  // Types
  type SocialMetaConfig
} from './social';
