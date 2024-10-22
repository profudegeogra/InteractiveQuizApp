// src/app/layout.tsx
import './globals.css'; // Importă stilurile globale
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                {/* Aici poți adăuga meta tag-uri sau link-uri CSS globale */}
                <title>Quiz App</title>
            </head>
            <body>
                {children} {/* Acesta este conținutul paginii care se încarcă */}
            </body>
        </html>
    );
}
