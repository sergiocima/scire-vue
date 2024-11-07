import fetch from 'node-fetch';

export default async (req, res) => {
  try {
    // Effettua la richiesta all'endpoint JSON esterno
    const response = await fetch('https://www.scienzainrete.it/json');
    const data = await response.json();

    // Imposta l'header CORS per permettere l'accesso dalla tua app Vue
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Invia i dati alla tua applicazione
    res.status(200).json(data);
  } catch (error) {
    console.error("Errore nella funzione serverless:", error);
    res.status(500).json({ error: 'Errore nel recupero dei dati JSON', details: error.message });
  }
};
