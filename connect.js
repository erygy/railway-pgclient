const { exec } = require("child_process");

exec(
  `PGPASSWORD="DZTWANW7JG6EN6FF" psql -h vectordb -U postgres -d railway -c "SELECT * FROM langchain_pg_embedding ORDER BY RANDOM() LIMIT 5;"`,
  { maxBuffer: 1024 * 5000 },
  (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Erreur : ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ stderr : ${stderr}`);
    }
    console.log(`📦 Données complètes de 5 chunks aléatoires :\n${stdout.trim()}`);
  }
);
