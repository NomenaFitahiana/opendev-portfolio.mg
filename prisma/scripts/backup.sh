#!/bin/bash
# Script de sauvegarde de la base de données

echo "💾 Sauvegarde de la base de données..."

BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.sql"

mkdir -p $BACKUP_DIR

# Utiliser pg_dump pour PostgreSQL
pg_dump $DATABASE_URL > $BACKUP_FILE

echo "✅ Sauvegarde créée : $BACKUP_FILE"
