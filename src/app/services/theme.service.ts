// ===== TM R&D ASSESSMENT - THEME SERVICE =====
/*
 * Author: Naufal Arrashid
 * Project: TM R&D Assessment
 * Description: Service to manage light/dark theme switching throughout the application
 * Features: 
 * - Theme state management with RxJS observables
 * - LocalStorage persistence for user preference
 * - CSS custom properties injection
 * - Smooth theme transitions
 */

// ===== IMPORTS =====
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// ===== THEME TYPES =====
export type Theme = 'light' | 'dark';

// ===== SERVICE DECORATOR =====
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // ===== PRIVATE PROPERTIES =====
  private readonly THEME_KEY = 'app-theme';
  private readonly DEFAULT_THEME: Theme = 'light';
  
  // ===== THEME STATE =====
  private themeSubject = new BehaviorSubject<Theme>(this.getStoredTheme());
  public theme$: Observable<Theme> = this.themeSubject.asObservable();

  // ===== CONSTRUCTOR =====
  constructor() {
    // Apply the initial theme
    this.applyTheme(this.getStoredTheme());
  }

  // ===== PUBLIC METHODS =====
  
  /**
   * Get current theme
   * 
   * @returns Theme - Current theme ('light' or 'dark')
   */
  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  /**
   * Toggle between light and dark theme
   * 
   * This method switches the current theme and applies it
   */
  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Set specific theme
   * 
   * @param theme - Theme to set ('light' or 'dark')
   */
  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.storeTheme(theme);
    this.applyTheme(theme);
  }

  // ===== PRIVATE METHODS =====
  
  /**
   * Get stored theme from localStorage
   * 
   * @returns Theme - Stored theme or default theme
   */
  private getStoredTheme(): Theme {
    try {
      const stored = localStorage.getItem(this.THEME_KEY);
      return (stored === 'light' || stored === 'dark') ? stored : this.DEFAULT_THEME;
    } catch (error) {
      console.warn('ThemeService: Could not read theme from localStorage:', error);
      return this.DEFAULT_THEME;
    }
  }

  /**
   * Store theme in localStorage
   * 
   * @param theme - Theme to store
   */
  private storeTheme(theme: Theme): void {
    try {
      localStorage.setItem(this.THEME_KEY, theme);
    } catch (error) {
      console.warn('ThemeService: Could not store theme in localStorage:', error);
    }
  }

  /**
   * Apply theme to document
   * 
   * @param theme - Theme to apply
   */
  private applyTheme(theme: Theme): void {
    const htmlElement = document.documentElement;
    
    // Remove existing theme classes
    htmlElement.classList.remove('light-theme', 'dark-theme');
    
    // Add new theme class
    htmlElement.classList.add(`${theme}-theme`);
    
    // Set data attribute for CSS targeting
    htmlElement.setAttribute('data-theme', theme);
    
    console.log(`ThemeService: Applied ${theme} theme`);
  }
}
