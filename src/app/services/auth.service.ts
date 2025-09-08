// ===== IMPORTS =====
// These are Angular and RxJS modules we need for this service
import { Injectable } from '@angular/core';           // Makes this class injectable as a service
import { HttpClient, HttpHeaders } from '@angular/common/http';  // For making HTTP requests
import { Observable } from 'rxjs';                    // For handling asynchronous data streams

// ===== INTERFACES =====
// Interfaces define the structure of data objects
// This helps TypeScript catch errors and provides better code completion

/**
 * LoginRequest Interface
 * 
 * This defines what data we send to the login API
 * - username: The user's login name (string)
 * - password: The user's password (string)
 * 
 * Why use interfaces?
 * - Type safety: TypeScript will error if we try to send wrong data types
 * - Code completion: IDE can suggest available properties
 * - Documentation: Makes it clear what data is expected
 */
export interface LoginRequest {
  username: string;    // User's username for authentication
  password: string;    // User's password for authentication
}

/**
 * LoginResponse Interface
 * 
 * This defines what data we expect back from the login API
 * - success: Boolean indicating if login was successful
 * - token: JWT token for authenticated requests (if successful)
 * - tokenExpiry: When the token expires (if successful)
 * 
 * Why define response structure?
 * - We know exactly what properties are available
 * - TypeScript helps us access the right properties
 * - Makes API integration more reliable
 */
export interface LoginResponse {
  success: boolean;      // True if login successful, false if failed
  token: string;         // JWT token for future API calls
  tokenExpiry: string;   // Token expiration date/time
}

// ===== SERVICE DECORATOR =====
/**
 * @Injectable Decorator
 * 
 * This tells Angular that this class can be injected into other components
 * - providedIn: 'root' means this service is available everywhere in the app
 * - It's a singleton: only one instance exists throughout the app
 * - Angular manages the lifecycle automatically
 */
@Injectable({
  providedIn: 'root' // Makes this a singleton service available throughout the app
})
export class AuthService {
  
  // ===== CLASS PROPERTIES =====
  // These are constants that define our API configuration
  
  /**
   * API_URL - The endpoint for user authentication
   * 
   * Why make it readonly?
   * - Prevents accidental changes to the URL
   * - Makes it clear this is a constant value
   * - TypeScript will error if we try to modify it
   */
  private readonly API_URL = 'https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/auth';
  
