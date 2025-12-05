# Dockerfile para Node.js + TypeScript + ts-node
FROM node:24

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY certs ./certs
RUN apt-get update \
	&& apt-get install -y netcat-openbsd \
	&& rm -rf /var/lib/apt/lists/* \
	&& npm install

COPY ./src ./src

CMD ["npm", "run", "start"]
