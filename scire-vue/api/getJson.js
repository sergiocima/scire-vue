import fetch from 'node-fetch';

export default async (req, res) => {
  try {
    const response = await fetch('https://www.scienzainrete.it/json');
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recupero dei dati JSON' });
  }
};
