// ===== TM R&D ASSESSMENT - THEME TOGGLE COMPONENT =====
/*
 * Author: Naufal Arrashid
 * Project: TM R&D Assessment
 * Description: Reusable theme toggle button component for switching between light/dark modes
 * Features:
 * - Moon/Sun icon animation
 * - Responsive design (hides text on mobile)
 * - Accessibility support (ARIA labels)
 * - Smooth hover effects and transitions
 */

// ===== IMPORTS =====
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ThemeService, Theme } from '../../services/theme.service';

// ===== COMPONENT DECORATOR =====
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="theme-toggle"
      (click)="toggleTheme()"
      [title]="'Switch to ' + (currentTheme === 'light' ? 'dark' : 'light') + ' mode'"
      [attr.aria-label]="'Switch to ' + (currentTheme === 'light' ? 'dark' : 'light') + ' mode'"
    >
      <span class="theme-icon" [class.dark-mode]="currentTheme === 'dark'">
        {{ currentTheme === 'light' ? '🌙' : '☀️' }}
      </span>
      <span class="theme-text">{{ currentTheme === 'light' ? 'Dark' : 'Light' }}</span>
    </button>
  `,
  styles: [`
    .theme-toggle {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      color: var(--text-primary);
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .theme-toggle:hover {
      background: var(--bg-tertiary);
      border-color: var(--border-hover);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }

    .theme-toggle:active {
      transform: translateY(0);
    }

    .theme-icon {
      font-size: 1.1rem;
      transition: transform 0.3s ease;
    }

    .theme-icon.dark-mode {
      transform: rotate(180deg);
    }

    .theme-text {
      font-size: 0.85rem;
    }

    /* Responsive design */
    @media (max-width: 768px) {
      .theme-toggle {
        padding: 0.4rem 0.8rem;
        font-size: 0.8rem;
      }
      
      .theme-text {
        display: none;
      }
    }
  `]
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  // ===== PROPERTIES =====
  currentTheme: Theme = 'light';
  private themeSubscription?: Subscription;

  // ===== CONSTRUCTOR =====
  constructor(private themeService: ThemeService) {}

  // ===== LIFECYCLE METHODS =====
  
  /**
   * Initialize component
   * 
   * Subscribe to theme changes and set initial theme
   */
  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme();
    
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  /**
   * Cleanup subscriptions
   */
  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  // ===== PUBLIC METHODS =====
  
  /**
   * Toggle between light and dark theme
   * 
   * This method calls the theme service to switch themes
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
