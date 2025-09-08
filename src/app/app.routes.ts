// ===== TM R&D ASSESSMENT - APPLICATION ROUTES =====
/*
 * Author: Naufal Arrashid
 * Project: TM R&D Assessment
 * Description: Application routing configuration with lazy loading and authentication guards
 * Features:
 * - Lazy loading for better performance
 * - Authentication guards for protected routes
 * - Default redirects and error handling
 * - Route parameters for dynamic content
 */

// ===== IMPORTS =====
import { Routes } from '@angular/router';        // Angular routing types
import { AuthGuard } from './guards/auth.guard'; // Custom authentication guard

// ===== ROUTE CONFIGURATION =====
/**
 * Application Routes Configuration
 * 
 * This defines all the routes in our application:
 * - Each route has a path and component to load
 * - Some routes are protected with AuthGuard
 * - Lazy loading is used for better performance
 * - Default redirects handle empty and invalid paths
 */
export const routes: Routes = [
  // ===== LOGIN ROUTE =====
  {
    path: 'login',
    // Lazy loading: Component is only loaded when this route is accessed
    // This improves initial app load time by splitting code into chunks
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  
  // ===== HOME ROUTE (PROTECTED) =====
  {
    path: 'home',
    // Lazy loading: Home component is loaded only when needed
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
    // AuthGuard: Only authenticated users can access this route
    // If user is not authenticated, they'll be redirected to login
    canActivate: [AuthGuard]
  },
  
  // ===== DETAIL ROUTE (PROTECTED) =====
  {
    path: 'detail/:id',  // :id is a route parameter (e.g., /detail/product_123)
    // Lazy loading: Detail component is loaded only when needed
    loadComponent: () => import('./detail/detail.component').then(m => m.DetailComponent),
    // AuthGuard: Only authenticated users can access this route
    // The :id parameter is passed to the component via ActivatedRoute
    canActivate: [AuthGuard]
  },
  
  // ===== DEFAULT ROUTE =====
  {
    path: '',           // Empty path (root URL)
    redirectTo: '/login', // Redirect to login page
    pathMatch: 'full'   // Only redirect if the entire URL matches
  },
  
  // ===== WILDCARD ROUTE (ERROR HANDLING) =====
  {
    path: '**',         // ** matches any path not defined above
    redirectTo: '/login' // Redirect invalid URLs to login page
  }
];
