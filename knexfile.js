module.exports = {

  development: {
    client: "postgresql",
    connection: {
      host: "192.168.2.102",
      user: "postgres",
      password: "postgres",
      database: "chat_api_server_dev",
      port: 5432
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: "./test/testDB.sqlite"
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: "postgresql",
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      port: 5432
    },
    migrations: {
      tableName: "knex_migrations"
    },
    pool: {
      min: 2,
      max: 100
    }
  }

};
