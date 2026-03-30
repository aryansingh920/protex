FROM node:22-bookworm-slim

WORKDIR /app

COPY api/package*.json ./
RUN npm install

COPY api/ ./
COPY database/ ./database/

EXPOSE 8080

CMD ["npx", "tsx", "src/server.ts"]
