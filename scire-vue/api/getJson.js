export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ message: 'Funzione serverless funzionante' });
};