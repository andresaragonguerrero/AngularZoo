import { Injectable, signal } from "@angular/core";

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })

export class ThemeService {
    currentTheme = signal<Theme>('light');

    constructor() {
        this.applyTheme(this.currentTheme());
    }

    private applyTheme(theme: Theme) {
        const root = document.documentElement;

        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme: Theme) {
        this.currentTheme.set(theme);
        this.applyTheme(theme);
    }

    getTheme() {
        return this.currentTheme();
    }
}