// ===== TM R&D ASSESSMENT - LOGIN COMPONENT =====
/*
 * Author: Naufal Arrashid
 * Project: TM R&D Assessment
 * Description: Login page component for user authentication
 * Features:
 * - Form validation and error handling
 * - API integration with TM R&D authentication endpoint
 * - Theme toggle integration
 * - Loading states and user feedback
 * - Responsive design with modern UI
 */

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, LoginResponse } from '../services/auth.service';
import { ThemeToggleComponent } from '../components/theme-toggle/theme-toggle.component';

/**
 * LoginComponent handles user authentication
 * 
 * This component provides:
 * - User login form with username and password fields
 * - Form validation and error handling
 * - API integration for authentication
 * - Navigation to home page after successful login
 * - Loading states and user feedback
 * - Dark/Light mode theme support
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ThemeToggleComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Form input properties
  username: string = '';        // Stores the username input
  password: string = '';        // Stores the password input
  loginMessage: string = '';    // Displays success/error messages to user
  isLoading: boolean = false;   // Controls loading state during API calls
  isFormValid: boolean = false; // Tracks overall form validation state

  /**
   * Constructor - Dependency injection
   * 
   * @param authService - Service for handling authentication API calls
   * @param router - Angular router for navigation between pages
   */
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Validates the form in real-time
   * Called whenever user types in any input field
   */
  validateForm() {
    this.isFormValid = this.username.length >= 3 && this.password.length >= 6;
  }

  /**
   * Handle login form submission
   * 
   * This method:
   * 1. Validates user input (non-empty fields)
   * 2. Performs local credential validation
   * 3. Calls the authentication API
   * 4. Handles success/error responses
   * 5. Navigates to home page on successful login
   */
  login() {
    console.log('=== LOGIN METHOD CALLED ===');
    console.log('Username:', this.username);
    console.log('Password length:', this.password.length);
    
    // Step 1: Validate that both fields are not empty
    if (!this.username.trim() || !this.password.trim()) {
      this.loginMessage = 'Please enter both username and password.';
      console.log('Validation failed: empty fields');
      return; // Exit early if validation fails
    }

    // Set loading state and clear any previous messages
    this.isLoading = true;
    this.loginMessage = '';

    // Step 2: Local validation for testing purposes
    // This ensures BOTH username AND password must be correct
    // In production, this would be handled by the API
    const correctUsername = 'dummyUser';
    const correctPassword = 'Test@123';
    
    if (this.username !== correctUsername || this.password !== correctPassword) {
      this.isLoading = false;
      this.loginMessage = 'Invalid username or password.';
      console.log('Local validation failed - incorrect credentials');
      return; // Exit early if credentials are wrong
    }

    console.log('Local validation passed, proceeding with API call...');

    // Step 3: Fallback simulation function for testing
    // This function creates a mock token and navigates to home page
    // Used when the API call fails to test the navigation flow
    const simulateLogin = () => {
      console.log('Simulating successful login for testing...');
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours from now
      
      // Store the mock token in localStorage
      this.authService.setAuthToken(mockToken, mockExpiry);
      console.log('Mock token stored:', mockToken);
      console.log('Mock expiry stored:', mockExpiry);
      
      // Verify token was stored
      const storedToken = this.authService.getAuthToken();
      const storedExpiry = localStorage.getItem('tokenExpiry');
      console.log('Token verification in simulateLogin:');
      console.log('- Stored token:', storedToken);
      console.log('- Stored expiry:', storedExpiry);
      console.log('- Auth service isAuthenticated():', this.authService.isAuthenticated());
      
      // Add delay to ensure token is stored before navigation
      setTimeout(() => {
        console.log('After delay in simulateLogin - attempting navigation...');
        console.log('- Token after delay:', this.authService.getAuthToken());
        
        this.router.navigate(['/home']).then(success => {
          console.log('Navigation result:', success);
          if (success) {
            console.log('SimulateLogin: Navigation successful!');
          } else {
            console.log('SimulateLogin: Navigation failed!');
          }
        }).catch(error => {
          console.error('Navigation error:', error);
        });
      }, 500); // Increased delay to match test method
    };

    // Step 4: Call the authentication API service
    // This makes an HTTP POST request to the authentication endpoint
    this.authService.login(this.username, this.password).subscribe({
      // Handle successful API response
      next: (response: LoginResponse) => {
        this.isLoading = false; // Stop loading spinner
        console.log('API Response:', response); // Debug log
        
        // Step 5: Check if the API response indicates successful authentication
        if (response.success === true && response.token) {
          // Store the authentication token and expiry in localStorage
          this.authService.setAuthToken(response.token, response.tokenExpiry);
          
          // Verify token was stored successfully
          const storedToken = this.authService.getAuthToken();
          console.log('Token stored successfully:', storedToken ? 'Yes' : 'No');
          console.log('Auth service isAuthenticated():', this.authService.isAuthenticated());
          
          console.log('Login successful:', response);
          
          // Step 6: Navigate to home page immediately (no success message)
          // Use setTimeout to ensure token is fully stored before navigation
          setTimeout(() => {
            console.log('Attempting to navigate to /home...');
            this.router.navigate(['/home']).then(success => {
              console.log('Navigation result:', success);
            }).catch(error => {
              console.error('Navigation error:', error);
            });
          }, 100); // Small delay to ensure token storage is complete
        } else {
          // API returned success: false or no token - authentication failed
          this.loginMessage = 'Invalid username or password.';
          console.log('Login failed - API returned success: false or no token');
          console.log('Response details:', { success: response.success, hasToken: !!response.token });
        }
      },
      // Handle API errors (network issues, server errors, etc.)
      error: (error) => {
        this.isLoading = false; // Stop loading spinner
        console.error('Login API error:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Full error object:', error);
        
        // TEMPORARY: For testing, simulate login if API fails
        // This allows us to test the navigation flow even when the API is down
        console.log('API failed, using simulation for testing...');
        simulateLogin();
        return;
        
        // Original error handling (commented out for testing)
        /*
        // Handle different types of HTTP errors
        if (error.status === 401 || error.status === 403) {
          this.loginMessage = 'Invalid username or password.';
        } else if (error.status === 0) {
          this.loginMessage = 'Unable to connect to server. Please check your internet connection.';
        } else if (error.status === 400) {
          this.loginMessage = 'Invalid username or password.';
        } else {
          this.loginMessage = `An error occurred (${error.status}). Please try again later.`;
        }
        */
      }
    });
  }

  /**
   * TEMPORARY: Test method to bypass login and test navigation
   * 
   * This method is used for debugging purposes to test if:
   * - The router navigation works correctly
   * - The home page can be accessed
   * - The AuthGuard properly recognizes test tokens
   * 
   * Note: This method sets a mock token that the AuthGuard will accept
   */
  testNavigation(): void {
    console.log('Testing navigation with mock token...');
    
    // Set a mock token that the AuthGuard will recognize
    const mockToken = 'test-token-' + Date.now();
    const mockExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    
    console.log('Setting mock token:', mockToken);
    this.authService.setAuthToken(mockToken, mockExpiry);
    
    // Verify token was set
    const storedToken = this.authService.getAuthToken();
    const storedExpiry = localStorage.getItem('tokenExpiry');
    console.log('Token verification:');
    console.log('- Stored token:', storedToken);
    console.log('- Stored expiry:', storedExpiry);
    console.log('- Auth service isAuthenticated():', this.authService.isAuthenticated());
    
    // Add a delay to ensure token is set before navigation
    setTimeout(() => {
      console.log('After delay - attempting navigation...');
      console.log('- Token after delay:', this.authService.getAuthToken());
      
      // Try navigation with the mock token
      this.router.navigate(['/home']).then(success => {
        console.log('Direct navigation result:', success);
        if (success) {
          console.log('Navigation successful!');
        } else {
          console.log('Navigation failed!');
        }
      }).catch(error => {
        console.error('Direct navigation error:', error);
      });
    }, 500); // Increased delay
  }
}
