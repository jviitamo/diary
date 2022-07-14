const credentials = {
    user: process.env.POSTGRES_USER,
    host: process.env.HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.PGPORT,
  };

module.exports = credentials
