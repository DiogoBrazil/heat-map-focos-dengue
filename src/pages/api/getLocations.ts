import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

// URL de conexão
const connectionString = process.env.DATABASE_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();

    const result = await client.query(`
      SELECT 
        location::text, 
        quantity
      FROM detections;
    `);

    const formattedResults = result.rows.map((row: any) => {
      let location = row.location.replace(/[{}]/g, '').split(',');
      return [
        parseFloat(location[0]),
        parseFloat(location[1]),
        parseInt(row.quantity, 10)
      ];
    });
    res.status(200).json(formattedResults);
  } catch (err) {
    console.error('Erro ao executar a query', err);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  } finally {
    await client.end();
  }
};