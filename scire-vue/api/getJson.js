import fetch from 'node-fetch';

export default async (req, res) => {
  try {
    console.log("Inizio richiesta a scienzainrete");
    const response = await fetch('https://www.scienzainrete.it/json', {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log("Stato della risposta:", response.status);

    if (!response.ok) {
      throw new Error(`Errore nella richiesta a scienzainrete: ${response.status}`);
    }

    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    console.error("Errore nella funzione serverless:", error);
    res.status(500).json({ error: 'Errore nel recupero dei dati JSON', details: error.message });
  }
};
