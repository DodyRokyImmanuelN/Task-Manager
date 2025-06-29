import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            animation: {
                "fade-in": "fadeIn 0.2s ease-in-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: 0, transform: "translateY(-0.25rem)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
            },
        },
    },

    plugins: [forms],
};
