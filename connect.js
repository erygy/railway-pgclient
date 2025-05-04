const fs = require("fs");
const { exec } = require("child_process");

const QUERY = `
  SELECT *
    FROM (
      SELECT document, metadata, -- toutes les colonnes sauf embedding
             -- remplacez 'content' par le bon nom si nécessaire
             COALESCE(page_content, content, '') AS chunk_text
      FROM langchain_pg_embedding
      ORDER BY RANDOM()
      LIMIT 2
    ) sub;
`;

exec(
  `PGPASSWORD="DZTWANW7JG6EN6FF" \
   psql -h vectordb -U postgres -d railway \
      --no-align --tuples-only \
      -c "${QUERY.replace(/\n/g, ' ')}"`,
  { maxBuffer: 1024 * 500 }, // 500 Ko max
  (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ Erreur psql : ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ stderr : ${stderr}`);
    }
    fs.writeFileSync("/tmp/chunks.txt", stdout);
    console.log("✅ Écrit 2 chunks dans /tmp/chunks.txt");
  }
);
