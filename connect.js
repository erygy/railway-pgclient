const { exec } = require("child_process");

const FILE_ID = "e42cf316-f7e4-418c-a1b5-3b5b7ca7c747";

const cmd = `
  PGPASSWORD="DZTWANW7JG6EN6FF" \
  psql -h vectordb -U postgres -d railway \
    --no-align --tuples-only \
    -c "COPY (
          SELECT * 
            FROM langchain_pg_embedding 
           WHERE custom_id = '${FILE_ID}' 
              OR document  = '${FILE_ID}'
         ) TO STDOUT WITH CSV HEADER;"
`;

exec(cmd, { shell: "/bin/sh", maxBuffer: 1024 * 5000 }, (err, stdout, stderr) => {
  if (err) {
    console.error(`❌ psql failed: ${err.message}`);
    if (stderr) console.error(stderr);
    return;
  }
  console.log(`📦 Chunks for ${FILE_ID} :\n` + stdout.trim());
});
