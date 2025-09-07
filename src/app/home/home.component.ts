// ===== TM R&D ASSESSMENT - HOME COMPONENT =====
/*
 * Author: Naufal Arrashid
 * Project: TM R&D Assessment
 * Description: Main dashboard component displaying product list and management features
 * Features:
 * - Product list display with API integration
 * - Add/Edit/Remove product functionality (client-side storage)
 * - Modal dialogs for product management
 * - Theme toggle integration
 * - Responsive design with modern UI
 * - Error handling and loading states
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ThemeToggleComponent } from '../components/theme-toggle/theme-toggle.component';

/**
 * HomeComponent displays the main dashboard after successful login
 * 
 * This component provides:
 * - Product list display in a table format
 * - Authentication status checking
 * - API integration for fetching products
 * - Error handling and loading states
 * - Logout functionality
 * - Support for both real and test tokens
 * - Dark/Light mode theme support
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ThemeToggleComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Component state properties
  products: Product[] = [];        // Array to store fetched products
  isLoading: boolean = false;      // Controls loading spinner display
  errorMessage: string = '';       // Stores error messages for user display
  currentUser: string = '';        // Current authenticated user name
  isAddFormValid: boolean = false; // Tracks add product form validation state

  // Modal state properties
  showAddModal: boolean = false;   // Controls Add Product modal visibility
  showEditModal: boolean = false;  // Controls Edit Product modal visibility
  showDeleteModal: boolean = false; // Controls Delete confirmation modal visibility
  productToDelete: Product | null = null; // Product to be deleted
  
  // Form data properties
  newProduct: Product = {          // New product data for Add modal
    id: '',
    productName: '',
    url: ''
  };
  
  editingProduct: Product = {      // Product data being edited
    id: '',
    productName: '',
    url: ''
  };

  /**
   * Constructor - Dependency injection
   * 
   * @param productService - Service for fetching product data from API
   * @param authService - Service for authentication status and token management
   * @param router - Angular router for navigation between pages
   */
  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Component initialization - runs when component loads
   * 
   * This method:
   * 1. Checks if user is authenticated
   * 2. Redirects to login if not authenticated
   * 3. Sets up user information
   * 4. Loads the product list
   */
  ngOnInit(): void {
    console.log('HomeComponent: Initializing...');
    
    // Step 1: Check if user is authenticated
    // This prevents unauthorized access to the home page
    if (!this.authService.isAuthenticated()) {
      console.log('HomeComponent: User not authenticated, redirecting to login');
      this.router.navigate(['/login']);
      return; // Exit early if not authenticated
    }

    // Step 2: Set up user information
    // In a real app, this would come from the authentication response
    this.currentUser = 'Evaluator';
    
    // Step 3: Load the product list from the API
    this.loadProducts();
  }

  /**
   * Load products from the API
   * 
   * This method:
   * 1. Sets loading state and clears previous data
   * 2. Calls the product service to fetch data
   * 3. Handles successful responses by converting to array format
   * 4. Handles errors with appropriate user messages
   * 5. Supports both real and test tokens
   */
  loadProducts(): void {
    // Step 1: Set loading state and clear previous data
    this.isLoading = true;
    this.errorMessage = '';
    this.products = [];

    console.log('HomeComponent: Loading products...');

    // Step 2: Call the product service to fetch data from API
    this.productService.getProductList().subscribe({
      // Handle successful API response
      next: (response) => {
        this.isLoading = false; // Stop loading spinner
        
        // Step 3: Convert response to array format
        // The API might return an object with product IDs as keys
        if (typeof response === 'object' && !Array.isArray(response)) {
          this.products = Object.values(response); // Convert object to array
        } else {
          this.products = response as Product[]; // Already an array
        }
        
        console.log('HomeComponent: Products loaded successfully:', this.products.length);
      },
      // Handle API errors (network issues, authentication failures, etc.)
      error: (error) => {
        this.isLoading = false; // Stop loading spinner
        console.error('HomeComponent: Error loading products:', error);
        
        // Step 4: Check if we're using a test token (for debugging)
        // Test tokens are not valid for the real API, so 401 errors are expected
        const token = this.authService.getAuthToken();
        const isTestToken = token && (token.startsWith('test-token-') || token.startsWith('mock-jwt-token-'));
        
        // Step 5: Handle different error types with appropriate user messages
        if (error.status === 401) {
          if (isTestToken) {
            // For test tokens, show a friendly message instead of logging out
            // This allows testing the UI without valid API credentials
            this.errorMessage = 'Test mode: API authentication failed (expected with test tokens). Products cannot be loaded.';
            console.log('HomeComponent: 401 error with test token - not logging out');
          } else {
            // For real tokens, logout on auth failure
            // This indicates the token has expired or is invalid
          this.errorMessage = 'Authentication failed. Please login again.';
          this.logout(); // Auto-logout on auth failure
          }
        } else if (error.status === 0) {
          // Network connection error
          this.errorMessage = 'Unable to connect to server. Please check your internet connection.';
        } else {
          // Other server errors
          this.errorMessage = 'Failed to load products. Please try again later.';
        }
      }
    });
  }

  /**
   * Handle logout functionality
   * 
   * This method:
   * 1. Clears the authentication token from localStorage
   * 2. Redirects the user back to the login page
   * 3. Used when user manually logs out or when authentication fails
   */
  logout(): void {
    console.log('HomeComponent: Logging out user...');
    this.authService.logout(); // Clear token from localStorage
    this.router.navigate(['/login']); // Redirect to login page
  }

  /**
   * Refresh the product list
   * 
   * This method reloads the product data from the API
   * Used when user clicks the refresh button or when retrying after an error
   */
  refreshProducts(): void {
    console.log('HomeComponent: Refreshing products...');
    this.loadProducts(); // Reload products from API
  }

  /**
   * Open product URL in new tab
   * 
   * This method opens the product URL in a new browser tab
   * Used when user clicks the "View" button for a product
   * 
   * @param url - Product URL to open
   */
  openProductUrl(url: string): void {
    if (url) {
      console.log('HomeComponent: Opening product URL:', url);
      window.open(url, '_blank'); // Open in new tab
    }
  }

  /**
   * TrackBy function for ngFor performance optimization
   * 
   * This method helps Angular track items in the product list
   * for better performance when the list changes
   * 
   * @param index - Index of the item in the array
   * @param product - Product object
   * @returns string - Unique identifier for the product (the product ID)
   */
  trackByProductId(index: number, product: Product): string {
    return product.id; // Use product ID as unique identifier
  }

  /**
   * Navigate to product detail page
   * 
   * This method navigates to the detail page for a specific product
   * Used when user clicks on a product name in the table
   * 
   * @param productId - The ID of the product to view details for
   */
  navigateToDetail(productId: string): void {
    console.log('HomeComponent: Navigating to detail page for product:', productId);
    this.router.navigate(['/detail', productId]);
  }

  // ===== ADD PRODUCT MODAL METHODS =====

  /**
   * Validates the add product form in real-time
   * Called whenever user types in any input field
   */
  validateAddForm(): void {
    // Check if product name is valid (minimum 2 characters)
    const isProductNameValid = !!(this.newProduct.productName && 
                                 this.newProduct.productName.length >= 2);
    
    // Check if URL is valid (must be a proper URL format)
    const isUrlValid = !!(this.newProduct.url && 
                         this.newProduct.url.length > 0 &&
                         this.isValidUrl(this.newProduct.url));
    
    this.isAddFormValid = isProductNameValid && isUrlValid;
  }

  /**
   * Validate if a string is a proper URL format
   * 
   * @param url - The URL string to validate
   * @returns boolean - true if valid URL, false otherwise
   */
  public isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Open the Add Product modal
   * 
   * This method resets the form data and shows the Add Product modal
   * Used when user clicks the "Add Product" button
   */
  openAddProductModal(): void {
    console.log('HomeComponent: Opening Add Product modal');
    
    // Reset form data
    this.newProduct = {
      id: '',
      productName: '',
      url: ''
    };
    
    // Show modal
    this.showAddModal = true;
  }

  /**
   * Close the Add Product modal
   * 
   * This method hides the Add Product modal and resets form data
   * Used when user clicks close button or clicks outside modal
   */
  closeAddProductModal(): void {
    console.log('HomeComponent: Closing Add Product modal');
    this.showAddModal = false;
    
    // Reset form data
    this.newProduct = {
      id: '',
      productName: '',
      url: ''
    };
  }

  /**
   * Add a new product to the list
   * 
   * This method adds a new product to the local products array
   * and closes the modal. Uses client-side storage as specified in requirements.
   * 
   * The method:
   * 1. Generates a unique ID for the new product
   * 2. Adds the product to the local array
   * 3. Closes the modal
   * 4. Provides user feedback
   */
  addProduct(): void {
    console.log('HomeComponent: Adding new product:', this.newProduct);
    
    // Generate unique ID (simple timestamp-based approach)
    const newId = 'product_' + Date.now();
    
    // Create new product object
    const productToAdd: Product = {
      id: newId,
      productName: this.newProduct.productName.trim(),
      url: this.newProduct.url.trim()
    };
    
    // Add to products array (client-side storage as per requirements)
    this.products.unshift(productToAdd); // Add to beginning of array
    
    console.log('HomeComponent: Product added successfully. Total products:', this.products.length);
    
    // Close modal and reset form
    this.closeAddProductModal();
    
    // Show success message (optional - could be enhanced with toast notifications)
    console.log('HomeComponent: New product added:', productToAdd.productName);
  }

  // ===== EDIT PRODUCT MODAL METHODS =====

  /**
   * Open the Edit Product modal
   * 
   * This method populates the edit form with the selected product's data
   * and shows the Edit Product modal
   * 
   * @param product - The product to edit
   */
  openEditProductModal(product: Product): void {
    console.log('HomeComponent: Opening Edit Product modal for:', product.productName);
    
    // Create a copy of the product for editing
    this.editingProduct = {
      id: product.id,
      productName: product.productName,
      url: product.url
    };
    
    // Show modal
    this.showEditModal = true;
  }

  /**
   * Close the Edit Product modal
   * 
   * This method hides the Edit Product modal and resets form data
   * Used when user clicks close button or clicks outside modal
   */
  closeEditProductModal(): void {
    console.log('HomeComponent: Closing Edit Product modal');
    this.showEditModal = false;
    
    // Reset form data
    this.editingProduct = {
      id: '',
      productName: '',
      url: ''
    };
  }

  /**
   * Update an existing product
   * 
   * This method updates the product in the local products array
   * and closes the modal. Uses client-side storage as specified in requirements.
   * 
   * The method:
   * 1. Finds the product in the array by ID
   * 2. Updates the product data
   * 3. Closes the modal
   * 4. Provides user feedback
   */
  updateProduct(): void {
    console.log('HomeComponent: Updating product:', this.editingProduct);
    
    // Find the product in the array
    const productIndex = this.products.findIndex(p => p.id === this.editingProduct.id);
    
    if (productIndex !== -1) {
      // Update the product data
      this.products[productIndex] = {
        id: this.editingProduct.id,
        productName: this.editingProduct.productName.trim(),
        url: this.editingProduct.url.trim()
      };
      
      console.log('HomeComponent: Product updated successfully');
      
      // Close modal and reset form
      this.closeEditProductModal();
      
      // Show success message
      console.log('HomeComponent: Product updated:', this.products[productIndex].productName);
    } else {
      console.error('HomeComponent: Product not found for update');
    }
  }

  /**
   * Remove a product from the list
   * 
   * This method removes the product from the local products array
   * and closes the modal. Uses client-side storage as specified in requirements.
   * 
   * The method:
   * 1. Finds the product in the array by ID
   * 2. Removes the product from the array
   * 3. Closes the modal
   * 4. Provides user feedback
   */
  removeProduct(): void {
    console.log('HomeComponent: Removing product:', this.editingProduct.productName);
    
    // Find the product in the array
    const productIndex = this.products.findIndex(p => p.id === this.editingProduct.id);
    
    if (productIndex !== -1) {
      // Remove the product from the array
      const removedProduct = this.products.splice(productIndex, 1)[0];
      
      console.log('HomeComponent: Product removed successfully. Remaining products:', this.products.length);
      
      // Close modal and reset form
      this.closeEditProductModal();
      
      // Show success message
      console.log('HomeComponent: Product removed:', removedProduct.productName);
    } else {
      console.error('HomeComponent: Product not found for removal');
    }
  }

  // ===== DELETE CONFIRMATION METHODS =====

  /**
   * Opens the delete confirmation modal
   * 
   * @param product - The product to be deleted
   */
  openDeleteModal(product: Product): void {
    console.log('HomeComponent: Opening delete confirmation for product:', product.productName);
    this.productToDelete = product;
    this.showDeleteModal = true;
  }

  /**
   * Closes the delete confirmation modal
   */
  closeDeleteModal(): void {
    console.log('HomeComponent: Closing delete confirmation modal');
    this.showDeleteModal = false;
    this.productToDelete = null;
  }

  /**
   * Confirms and removes a product from the list
   * This method filters out the product with the specified ID
   */
  confirmDeleteProduct(): void {
    if (this.productToDelete) {
      console.log('HomeComponent: Confirming deletion of product:', this.productToDelete.productName);
      
      // Find and remove the product from the array
      const productIndex = this.products.findIndex(p => p.id === this.productToDelete!.id);
      
      if (productIndex !== -1) {
        this.products.splice(productIndex, 1);
        console.log('HomeComponent: Product deleted. Remaining products:', this.products.length);
      }
      
      // Close both modals (delete confirmation and edit modal)
      this.closeDeleteModal();
      this.closeEditProductModal();
    }
  }
}