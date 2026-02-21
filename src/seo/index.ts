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
  generateRealEstateAgentSchema,

  // ==========================================================================
  // 2. REAL ESTATE LISTING SCHEMA (For Properties)
  // ==========================================================================
  generatePropertySchema,
  generateEnhancedPropertyListingSchema,
  generateProductSchema,
  generateResidenceSchema,
  generatePropertyOfferSchema,

  // ==========================================================================
  // 3. ORGANIZATION SCHEMA (With Social Profiles)
  // ==========================================================================
  generateOrganizationSchema,
  generateCompleteOrganizationSchema,

  // ==========================================================================
  // 4. PLACE SCHEMA (Geo Coordinates)
  // ==========================================================================
  generateDistrictPlaceSchema,
  generateNeighborhoodSchema,
  generateCompletePlaceSchema,
  generateNeighborhoodsListSchema,

  // ==========================================================================
  // 5. IMAGE SCHEMA / IMAGE GALLERY
  // ==========================================================================
  generatePropertyImageSchema,
  generateImageGallerySchema,
  generateCompleteImageGallerySchema,

  // ==========================================================================
  // 6. VIDEO OBJECT SCHEMA (Virtual Tours)
  // ==========================================================================
  generateVirtualTourSchema,
  generateCompleteVideoTourSchema,

  // ==========================================================================
  // 7. REVIEW & AGGREGATE RATING SCHEMAS
  // ==========================================================================
  generateReviewSchema,
  generateAggregateRatingSchema,
  generateAllReviewsSchema,
  generateComprehensiveReviewSchema,

  // ==========================================================================
  // 8. FAQ PAGE SCHEMA (50+ Questions)
  // ==========================================================================
  generateFAQSchema,
  generateHomeFAQSchema,
  generateAboutFAQSchema,
  generateContactFAQSchema,
  generateCategoryFAQSchema,
  generatePropertyFAQSchema,
  generatePeopleAlsoAskSchema,
  generateRealEstateFAQSchema, // Legacy alias

  // ==========================================================================
  // 9. HOW-TO SCHEMA (For Guides)
  // ==========================================================================
  generateHowToBuyPropertySchema,
  generateHowToSellPropertySchema,
  generateHowToInvestSchema,
  generateHowToViewPropertySchema,
  generateHowToRentPropertySchema,

  // ==========================================================================
  // 10. ARTICLE / BLOG SCHEMA
  // ==========================================================================
  generateArticleSchema,
  generateBlogSchema,
  generateBlogPostingSchema,
  generateNewsArticleSchema,

  // ==========================================================================
  // 11. WEBSITE SCHEMA (With SearchAction)
  // ==========================================================================
  generateWebSiteSchema,
  generateCompleteWebSiteSchema,
  generateSearchActionSchema,

  // ==========================================================================
  // 12. ITEM LIST SCHEMA (For Property Listings)
  // ==========================================================================
  generatePropertyListSchema,
  generateCompletePropertyListSchema,
  generateProjectListSchema,
  generateFeaturedPropertiesListSchema,
  generatePropertiesByTypeListSchema,

  // ==========================================================================
  // 13. EVENT SCHEMA (Open Houses)
  // ==========================================================================
  generateOpenHouseEventSchema,
  generatePropertyEventSchema,
  generateSpecialAnnouncementSchema,

  // ==========================================================================
  // 14. SERVICE SCHEMA
  // ==========================================================================
  generateServicesSchema,
  generateDetailedServicesSchema,

  // ==========================================================================
  // PROJECT SCHEMA
  // ==========================================================================
  generateProjectSchema,

  // ==========================================================================
  // PAGE TYPE SCHEMAS
  // ==========================================================================
  generateContactPageSchema,
  generateAboutPageSchema,
  generateCollectionPageSchema,

  // ==========================================================================
  // NAVIGATION & BREADCRUMB SCHEMA
  // ==========================================================================
  generateBreadcrumbSchema,
  generatePageBreadcrumbs,
  generateSiteNavigationSchema,

  // ==========================================================================
  // META TAG HELPERS
  // ==========================================================================
  generateMetaTags,
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
  // PAGE-SPECIFIC SEO SETUP FUNCTIONS
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
  setupGalleryPageSEO,

  // Comprehensive Page Setup
  setupComprehensiveHomePageSEO,
  setupComprehensivePropertyPageSEO,
  setupAllHomePageSchemas,

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
  debugSchemas,

  // ==========================================================================
  // MASTER SCHEMA GENERATORS OBJECT
  // ==========================================================================
  schemaGenerators
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
