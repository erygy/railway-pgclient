#FROM node:18

WORKDIR /app

COPY connect.js .

RUN apt update && apt install -y postgresql-client

#CMD ["node", "connect.js"]


FROM postgres:16

CMD ["sleep", "infinity"]
