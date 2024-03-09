import { query } from "../../../../../infra/database";
import { NextResponse } from "next/server";

export async function GET() {
  const dbName = process.env.POSTGRES_DB;
  const version = await query("SHOW server_version;");
  const maxConnections = await query("show max_connections;");
  const usedConnections = await query({
    text: "Select * from pg_stat_activity WHERE datname=$1;",
    values: [dbName],
  });

  return NextResponse.json({
    version: version.rows[0].server_version,
    max_connections: maxConnections.rows[0].max_connections,
    used_connections: usedConnections.rowCount,
  });
}
