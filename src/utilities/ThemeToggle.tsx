import { useState, useEffect } from 'react';
import { MoonIcon } from '@/components/ui/moon';;
import { SunIcon } from '@/components/ui/sun';;


export function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark' ||
            (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    // Update theme when state changes
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <button
            type="button"
            className="rounded-md p-2 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => setIsDark(!isDark)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDark ? <SunIcon className=" p-0" size={25} /> :<MoonIcon className=" p-0" size={25} />}
        </button>
    );
}