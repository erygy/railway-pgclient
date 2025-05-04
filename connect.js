const { exec } = require("child_process");

const FILE_ID = "470622a4-25a3-44b6-b296-0304560a9ba6";

// 1. Vérifie le nombre de chunks
exec(
  `PGPASSWORD="DZTWANW7JG6EN6FF" psql -h vectordb -U postgres -d railway -c "SELECT COUNT(*) FROM langchain_pg_embedding WHERE document = '${FILE_ID}';"`,
  (error1, stdout1, stderr1) => {
    if (error1) {
      console.error(`❌ Erreur lors du comptage : ${error1.message}`);
      return;
    }
    if (stderr1) {
      console.error(`⚠️ stderr (comptage) : ${stderr1}`);
    }
    console.log(`📊 Nombre de chunks :\n${stdout1}`);

    // 2. Affiche les 3 premiers chunks
    exec(
      `PGPASSWORD="DZTWANW7JG6EN6FF" psql -h vectordb -U postgres -d railway -c "SELECT page_content FROM langchain_pg_embedding WHERE document = '${FILE_ID}' LIMIT 3;"`,
      (error2, stdout2, stderr2) => {
        if (error2) {
          console.error(`❌ Erreur lors de l'affichage des contenus : ${error2.message}`);
          return;
        }
        if (stderr2) {
          console.error(`⚠️ stderr (contenu) : ${stderr2}`);
        }
        console.log(`🧩 Premiers chunks :\n${stdout2}`);
      }
    );
  }
);
