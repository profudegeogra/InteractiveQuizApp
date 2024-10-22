// src/app/categories/page.tsx
"use client"; // Asigură-te că folosești client-side rendering

import AddQuestionForm from '../../components/AddQuestionForm'; // Ajustează calea pentru import
import Link from 'next/link';
import categorii from './categorii.module.css'; // Importă fișierul CSS

const Categories = () => {
    const categories = ['matematica', 'istorie', 'geografie'];

    return (
        <div className={categorii.container}> {/* Adaugă clasa container */}
            <h1>Categorii Disponibile</h1>
            <ul>
                {categories.map((category, index) => (
                    <li className={categorii.li} key={index}>
                        <Link className={categorii.li} href={`/quiz/${category}`}>{category}</Link>
                    </li>
                ))}
            </ul>

            {/* Adaugă formularul pentru a adăuga o întrebare nouă */}
            <div style={{ marginTop: '50px' }}>
                <h2>Adaugă o Întrebare Nouă</h2>
                <AddQuestionForm /> {/* Folosește componenta */}
            </div>

            <Link href="/" className={categorii.li} style={{ display: 'flex', alignItems: 'center', width: '140px' }}>
                <span>&larr;</span> {/* Săgeata spre stânga (←) */}
                <span style={{ marginLeft: '15px' }}>Înapoi la Home</span>
            </Link>
        </div>
    );
}

export default Categories; // Asigură-te că exporți componenta corect
