import { AppDataSource } from "./data-source"
import { OperationOne, OperationTwo, } from "./entity/Operation"
import { query, queryTwo } from "./repository"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const opOne = new OperationOne()
    opOne.status = 1;
    opOne.state = { value: 1 };

    const opTwo = new OperationTwo()
    opTwo.state = {
        date: new Date()
    };
    opTwo.status = 2;

    await AppDataSource.manager.save(opOne)
    console.log("Saved a new operation with id: " + opOne.id)

    await AppDataSource.manager.save(opTwo)
    console.log("Saved a new operation with id: " + opTwo.id)

    console.log("Loading operations from the database...")
    const operations = await AppDataSource.manager.find(OperationOne)
    console.log("Loaded operation one: ", operations)

    const operationsTwo = await AppDataSource.manager.find(OperationTwo)
    console.log("Loaded operation two: ", operationsTwo)


    const insertOne = await query();
    console.log("Inserted: ", insertOne);
    const insertTwo = await queryTwo()
    console.log("Inserted: ", insertTwo);
    const a = await AppDataSource.manager.find(OperationTwo)
    for (const b of a) {
        console.dir(b.state);
    }

}).catch(error => console.log(error))
