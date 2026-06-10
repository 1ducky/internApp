import { useEffect, useState } from "react";

// Ganti baris ini:
export default function useIsDarkTheme() {
    const [isDark, setIsDark] = useState(() =>
        typeof window !== "undefined"
            ? document.documentElement.classList.contains("dark")
            : false
    );

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });

        return () => observer.disconnect();
    }, []);

    return isDark;
}

