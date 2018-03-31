>&2 echo "In entrypoint.sh, installing knex"
npm install -g knex
>&2 echo "Installed knex successfully..."
knex migrate:latest --env=production
>&2 echo "Migrated database..."
knex seed:run --env=production
>&2 echo "Seeded database..."
NODE_ENV=production npm start
