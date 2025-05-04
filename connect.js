const { exec } = require("child_process");

const cmd = `
  PGPASSWORD="DZTWANW7JG6EN6FF" \
  psql -h vectordb -U postgres -d railway \
    -c "COPY (SELECT * FROM langchain_pg_embedding ORDER BY RANDOM() LIMIT 2) \
       TO '/tmp/chunks_raw.csv' \
       WITH CSV HEADER;"
`;

exec(cmd, { shell: "/bin/sh", maxBuffer: 1024 * 500 }, (err, _out, stderr) => {
  if (err) {
    console.error(`❌ psql Command failed: ${err.message}`);
    console.error(stderr);
    return;
  }
  console.log("✅ Dump brut écrit dans /tmp/chunks_raw.csv");
});
