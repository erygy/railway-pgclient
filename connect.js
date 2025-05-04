const { exec } = require("child_process");

// — 2 chunks aléatoires sans la colonne embedding —
const SQL = `
  SELECT document, cmetadata, 
         COALESCE(page_content, content, '') AS chunk_text
  FROM langchain_pg_embedding
  ORDER BY RANDOM()
  LIMIT 2;
`.replace(/\s+/g, ' ');   // one‑liner pour psql

const cmd = [
  'PGPASSWORD="DZTWANW7JG6EN6FF"',
  'psql -h vectordb -U postgres -d railway',
  '--no-align --tuples-only',
  `-c "${SQL}"`
].join(' ');

exec(cmd, { shell: '/bin/sh', maxBuffer: 1024 * 500 }, (err, out, err2) => {
  if (err) return console.error('❌ psql', err.message);
  if (err2) console.error('⚠️ stderr', err2);
  console.log('🧩 2 chunks :\n' + out.trim());
});
