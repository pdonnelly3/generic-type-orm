import { EntitySchema } from "typeorm";

export const SchemaOperation = new EntitySchema({
    name: 'SchemaOperation',
    columns: {
        id: {
            type: 'int',
            primary: true,
        }
    }
})
