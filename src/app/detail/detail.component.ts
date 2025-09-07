// ===== TM R&D ASSESSMENT - DETAIL COMPONENT =====
/*
 * Author: Naufal Arrashid
 * Project: TM R&D Assessment
 * Description: Product detail page component displaying alert data with filtering and pagination
 * Features:
 * - Product detail view with alert data
 * - Date range filtering for alerts
 * - Pagination with configurable page size
 * - API integration for fetching alert data
 * - Theme toggle integration
 * - Responsive data table design
 * - Authentication protection
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { ThemeToggleComponent } from '../components/theme-toggle/theme-toggle.component';

/**
 * DetailComponent displays detailed information for a specific product
 * 
 * This component provides:
 * - Product detail view with data table
 * - Date range filtering (start and end date)
 * - Pagination with configurable page size
 * - API integration for fetching alert data
 * - Authentication protection
 * - Responsive data table with status, datetime, remark, and duration columns
 * - Dark/Light mode theme support
 */
@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, ThemeToggleComponent],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  // Component state properties
  productId: string = '';          // Product ID from route parameter
  isLoading: boolean = false;      // Controls loading spinner display
  errorMessage: string = '';       // Stores error messages for user display

  // Date range properties
  startDate: string = '';          // Start date for filtering (YYYY-MM-DD format)
  endDate: string = '';            // End date for filtering (YYYY-MM-DD format)

  // Pagination properties
  currentPage: number = 1;         // Current page number (1-based)
  pageSize: number = 5;            // Number of items per page (as per requirements)
  totalItems: number = 0;          // Total number of items from API
  totalPages: number = 0;          // Total number of pages

  // Data properties
  alerts: any[] = [];              // Array to store alert data from API

  /**
   * Constructor - Dependency injection
   * 
   * @param route - Angular ActivatedRoute for getting route parameters
   * @param router - Angular router for navigation
   * @param http - HttpClient for API calls
   * @param authService - Service for authentication and token management
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Component initialization - runs when component loads
   * 
   * This method:
   * 1. Gets the product ID from route parameters
   * 2. Sets default date range (yesterday to today)
   * 3. Loads the initial data
   */
  ngOnInit(): void {
    console.log('DetailComponent: ===== INITIALIZING DETAIL COMPONENT =====');
    
    // Step 1: Get product ID from route parameters
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    console.log('DetailComponent: Product ID from route:', this.productId);
    console.log('DetailComponent: Product ID type:', typeof this.productId);
    console.log('DetailComponent: Product ID length:', this.productId.length);
    
    if (!this.productId) {
      console.error('DetailComponent: No product ID provided');
      this.errorMessage = 'Invalid product ID';
      return;
    }

    // Step 2: Set default date range (within available data period)
    this.setDefaultDateRange();
    
    // Step 3: Load initial data
    this.loadAlerts();
  }

  /**
   * Set default date range (within the available data period)
   * 
   * This method sets the start and end dates within the available data period
   * According to requirements: Data is available from 25th January 2022 – 16th February 2022
   */
  private setDefaultDateRange(): void {
    // Set dates to cover the full available data period to maximize chances of getting data
    const startDate = new Date('2022-01-25'); // 25th January 2022 (start of available data)
    const endDate = new Date('2022-02-16');   // 16th February 2022 (end of available data)
    
    // Format dates as YYYY-MM-DD for API
    this.startDate = this.formatDateForAPI(startDate);
    this.endDate = this.formatDateForAPI(endDate);
    
    console.log('DetailComponent: Default date range set (full available period):', {
      startDate: this.startDate,
      endDate: this.endDate,
      note: 'Using full available period: 2022-01-25 to 2022-02-16'
    });
  }

  /**
   * Format date for API (YYYY-MM-DD format)
   * 
   * @param date - Date object to format
   * @returns string - Formatted date string
   */
  private formatDateForAPI(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Load alerts data from API
   * 
   * This method:
   * 1. Sets loading state
   * 2. Makes API call with current filters and pagination
   * 3. Handles successful response
   * 4. Handles errors
   * 5. Updates pagination info
   */
  loadAlerts(): void {
    console.log('DetailComponent: ===== LOADING ALERTS =====');
    console.log('DetailComponent: Current state:', {
      productId: this.productId,
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      startDate: this.startDate,
      endDate: this.endDate,
      totalItems: this.totalItems,
      totalPages: this.totalPages
    });
    console.log('DetailComponent: Loading alerts...');
    
    // Step 1: Set loading state and clear previous data
    this.isLoading = true;
    this.errorMessage = '';
    this.alerts = [];

    // Step 2: Get authentication token
    const token = this.authService.getAuthToken();
    if (!token) {
      this.isLoading = false;
      this.errorMessage = 'Authentication token not found';
      console.error('DetailComponent: No authentication token');
      return;
    }

    // Step 3: Prepare API request
    const apiUrl = `https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/data/alert/list/${this.productId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    // Step 4: Calculate pagination parameters
    // According to requirements, API expects: indexNumber, pageSize, startDate, endDate
    const indexNumber = (this.currentPage - 1) * this.pageSize;
    
    // Use only the required parameters as specified in the requirements
    const params = {
      indexNumber: indexNumber.toString(),
      pageSize: this.pageSize.toString(),
      startDate: this.startDate,
      endDate: this.endDate
    };

    console.log('DetailComponent: API request details:', {
      url: apiUrl,
      params: params,
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      indexNumber: indexNumber,
      totalPages: this.totalPages,
      totalItems: this.totalItems
    });

    // Step 5: Make API call
    this.http.get<any>(apiUrl, { headers, params }).subscribe({
      // Handle successful response
      next: (response) => {
        this.isLoading = false;
        console.log('DetailComponent: ===== RAW API RESPONSE =====');
        console.log('DetailComponent: Full response:', JSON.stringify(response, null, 2));
        console.log('DetailComponent: Response type:', typeof response);
        console.log('DetailComponent: Response keys:', Object.keys(response));
        
        // Step 6: Process response data
        // Handle different possible response formats
        if (Array.isArray(response)) {
          // If response is directly an array
          this.alerts = response;
          this.totalItems = response.length;
        } else if (response.data) {
          // If response has data property
          this.alerts = Array.isArray(response.data) ? response.data : [];
          this.totalItems = response.total || response.data.length || 0;
        } else {
          // Fallback - try to extract data from response
          this.alerts = [];
          this.totalItems = 0;
          console.log('DetailComponent: Unexpected response format:', response);
        }
        
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        
        console.log('DetailComponent: Processed data:', {
          alertsArray: this.alerts,
          alertsLength: this.alerts.length,
          totalItems: this.totalItems,
          totalPages: this.totalPages,
          currentPage: this.currentPage
        });
        
        // Debug: Log the structure of the first few alerts to understand the data format
        if (this.alerts.length > 0) {
          console.log('DetailComponent: ===== ALERT STRUCTURE ANALYSIS =====');
          this.alerts.slice(0, 3).forEach((alert, index) => {
            console.log(`DetailComponent: Alert ${index + 1}:`, alert);
            console.log(`DetailComponent: Alert ${index + 1} keys:`, Object.keys(alert));
            console.log(`DetailComponent: Alert ${index + 1} datetime field:`, alert.datetime || alert.date || alert.timestamp || alert.time);
            console.log(`DetailComponent: Alert ${index + 1} remark field:`, alert.remark || alert.description || alert.message || alert.note);
            console.log(`DetailComponent: Alert ${index + 1} status field:`, alert.status || alert.state);
            console.log(`DetailComponent: Alert ${index + 1} duration field:`, alert.duration || alert.duration_ms || alert.duration_seconds);
          });
        } else {
          console.log('DetailComponent: No alerts in response - checking why...');
          console.log('DetailComponent: response.data:', response.data);
          console.log('DetailComponent: response.total:', response.total);
        }
        
        console.log('DetailComponent: Data loaded successfully:', {
          alertsCount: this.alerts.length,
          totalItems: this.totalItems,
          totalPages: this.totalPages,
          currentPage: this.currentPage
        });
      },
      
      // Handle API errors
      error: (error) => {
        this.isLoading = false;
        console.error('DetailComponent: Error loading alerts:', error);
        
        // Handle different error types
        if (error.status === 401) {
          this.errorMessage = 'Authentication failed. Please login again.';
          this.router.navigate(['/login']);
        } else if (error.status === 0) {
          this.errorMessage = 'Unable to connect to server. Please check your internet connection.';
        } else {
          this.errorMessage = `Failed to load alerts. Error: ${error.status}`;
        }
      }
    });
  }

  /**
   * Handle date range change
   * 
   * This method is called when user changes the start or end date
   * It resets to page 1 and reloads data
   */
  onDateRangeChange(): void {
    console.log('DetailComponent: Date range changed:', {
      startDate: this.startDate,
      endDate: this.endDate
    });
    
    // Reset to first page and reload data
    this.currentPage = 1;
    this.loadAlerts();
  }

  /**
   * Navigate to a specific page
   * 
   * This method handles pagination clicks and loads data for the selected page
   * 
   * @param page - Page number to navigate to
   */
  goToPage(page: number): void {
    console.log('DetailComponent: Navigating to page:', page);
    
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.loadAlerts();
    } else {
      console.log('DetailComponent: Invalid page navigation - page out of range or same page');
    }
  }

  /**
   * Navigate to previous page
   */
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  /**
   * Navigate to next page
   */
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  /**
   * Navigate to first page
   */
  goToFirstPage(): void {
    this.goToPage(1);
  }

  /**
   * Navigate to last page
   */
  goToLastPage(): void {
    this.goToPage(this.totalPages);
  }

  /**
   * Navigate back to home page
   */
  goBackToHome(): void {
    console.log('DetailComponent: Navigating back to home');
    this.router.navigate(['/home']);
  }



  /**
   * Get array of page numbers for pagination display
   * 
   * This method generates an array of page numbers to display in pagination
   * Shows up to 5 page numbers around the current page
   * 
   * @returns number[] - Array of page numbers to display
   */
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  /**
   * Format duration for display
   * 
   * This method formats duration values for better display
   * 
   * @param duration - Duration value to format
   * @returns string - Formatted duration string
   */
  formatDuration(duration: any): string {
    if (!duration) return 'N/A';
    
    // If it's already a formatted string, return as is
    if (typeof duration === 'string') {
      return duration;
    }
    
    // If it's a number (minutes), convert to hours and minutes
    if (typeof duration === 'number') {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours} hrs ${minutes} mins`;
    }
    
    return String(duration);
  }

  /**
   * Get field value from alert object with fallback field names
   * 
   * This method tries different possible field names for the same data
   * 
   * @param alert - Alert object
   * @param fieldType - Type of field to get (datetime, remark, status, duration)
   * @returns any - Field value or null if not found
   */
  getAlertField(alert: any, fieldType: string): any {
    const fieldMappings: { [key: string]: string[] } = {
      datetime: ['dateTime', 'dateTimeString', 'datetime', 'date', 'timestamp', 'time', 'created_at', 'createdAt', 'alert_time', 'alertTime'],
      remark: ['remark', 'description', 'message', 'note', 'comment', 'details', 'text'],
      status: ['status', 'state', 'alert_status', 'alertStatus', 'type'],
      duration: ['duration', 'durationString', 'duration_ms', 'duration_seconds', 'durationSeconds', 'durationMs', 'time_duration', 'timeDuration']
    };
    
    const possibleFields = fieldMappings[fieldType] || [];
    
    for (const field of possibleFields) {
      if (alert[field] !== undefined && alert[field] !== null && alert[field] !== '') {
        return alert[field];
      }
    }
    return null;
  }

  /**
   * Format datetime for display
   * 
   * This method formats datetime values for better display
   * 
   * @param datetime - Datetime value to format
   * @returns string - Formatted datetime string
   */
  formatDateTime(datetime: any): string {
    if (!datetime) {
      return 'N/A';
    }
    
    // Handle different datetime formats that the API might return
    let date: Date;
    
    try {
      // Try different approaches to parse the datetime
      if (typeof datetime === 'string') {
        // Handle string datetime formats
        if (datetime.includes('T')) {
          // ISO format: "2022-01-30T10:30:00Z" or "2022-01-30T10:30:00.000Z"
          date = new Date(datetime);
        } else if (datetime.includes('-')) {
          // Date format: "2022-01-30" or "2022-01-30 10:30:00"
          date = new Date(datetime);
        } else {
          // Try parsing as timestamp or other format
          date = new Date(datetime);
        }
      } else if (typeof datetime === 'number') {
        // Handle timestamp (milliseconds or seconds)
        if (datetime > 1000000000000) {
          // Milliseconds timestamp
          date = new Date(datetime);
        } else {
          // Seconds timestamp, convert to milliseconds
          date = new Date(datetime * 1000);
        }
      } else {
        // Try direct conversion
        date = new Date(datetime);
      }
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        console.log('DetailComponent: Invalid date created from:', datetime);
        return String(datetime); // Return original value if date parsing failed
      }
      
      // Format the date for display
      const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      return formattedDate;
      
    } catch (error) {
      console.error('DetailComponent: Error formatting datetime:', error);
      console.log('DetailComponent: Returning original value:', datetime);
      return String(datetime);
    }
  }

  /**
   * Get the end item number for pagination display
   * 
   * This method calculates the last item number shown on the current page
   * 
   * @returns number - The end item number for current page
   */
  getEndItemNumber(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  /**
   * TrackBy function for ngFor performance optimization
   * 
   * This method helps Angular track items in the alerts list
   * for better performance when the list changes
   * 
   * @param index - Index of the item in the array
   * @param alert - Alert object
   * @returns number - Index as unique identifier
   */
  trackByAlertId(index: number, alert: any): number {
    return index;
  }
}