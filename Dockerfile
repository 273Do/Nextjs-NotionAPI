
FROM node

WORKDIR /app

RUN npm install -g npm@latest
RUN npm install -g bun