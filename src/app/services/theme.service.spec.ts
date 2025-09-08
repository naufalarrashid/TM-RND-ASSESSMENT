// ===== TM R&D ASSESSMENT - THEME SERVICE UNIT TESTS =====
/*
 * Author: Naufal Arrashid
 * Project: TM R&D Assessment
 * Description: Unit tests for theme service
 */

import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to light theme', () => {
    expect(service.getCurrentTheme()).toBe('light');
  });

  it('should toggle theme correctly', () => {
    expect(service.getCurrentTheme()).toBe('light');
    
    service.toggleTheme();
    expect(service.getCurrentTheme()).toBe('dark');
    
    service.toggleTheme();
    expect(service.getCurrentTheme()).toBe('light');
  });

  it('should persist theme preference in localStorage', () => {
    service.toggleTheme();
    expect(localStorage.getItem('app-theme')).toBe('dark');
    
    service.toggleTheme();
    expect(localStorage.getItem('app-theme')).toBe('light');
  });

  it('should load saved theme from localStorage', () => {
    localStorage.setItem('app-theme', 'dark');
    const newService = new ThemeService();
    expect(newService.getCurrentTheme()).toBe('dark');
  });
});
