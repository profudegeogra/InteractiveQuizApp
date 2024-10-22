import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
    // Setează calea către fișierul JSON din folderul public
    const filePath = path.join(process.cwd(), 'public', 'questions.json');

    // Citește fișierul JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Unable to read questions file' });
            return;
        }

        // Trimite răspunsul
        res.status(200).json(JSON.parse(data));
    });
}
