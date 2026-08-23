import { sql } from '@vercel/postgres';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    const cvsColumns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'cvs'
    `;

    const usersColumns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'cv_users'
    `;

    return res.status(200).json({
      tables: tables.rows,
      cvsColumns: cvsColumns.rows,
      usersColumns: usersColumns.rows
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
