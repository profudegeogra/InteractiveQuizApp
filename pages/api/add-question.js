import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
    if (req.method === 'POST') {
        const filePath = path.join(process.cwd(), 'public', 'questions.json');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Unable to read questions file' });
            }

            const jsonData = JSON.parse(data);
            const newQuestion = req.body;

            // Găsește categoria în care să adauge întrebarea
            const categoryToUpdate = jsonData.categories.find(category => category.name === newQuestion.category);

            if (categoryToUpdate) {
                // Adaugă întrebarea nouă în categoria găsită
                categoryToUpdate.quizzes[0].questions.push(newQuestion);
                
                // Scrie înapoi fișierul JSON
                fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
                    if (err) {
                        return res.status(500).json({ error: 'Unable to save question' });
                    }
                    res.status(201).json({ message: 'Question added successfully!' });
                });
            } else {
                res.status(400).json({ error: 'Category not found' });
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
