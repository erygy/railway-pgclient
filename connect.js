const { exec } = require("child_process");

exec(
  `PGPASSWORD="DZTWANW7JG6EN6FF" psql -h vectordb -U postgres -d railway -c "SELECT * FROM langchain_pg_embedding ORDER BY RANDOM() LIMIT 2;"`,
  { maxBuffer: 1024 * 1000 }, // 1 Mo max, ça suffit pour 2 lignes complètes
  (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Erreur : ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ stderr : ${stderr}`);
    }
    console.log(`📦 2 chunks aléatoires (toutes colonnes) :\n${stdout.trim()}`);
  }
);
