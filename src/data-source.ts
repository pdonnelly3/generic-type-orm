import "reflect-metadata"
import { DataSource } from "typeorm"
import { OperationOne, OperationTwo } from "./entity/Operation"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: "all",
    entities: [OperationOne, OperationTwo],
    migrations: [],
    subscribers: [],
})
