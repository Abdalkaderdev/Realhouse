// ═══════════════════════════════════════════════════════════════════════════
// Real House - Main Entry Point
// ═══════════════════════════════════════════════════════════════════════════

import './styles/main.scss';
import { App } from './app';

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
