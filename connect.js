const { exec } = require("child_process");

// Nombre de chunks à tirer au sort
const LIMIT = 2;

// Requête SQL : uniquement document + metadata (ajuste si besoin)
const SQL = `
  SELECT document, metadata
    FROM langchain_pg_embedding
   ORDER BY RANDOM()
   LIMIT ${LIMIT};
`;

// Commande shell complète
const cmd = `
  PGPASSWORD="DZTWANW7JG6EN6FF" \
  psql -h vectordb -U postgres -d railway \
    --no-align --tuples-only \
    -c "${SQL.replace(/\n/g, ' ')}" \
  > /tmp/chunks.txt
`;

// Exécution
exec(cmd, { shell: true, maxBuffer: 1024 * 500 }, (err, _stdout, stderr) => {
  if (err) {
    console.error(`❌ Erreur psql : ${err.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️ stderr : ${stderr}`);
  }
  console.log("✅ Écrit 2 chunks dans /tmp/chunks.txt");
});
