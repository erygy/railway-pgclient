const { exec } = require("child_process");

const FILE_ID = "3900470b-078d-4610-bf71-ef175d51716e";

const cmd = `
  PGPASSWORD="DZTWANW7JG6EN6FF" \
  psql -h vectordb -U postgres -d railway \
    --no-align --tuples-only \
    -c "COPY (SELECT * FROM langchain_pg_embedding WHERE document = '${FILE_ID}') TO STDOUT WITH CSV HEADER;"
`;

exec(cmd, { shell: "/bin/sh", maxBuffer: 1024 * 5000 }, (err, stdout, stderr) => {
  if (err) {
    console.error(`❌ psql failed: ${err.message}`);
    if (stderr) console.error(stderr);
    return;
  }
  console.log(`📦 Chunks pour ${FILE_ID} :\n` + stdout);
});
