import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 4000,
    strictPort: true
  },

  resolve: {
    alias: {
      '@': '/src'
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use './src/styles/_tokens.scss' as *;`
      }
    },
    // Enable CSS code splitting
    devSourcemap: true
  },

  build: {
    // Target modern browsers for smaller bundles (supports ES modules)
    target: 'es2020',

    // Generate source maps for production debugging
    sourcemap: false,

    // Use esbuild for minification (faster than terser)
    minify: 'esbuild',

    // Minify CSS with lightningcss for better compression
    cssMinify: 'lightningcss',

    // CSS code splitting for better caching
    cssCodeSplit: true,

    // Rollup options for optimized code splitting
    rollupOptions: {
      output: {
        // Optimized manual chunk splitting for better caching and loading
        manualChunks: (id) => {
          // Vendor chunks - split by library for granular caching
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap';
          }
          if (id.includes('node_modules/lenis')) {
            return 'vendor-lenis';
          }
          if (id.includes('node_modules/leaflet')) {
            return 'vendor-leaflet';
          }

          // Performance monitoring - load early but defer execution
          if (id.includes('/performance/')) {
            return 'performance';
          }

          // Animations - defer loading, not critical for LCP
          if (id.includes('/animations/')) {
            return 'animations';
          }

          // Data chunks - cached separately for updates
          if (id.includes('/data/')) {
            return 'data';
          }

          // Page components - split for route-based loading
          if (id.includes('/pages/')) {
            return 'pages';
          }

          // SEO utilities - load with pages
          if (id.includes('/seo/')) {
            return 'seo';
          }

          // Components - shared across pages
          if (id.includes('/components/')) {
            return 'components';
          }

          // Utils - shared utilities
          if (id.includes('/utils/')) {
            return 'utils';
          }
        },

        // Asset file naming with content hash for cache busting
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          const extType = name.split('.').pop() || '';

          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp|avif/i.test(extType)) {
            return 'assets/images/[name]-[hash][extname]';
          }

          if (/woff2?|eot|ttf|otf/i.test(extType)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }

          if (extType === 'css') {
            return 'assets/css/[name]-[hash][extname]';
          }

          return 'assets/[name]-[hash][extname]';
        },

        // Chunk file naming with hash
        chunkFileNames: 'assets/js/[name]-[hash].js',

        // Entry file naming
        entryFileNames: 'assets/js/[name]-[hash].js',

        // Compact output for smaller bundles
        compact: true,

        // Generate ES modules for modern browsers
        format: 'es',

        // Hoist transitive imports for fewer requests
        hoistTransitiveImports: true
      },

      // Tree shaking optimization
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      }
    },

    // Chunk size warnings (keep bundles small for fast loading)
    chunkSizeWarningLimit: 300,

    // Asset inlining threshold (4kb - inline small assets)
    assetsInlineLimit: 4096,

    // Report compressed size in build output
    reportCompressedSize: true,

    // Module preload polyfill for older browsers
    modulePreload: {
      polyfill: true
    }
  },

  // Optimize dependencies for faster dev startup
  optimizeDeps: {
    include: ['gsap', 'lenis', 'leaflet'],
    exclude: [],
    // Force optimization for consistent behavior
    force: false
  },

  // Preview server (for testing production builds)
  preview: {
    port: 4001,
    strictPort: true,
    headers: {
      // Security headers
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',

      // Cache headers for static assets
      'Cache-Control': 'public, max-age=31536000, immutable'
    }
  },

  // esbuild options for optimal minification
  esbuild: {
    // Remove console.log in production (keep errors and warnings)
    drop: ['debugger'],
    // Minify identifiers
    minifyIdentifiers: true,
    // Minify syntax
    minifySyntax: true,
    // Minify whitespace
    minifyWhitespace: true,
    // Target modern browsers
    target: 'es2020',
    // Legal comments handling
    legalComments: 'none'
  },

  // Define global constants
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0')
  }
});
