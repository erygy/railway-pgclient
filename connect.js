const { exec } = require("child_process");

exec(
  'PGPASSWORD="DZTWANW7JG6EN6FF" psql -h vectordb -U postgres -d railway -c "SELECT COUNT(*) FROM langchain_pg_embedding WHERE document = \'eaa56126-3648-4438-aa56-ac06c46ebe85\';"',
  (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Erreur : ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ stderr : ${stderr}`);
      return;
    }
    console.log(`✅ Résultat :\n${stdout}`);
  }
);
