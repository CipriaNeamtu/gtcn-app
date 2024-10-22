import { EntitySchema } from "typeorm";

export const MyUser = new EntitySchema({
  name: "User",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
    },
    age: {
      type: "int",
    },
  },
});