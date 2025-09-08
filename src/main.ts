// ===== TM R&D ASSESSMENT - APPLICATION BOOTSTRAP =====
/*
 * Author: Naufal Arrashid
 * Project: TM R&D Assessment
 * Description: Main entry point for the Angular application
 * Features:
 * - Standalone application bootstrap (Angular 18+)
 * - Application configuration loading
 * - Error handling for bootstrap failures
 */

// ===== IMPORTS =====
import { bootstrapApplication } from '@angular/platform-browser'; // Bootstrap function for standalone apps
import { appConfig } from './app/app.config';                     // Application configuration
import { AppComponent } from './app/app.component';               // Root application component

// ===== APPLICATION BOOTSTRAP =====
/**
 * Bootstrap the Angular Application
 * 
 * This is the entry point of our Angular application:
 * - bootstrapApplication() starts the Angular app in standalone mode
 * - AppComponent is the root component that will be rendered
 * - appConfig contains all the application configuration (providers, routes, etc.)
 * - .catch() handles any errors during the bootstrap process
 * 
 * How it works:
 * 1. Angular loads the AppComponent
 * 2. AppComponent renders the router outlet
 * 3. Router determines which page to show based on the URL
 * 4. The appropriate component is loaded and displayed
 */
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error('Failed to bootstrap application:', err));
