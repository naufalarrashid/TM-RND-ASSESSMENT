// ===== TM R&D ASSESSMENT - LOGIN COMPONENT UNIT TESTS =====
/*
 * Author: Naufal Arrashid
 * Project: TM R&D Assessment
 * Description: Unit tests for login component
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.username).toBe('');
    expect(component.password).toBe('');
    expect(component.isLoading).toBeFalse();
    expect(component.loginMessage).toBe('');
  });

  it('should validate form correctly', () => {
    // Test empty form
    component.validateForm();
    expect(component.isFormValid).toBeFalse();

    // Test with only username
    component.username = 'test';
    component.validateForm();
    expect(component.isFormValid).toBeFalse();

    // Test with only password
    component.username = '';
    component.password = 'test123';
    component.validateForm();
    expect(component.isFormValid).toBeFalse();

    // Test with both fields
    component.username = 'test';
    component.password = 'test123';
    component.validateForm();
    expect(component.isFormValid).toBeTrue();
  });

  it('should handle successful login', () => {
    const mockResponse = { 
      success: true, 
      token: 'test-token', 
      tokenExpiry: '1hr' 
    };
    authService.login.and.returnValue(of(mockResponse));

    component.username = 'dummyUser';
    component.password = 'Test@123';
    component.login();

    expect(authService.login).toHaveBeenCalledWith('dummyUser', 'Test@123');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should handle login error', () => {
    authService.login.and.returnValue(throwError(() => ({ status: 401 })));

    component.username = 'invalid';
    component.password = 'invalid';
    component.login();

    expect(component.loginMessage).toBe('Invalid username or password.');
    expect(component.isLoading).toBeFalse();
  });
});