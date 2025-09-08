// ===== IMPORTS =====
// These are the modules we need for this service
import { Injectable } from '@angular/core';           // Makes this class injectable as a service
import { HttpClient, HttpHeaders } from '@angular/common/http';  // For making HTTP requests
import { Observable } from 'rxjs';                    // For handling asynchronous data streams
import { map } from 'rxjs/operators';                 // For transforming data in Observable streams
import { AuthService } from './auth.service';         // Our custom authentication service

// ===== INTERFACES =====
// Interfaces define the structure of data objects

/**
 * Product Interface
 * 
 * This defines what a product object looks like
 * - id: Unique identifier for the product
 * - productName: The name/title of the product
 * - url: Web address/link for the product
 * 
 * Why use interfaces?
 * - Type safety: TypeScript catches errors if we use wrong properties
 * - Code completion: IDE suggests available properties
 * - Documentation: Makes it clear what data structure to expect
 */
export interface Product {
  id: string;          // Unique identifier (e.g., "product_123")
  productName: string; // Product name (e.g., "iPhone 15")
  url: string;         // Product URL (e.g., "https://apple.com/iphone")
}

/**
 * ProductListResponse Interface
 * 
 * This defines what the API returns when we fetch the product list
 * - It's an object where keys are product IDs and values are Product objects
 * - Example: { "product_1": { id: "product_1", productName: "iPhone", url: "..." } }
 * 
 * Why [key: string]: Product?
 * - The API returns an object, not an array
 * - Keys are dynamic (product IDs)
 * - Values are always Product objects
 * - This is called an "index signature" in TypeScript
 */
export interface ProductListResponse {
  [key: string]: Product; // Object with string keys and Product values
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
export class ProductService {
  
  // ===== CLASS PROPERTIES =====
  
  /**
   * API_URL - The endpoint for fetching product list
   * 
   * Why make it readonly?
   * - Prevents accidental changes to the URL
   * - Makes it clear this is a constant value
   * - TypeScript will error if we try to modify it
   */
  private readonly API_URL = 'https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/productList';

  // ===== CONSTRUCTOR =====
  /**
   * Constructor - Dependency Injection
   * 
   * @param http - Angular's HttpClient for making API calls
   * @param authService - Our custom AuthService for getting authentication token
   * 
   * How Dependency Injection works here:
   * - Angular automatically provides HttpClient when we request it
   * - We inject our own AuthService to get the authentication token
   * - This follows the Single Responsibility Principle
   * - Makes testing easier (we can inject mock services)
   */
  constructor(
    private http: HttpClient,        // For making HTTP requests
    private authService: AuthService // For getting authentication token
  ) {}

  // ===== API METHODS =====
  
  /**
   * getProductList() - Fetch the list of products from the API
   * 
   * @returns Observable<Product[]> - Asynchronous stream of product array
   * 
   * How this method works:
   * 1. Get authentication token from AuthService
   * 2. Check if token exists (throw error if not)
   * 3. Create HTTP headers with Bearer token for authentication
   * 4. Make GET request to product list API
   * 5. Transform API response from object to array using map operator
   * 6. Return Observable that components can subscribe to
   * 
   * Why use Bearer token?
   * - API requires authentication to access product data
   * - Bearer token proves user is logged in
   * - Standard way to send JWT tokens in HTTP headers
   */
  getProductList(): Observable<Product[]> {
    
    // Step 1: Get authentication token from AuthService
    const token = this.authService.getAuthToken();
    
    // Step 2: Check if token exists
    if (!token) {
      // Throw error if no token (user not authenticated)
      throw new Error('No authentication token found');
    }

    // Step 3: Create HTTP headers with Bearer token
    // Bearer token is the standard way to send JWT tokens
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,    // JWT token for authentication
      'Content-Type': 'application/json',   // We're sending JSON data
      'Accept': 'application/json'          // We want JSON response back
    });

    // Step 4: Log request details for debugging
    console.log('Fetching product list from:', this.API_URL);
    console.log('Using token:', token.substring(0, 20) + '...'); // Only show first 20 chars for security

    // Step 5: Make GET request and transform response
    return this.http.get<ProductListResponse>(this.API_URL, { headers })
      .pipe(
        // Use map operator to transform the response
        // API returns object, but we want array for easier use in components
        map(response => this.convertResponseToArray(response))
      );
  }

  // ===== HELPER METHODS =====
  
  /**
   * convertResponseToArray() - Transform API response from object to array
   * 
   * @param response - API response object (ProductListResponse)
   * @returns Product[] - Array of products
   * 
   * Why convert object to array?
   * - API returns: { "product_1": {...}, "product_2": {...} }
   * - Components expect: [{...}, {...}] (array format)
   * - Arrays are easier to loop through with *ngFor
   * - Arrays have built-in methods like map, filter, find
   * 
   * How Object.values() works:
   * - Takes an object and returns array of its values
   * - Ignores the keys, only returns the Product objects
   * - Example: Object.values({a: 1, b: 2}) returns [1, 2]
   */
  private convertResponseToArray(response: ProductListResponse): Product[] {
    // Object.values() extracts all the Product objects from the response
    // This converts from { "id1": product1, "id2": product2 } to [product1, product2]
    return Object.values(response);
  }
}
