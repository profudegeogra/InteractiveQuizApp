// app/page.tsx
import Link from 'next/link';

export default function Home() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1 style={{ color: '#0070f3' }}>Bine ai venit la Quiz App!</h1>
            <p>Te rog selectează o categorie:</p><br></br>
            <Link href="/categories" style={{ color: 'white', backgroundColor: '#0070f3', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px' }}>
                Vezi Categorii
            </Link>
        </div>
    );
}
