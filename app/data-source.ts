import { DataSource } from "typeorm";
import User from "./entity/user";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  synchronize: true,
  logging: false,
  entities: [User],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

export default AppDataSource;