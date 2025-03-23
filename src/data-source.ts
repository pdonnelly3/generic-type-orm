import "reflect-metadata"
import { DataSource } from "typeorm"
import { OperationOne, OperationTwo, BaseOperation } from "./entity/Operation"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [OperationOne, OperationTwo, BaseOperation],
    migrations: [],
    subscribers: [],
})
