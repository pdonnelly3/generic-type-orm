import "reflect-metadata"
import { DataSource } from "typeorm"
import { OperationOne, OperationTwo } from "./entity/Operation"
import { Init1745347590314 } from "../1745347590314-Init"
import { SchemaOperation } from "./entity/Schema"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: "all",
    entities: [OperationOne, OperationTwo, SchemaOperation],
    migrations: [Init1745347590314],
    subscribers: [],
    migrationsTableName: 'test',
})
