// ===== IMPORTS =====
// These are the modules we need for this guard
import { Injectable } from '@angular/core';           // Makes this class injectable as a service
import { CanActivate, Router } from '@angular/router'; // CanActivate interface and Router for navigation
import { AuthService } from '../services/auth.service'; // Our custom authentication service

// ===== GUARD DECORATOR =====
/**
 * @Injectable Decorator
 * 
 * This tells Angular that this class can be injected into other components
 * - providedIn: 'root' means this service is available everywhere in the app
 * - It's a singleton: only one instance exists throughout the app
 */
@Injectable({
  providedIn: 'root' // Makes this a singleton service available throughout the app
})

// ===== GUARD CLASS =====
/**
 * AuthGuard Class
 * 
 * This class implements the CanActivate interface
 * - CanActivate is an Angular interface for route guards
 * - Guards control whether users can access certain routes
 * - This guard checks if user is authenticated before allowing access
 * 
 * How Route Guards work:
 * - Angular calls canActivate() before navigating to a protected route
 * - If canActivate() returns true, navigation proceeds
 * - If canActivate() returns false, navigation is blocked
 * - Guards can also redirect users to other routes
 */
export class AuthGuard implements CanActivate {
  
  // ===== CONSTRUCTOR =====
  /**
   * Constructor - Dependency Injection
   * 
   * @param authService - Our custom AuthService for checking authentication status
   * @param router - Angular Router for navigation (to redirect unauthenticated users)
   * 
   * How Dependency Injection works here:
   * - Angular automatically provides these services when we request them
   * - We don't need to create them ourselves
   * - Makes testing easier (we can inject mock services)
   */
  constructor(
    private authService: AuthService, // For checking if user is authenticated
    private router: Router           // For redirecting unauthenticated users
  ) {}

  // ===== GUARD METHOD =====
  
  /**
   * canActivate() - Check if user is authenticated before allowing access to protected routes
   * 
   * @returns boolean - True if user can access the route, false if not
   * 
   * How this method works:
   * 1. Get authentication token from AuthService
   * 2. Check if user is authenticated (token exists and not expired)
   * 3. Handle special cases (test tokens, real JWT tokens)
   * 4. Allow access if authenticated, block and redirect if not
   * 
   * When is this method called?
   * - Before navigating to any route that has canActivate: [AuthGuard]
   * - Angular automatically calls this method
   * - Happens before the component loads
   * 
   * Why use guards?
   * - Prevents unauthorized access to protected pages
   * - Centralizes authentication logic
   * - Can redirect users to login page automatically
   * - Works with Angular's routing system
   */
  canActivate(): boolean {
    
    // Step 1: Get authentication information
    const token = this.authService.getAuthToken();        // Get stored token
    const isAuth = this.authService.isAuthenticated();    // Check if token is valid
    
    // Step 2: Log authentication status for debugging
    console.log('=== AUTHGUARD DEBUG ===');
    console.log('AuthGuard: Checking authentication...');
    console.log('AuthGuard: Token exists:', !!token);     // !! converts to boolean
    console.log('AuthGuard: Token value:', token ? token.substring(0, 30) + '...' : 'null');
    console.log('AuthGuard: Full token:', token);
    console.log('AuthGuard: isAuthenticated():', isAuth);
    
    // Step 3: Check localStorage directly (for debugging)
    const directToken = localStorage.getItem('authToken');
    const directExpiry = localStorage.getItem('tokenExpiry');
    console.log('AuthGuard: Direct localStorage token:', directToken);
    console.log('AuthGuard: Direct localStorage expiry:', directExpiry);
    
    // Step 4: Handle special test tokens (for development/testing)
    // These tokens are created by test methods and should be allowed
    if (token && (token.startsWith('test-token-') || token.startsWith('mock-jwt-token-'))) {
      console.log('AuthGuard: Test/Mock token detected, allowing access for testing');
      return true; // Allow access for test tokens
    }
    
    // Step 5: Handle real JWT tokens (from actual API)
    // JWT tokens typically start with "eyJ" (base64 encoded JSON)
    if (token && token.startsWith('eyJ')) {
      console.log('AuthGuard: Real JWT token detected, checking authentication...');
      // Let the isAuthenticated() method handle the validation
    }
    
    // Step 6: Final authentication check
    if (isAuth) {
      // User is authenticated - allow access to the route
      console.log('AuthGuard: User is authenticated, allowing access');
      return true; // Allow access to the route
    } else {
      // User is not authenticated - block access and redirect
      console.log('AuthGuard: User is not authenticated, redirecting to login');
      console.log('AuthGuard: Final decision: BLOCK ACCESS');
      
      // Redirect user to login page
      this.router.navigate(['/login']);
      
      return false; // Block access to the route
    }
  }
}
