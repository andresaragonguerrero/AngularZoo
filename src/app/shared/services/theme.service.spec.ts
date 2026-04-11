import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);

    Object.defineProperty(document, 'documentElement', {
      value: { classList: { remove: jasmine.createSpy(), add: jasmine.createSpy() } },
      writable: true
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with light theme', () => {
    expect(service.currentTheme()).toBe('light');
  });

  it('should toggle theme from light to dark', () => {
    service.toggleTheme();
    expect(service.currentTheme()).toBe('dark');
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
  });

  it('should toggle theme from dark to light', () => {
    service.setTheme('dark');
    service.toggleTheme();
    expect(service.currentTheme()).toBe('light');
  });

  it('should set theme correctly', () => {
    service.setTheme('dark');
    expect(service.currentTheme()).toBe('dark');
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
  });

  it('should get current theme', () => {
    expect(service.getTheme()).toBe('light');
    service.setTheme('dark');
    expect(service.getTheme()).toBe('dark');
  });

  it('should remove previous theme class when applying new theme', () => {
    service.setTheme('dark');
    expect(document.documentElement.classList.remove).toHaveBeenCalledWith('light', 'dark');
    expect(document.documentElement.classList.add).toHaveBeenCalledWith('dark');
  });
});
