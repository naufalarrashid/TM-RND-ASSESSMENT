// ===== TM R&D ASSESSMENT - AUTH SERVICE UNIT TESTS =====
/*
 * Author: Naufal Arrashid
 * Project: TM R&D Assessment
 * Description: Unit tests for authentication service
 */

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully with valid credentials', () => {
    const mockResponse = {
      success: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test',
      tokenExpiry: '1hr'
    };

    service.login('dummyUser', 'Test@123').subscribe(response => {
      expect(response.token).toBe(mockResponse.token);
      expect(response.tokenExpiry).toBe(mockResponse.tokenExpiry);
    });

    const req = httpMock.expectOne('https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/auth');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle login failure', () => {
    service.login('invalid', 'invalid').subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.status).toBe(401);
      }
    });

    const req = httpMock.expectOne('https://intermediate-test-v-2-web-test.apps.ocp.tmrnd.com.my/api/auth');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });

  it('should return false when no token exists', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should return true when valid token exists', () => {
    localStorage.setItem('token', 'test-token-123');
    localStorage.setItem('tokenExpiry', new Date(Date.now() + 3600000).toISOString());
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should logout and clear localStorage', () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('tokenExpiry', '2025-12-31T23:59:59.999Z');
    
    service.logout();
    
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('tokenExpiry')).toBeNull();
  });
});
