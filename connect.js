const { exec } = require("child_process");

const cmd = `
  PGPASSWORD="DZTWANW7JG6EN6FF" \
  psql -h vectordb -U postgres -d railway \
    --no-align --tuples-only \
    -c "COPY (SELECT * FROM langchain_pg_embedding ORDER BY RANDOM() LIMIT 2) TO STDOUT WITH CSV HEADER;"
`;

exec(cmd, { shell: "/bin/sh", maxBuffer: 1024 * 5000 }, (err, stdout, stderr) => {
  if (err) {
    console.error(`❌ psql Command failed: ${err.message}`);
    if (stderr) console.error(stderr);
    return;
  }
  if (stderr) {
    console.error(`⚠️ stderr: ${stderr}`);
  }
  console.log("📦 2 chunks CSV :\n" + stdout.trim());
});
