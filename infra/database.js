import { Client } from "pg";

export async function query(sql) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    pool: {
      min: 1,
      max: 5,
      acquireTimeoutMillis: 60000,
      idleTimeoutMillis: 600000,
    },
  });

  try {
    await client.connect();
    const result = await client.query(sql);
    return result;
  } catch (error) {
    console.error("Error executing query:", error.message);
    throw error;
  } finally {
    await client.end();
  }
}
