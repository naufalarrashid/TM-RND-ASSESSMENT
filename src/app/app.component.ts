// ===== TM R&D ASSESSMENT - ROOT APP COMPONENT =====
/*
 * Author: Naufal Arrashid
 * Project: TM R&D Assessment
 * Description: Root application component that serves as the main entry point
 * Features:
 * - Router outlet for navigation between pages
 * - Minimal design for clean architecture
 * - Standalone component architecture
 */

// ===== IMPORTS =====
import { Component } from '@angular/core';     // Angular component decorator
import { RouterOutlet } from '@angular/router'; // Router outlet for navigation

// ===== COMPONENT DECORATOR =====
/**
 * @Component Decorator
 * 
 * This decorator defines the component metadata:
 * - selector: 'app-root' - How this component is used in HTML (<app-root>)
 * - standalone: true - This is a standalone component (Angular 17+ feature)
 * - imports: [RouterOutlet] - Dependencies this component needs
 * - templateUrl: Points to the HTML template file
 * - styleUrls: Points to the CSS style files
 */
@Component({
  selector: 'app-root',           // HTML tag name: <app-root></app-root>
  standalone: true,               // Standalone component (no NgModule needed)
  imports: [RouterOutlet],        // Import RouterOutlet for navigation
  templateUrl: './app.component.html',  // HTML template file
  styleUrls: ['./app.component.css']    // CSS style file
})

// ===== COMPONENT CLASS =====
/**
 * AppComponent Class
 * 
 * This is the root component of our Angular application:
 * - It serves as the main entry point for the entire app
 * - Contains the router outlet where other components are displayed
 * - Handles the overall app structure and navigation
 * - Authentication logic is handled by guards and individual components
 * 
 * Why is this component so simple?
 * - Clean architecture: Each component has a single responsibility
 * - Routing is handled by Angular Router
 * - Authentication is handled by AuthGuard
 * - Individual pages handle their own logic
 */
export class AppComponent {
  // This component is intentionally minimal
  // All business logic is handled by:
  // - AuthGuard: Authentication and route protection
  // - Individual components: Page-specific functionality
  // - Services: Data management and API calls
  // - Router: Navigation between pages
}
