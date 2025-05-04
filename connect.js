const { exec } = require("child_process");

exec(
  `PGPASSWORD="DZTWANW7JG6EN6FF" psql -h vectordb -U postgres -d railway -c "SELECT DISTINCT document FROM langchain_pg_embedding LIMIT 20;"`,
  { maxBuffer: 1024 * 500 }, // sécurité au cas où
  (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Erreur : ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ stderr : ${stderr}`);
    }
    console.log(`📂 20 premiers file_id indexés :\n${stdout}`);
  }
);
