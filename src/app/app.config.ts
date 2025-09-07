// ===== TM R&D ASSESSMENT - APPLICATION CONFIGURATION =====
/*
 * Author: Naufal Arrashid
 * Project: TM R&D Assessment
 * Description: Application configuration for Angular standalone app
 * Features:
 * - Zone change detection optimization
 * - Router configuration with lazy loading
 * - HTTP client for API communication
 * - Provider configuration for dependency injection
 */

// ===== IMPORTS =====
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'; // Core Angular configuration
import { provideRouter } from '@angular/router';                               // Router configuration
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // HTTP client configuration

import { routes } from './app.routes'; // Application routes configuration

// ===== APPLICATION CONFIGURATION =====
/**
 * Application Configuration
 * 
 * This configuration object defines how our Angular application behaves:
 * - providers: Array of service providers that make functionality available throughout the app
 * - Each provider configures a specific aspect of the application
 * 
 * Why use providers?
 * - Dependency injection: Services can be injected into components
 * - Configuration: Set up how Angular features work
 * - Performance: Optimize change detection and other features
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // ===== ZONE CHANGE DETECTION =====
    // Optimizes Angular's change detection for better performance
    // eventCoalescing: true - Combines multiple events into single change detection cycle
    provideZoneChangeDetection({ eventCoalescing: true }), 
    
    // ===== ROUTER CONFIGURATION =====
    // Enables Angular Router for navigation between pages
    // routes: Contains all the application routes (login, home, detail, etc.)
    provideRouter(routes),
    
    // ===== HTTP CLIENT CONFIGURATION =====
    // Enables HTTP client for making API calls
    // withInterceptorsFromDi(): Allows dependency injection in HTTP interceptors
    // This is needed for our AuthService to make authenticated API calls
    provideHttpClient(withInterceptorsFromDi())
  ]
};
