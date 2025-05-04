const { exec } = require("child_process");

exec(
  `PGPASSWORD="DZTWANW7JG6EN6FF" psql -h vectordb -U postgres -d railway -c "SELECT DISTINCT document FROM langchain_pg_embedding;"`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Erreur : ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ stderr : ${stderr}`);
    }
    console.log(`📂 Documents indexés (file_id) :\n${stdout}`);
  }
);
