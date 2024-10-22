
"use client"
import AddQuestionForm from '../components/AddQuestionForm'; // Importă componenta
import Link from 'next/link';
import React from 'react';
import QuestionsComponent from '../components/QuestionsComponent'; 
import QuizApp from '../../QuizApp'; // Asigură-te că calea este corectă
import styles from './page.module.css'; // CSS pentru stilizarea paginii
export default function Home() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1 style={{ color: '#0070f3' }}>Bine ai venit la Quiz App!</h1>

            <p>Te rog selectează o categorie:</p>
            <br />
            <Link href="/categories" style={{ color: 'white', backgroundColor: '#0070f3', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px' }}>
                Vezi Categorii
            </Link>


          
        </div>


    );
}
