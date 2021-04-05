import knex from "knex";
import path from "path";

const connection = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "dev.sqlite"),
  },
  migrations: {
    directory: path.resolve(__dirname, "migrations"),
  },
  useNullAsDefault: true,
});

export default connection;
