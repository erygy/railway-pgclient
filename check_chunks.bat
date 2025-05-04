@echo off
set FILE_ID=eaa56126-3648-4438-aa56-ac06c46ebe85
set PGPASSWORD=DZTWANW7JG6EN6FF

echo Vérification des chunks pour le document : %FILE_ID%
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -h nozomi.proxy.rlwy.net -p 45976 -U postgres -d railway -c "SELECT COUNT(*) FROM langchain_pg_embedding WHERE document = '%FILE_ID%';"

pause
