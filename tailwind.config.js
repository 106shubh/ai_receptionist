/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                chat: {
                    user: "hsl(var(--chat-user-bg))",
                    "user-foreground": "hsl(var(--chat-user-fg))",
                    assistant: "hsl(var(--chat-assistant-bg))",
                    "assistant-foreground": "hsl(var(--chat-assistant-fg))",
                    input: "hsl(var(--chat-input-bg))",
                }
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                serif: ["Playfair Display", "serif"],
                sans: ["DM Sans", "sans-serif"],
            },
            backgroundImage: {
                'gradient-hero': 'var(--gradient-hero)',
                'gradient-accent': 'var(--gradient-accent)',
                'gradient-soft': 'var(--gradient-soft)',
            },
            boxShadow: {
                'soft': 'var(--shadow-soft)',
                'card': 'var(--shadow-card)',
                'elevated': 'var(--shadow-elevated)',
                'glow': 'var(--shadow-glow)',
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "message-slide-in": {
                    from: { opacity: "0", transform: "translateY(12px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "typing-dot": {
                    "0%, 60%, 100%": { transform: "translateY(0)", opacity: "0.4" },
                    "30%": { transform: "translateY(-4px)", opacity: "1" },
                },
                "pulse-soft": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.6" },
                },
                "fade-in": {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "message-in": "message-slide-in 0.3s ease-out forwards",
                "typing-dot": "typing-dot 1.4s ease-in-out infinite",
                "typing-dot-delay-1": "typing-dot 1.4s ease-in-out 0.2s infinite",
                "typing-dot-delay-2": "typing-dot 1.4s ease-in-out 0.4s infinite",
                "pulse-soft": "pulse-soft 2s ease-in-out infinite",
                "fade-in": "fade-in 0.5s ease-out forwards",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