  /**
   * httpOptions - Default HTTP headers for API requests
   * 
   * Why define headers?
   * - Content-Type: Tells server we're sending JSON data
   * - Accept: Tells server we want JSON response back
   * - Consistent headers across all requests
   */
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',  // We're sending JSON data
      'Accept': 'application/json'         // We want JSON response back
    })
  };

  // ===== CONSTRUCTOR =====
  /**
   * Constructor - Dependency Injection
   * 
   * @param http - Angular's HttpClient for making API calls
   * 
   * How Dependency Injection works:
   * - Angular automatically provides HttpClient when we request it
   * - We don't need to create HttpClient ourselves
   * - Makes testing easier (we can inject mock services)
   * - Follows SOLID principles (Dependency Inversion)
   */
  constructor(private http: HttpClient) {}

  // ===== AUTHENTICATION METHODS =====
  
  /**
   * login() - Authenticate user with username and password
   * 
   * @param username - User's username (string)
   * @param password - User's password (string)
   * @returns Observable<LoginResponse> - Asynchronous response from API
   * 
   * How this method works:
   * 1. Creates a LoginRequest object with user credentials
   * 2. Logs the request for debugging (without exposing password)
   * 3. Makes HTTP POST request to authentication API
   * 4. Returns Observable that components can subscribe to
   * 
   * Why return Observable?
   * - HTTP requests are asynchronous (take time)
   * - Observable allows components to handle success/error responses
   * - Can be cancelled if user navigates away
   * - Follows reactive programming patterns
   */
  login(username: string, password: string): Observable<LoginResponse> {
    
    // Step 1: Create request data object
    // This matches the LoginRequest interface we defined
    const loginData: LoginRequest = {
      username: username,    // User's login name
      password: password     // User's password
    };

    // Step 2: Log request for debugging
    // Never log actual passwords in production!
    console.log('Sending login request to:', this.API_URL);
    console.log('Login data:', { username: username, password: '***' }); // Password hidden for security

    // Step 3: Make HTTP POST request
    // http.post<LoginResponse> means we expect LoginResponse type back
    // Parameters: (URL, data, options)
    return this.http.post<LoginResponse>(this.API_URL, loginData, this.httpOptions);
  }

  // ===== TOKEN MANAGEMENT METHODS =====
  
  /**
   * setAuthToken() - Store authentication token in browser storage
   * 
   * @param token - JWT token received from successful login
   * @param expiry - When the token expires (from API response)
   * 
   * How localStorage works:
   * - localStorage persists data even after browser is closed
   * - Data is stored as key-value pairs (both as strings)
   * - Available across all tabs/windows of the same domain
   * - Survives browser restarts (unlike sessionStorage)
   * 
   * Why store token?
   * - User stays logged in between browser sessions
   * - Token is needed for authenticated API calls
   * - Prevents user from having to login repeatedly
   */
  setAuthToken(token: string, expiry: string): void {
    // Store token with key 'authToken'
    localStorage.setItem('authToken', token);
    
    // Store expiry with key 'tokenExpiry'
    localStorage.setItem('tokenExpiry', expiry);
    
    console.log('AuthService: Token stored successfully');
    console.log('AuthService: Token expires at:', expiry);
  }

  /**
   * getAuthToken() - Retrieve authentication token from browser storage
   * 
   * @returns string | null - The stored token or null if not found
   * 
   * Why return string | null?
   * - localStorage.getItem() returns null if key doesn't exist
   * - TypeScript needs to know this possibility
   * - Components can check for null to handle missing tokens
   */
  getAuthToken(): string | null {
    const token = localStorage.getItem('authToken');
    
    // Log token status for debugging (but not the actual token for security)
    console.log('AuthService: Token retrieved:', token ? 'Found' : 'Not found');
    
    return token;
  }

  /**
   * isAuthenticated() - Check if user has a valid authentication token
   * 
   * @returns boolean - True if user is authenticated, false otherwise
   * 
   * How authentication checking works:
   * 1. Get token and expiry from localStorage
   * 2. Check if both exist (if not, user is not authenticated)
   * 3. Parse the expiry date (handle different formats)
   * 4. Compare expiry with current time
   * 5. Return true only if token exists and hasn't expired
   * 
   * Why check expiry?
   * - Tokens have limited lifetime for security
   * - Expired tokens should not be accepted
   * - Prevents unauthorized access with old tokens
   */
  isAuthenticated(): boolean {
    // Step 1: Get token and expiry from browser storage
    const token = this.getAuthToken();
    const expiry = localStorage.getItem('tokenExpiry');
    
    // Step 2: Check if both token and expiry exist
    if (!token || !expiry) {
      console.log('AuthService: No token or expiry found');
      return false; // Can't be authenticated without both
    }

    // Step 3: Handle different expiry formats from API
    let expiryDate: Date;
    
    if (expiry === '1hr') {
      // Special case: API returns "1hr" instead of exact date
      // Calculate 1 hour from current time
      expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 60 minutes * 60 seconds * 1000 milliseconds
      console.log('AuthService: Using 1hr format, setting expiry to:', expiryDate);
    } else {
      // Normal case: API returns ISO date string (e.g., "2025-01-01T12:00:00Z")
      expiryDate = new Date(expiry);
      
      // Check if date parsing was successful
      if (isNaN(expiryDate.getTime())) {
        console.log('AuthService: Invalid expiry format:', expiry);
        return false; // Invalid date format means invalid token
      }
    }
    
    // Step 4: Compare expiry with current time
    const now = new Date();
    const isValid = expiryDate > now; // Token is valid if expiry is in the future
    
    // Step 5: Log validation details for debugging
    console.log('AuthService: Token validation:');
    console.log('- Token exists:', !!token);        // !! converts to boolean
    console.log('- Expiry:', expiry);
    console.log('- Expiry date:', expiryDate);
    console.log('- Current time:', now);
    console.log('- Is valid:', isValid);
    
    return isValid;
  }

  // ===== LOGOUT METHOD =====
  
  /**
   * logout() - Clear authentication data and log user out
   * 
   * How logout works:
   * 1. Remove token from localStorage
   * 2. Remove expiry from localStorage
   * 3. User will need to login again to access protected routes
   * 
   * Why remove from localStorage?
   * - Prevents user from staying logged in after logout
   * - Clears sensitive authentication data
   * - Forces fresh login for security
   */
  logout(): void {
    // Remove authentication data from browser storage
    localStorage.removeItem('authToken');    // Remove the JWT token
    localStorage.removeItem('tokenExpiry');  // Remove the expiry date
    
    console.log('AuthService: User logged out successfully');
  }
}
