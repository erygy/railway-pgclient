const { exec } = require("child_process");

exec(
  `PGPASSWORD="DZTWANW7JG6EN6FF" psql -h vectordb -U postgres -d railway --tuples-only --no-align -c "SELECT id, document, metadata, embedding FROM langchain_pg_embedding ORDER BY RANDOM() LIMIT 5;"`,
  { maxBuffer: 1024 * 2000 }, // large buffer
  (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Erreur : ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ stderr : ${stderr}`);
    }
    console.log(`🧩 5 chunks aléatoires :\n${stdout.trim()}`);
  }
);
