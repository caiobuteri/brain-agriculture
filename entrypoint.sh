#!/bin/sh

echo "📡 Aguardando o banco de dados estar disponível..."

# Aguarda o banco de dados aceitar conexões (pode ajustar host/porta conforme sua env)
until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "⏳ Aguardando conexão com $DB_HOST:$DB_PORT..."
  sleep 2
done

echo "✅ Banco de dados disponível!"

echo "📦 Executando migrations..."
npm run typeorm:prod migration:run

echo "🚀 Iniciando aplicação NestJS..."
node dist/main.js
