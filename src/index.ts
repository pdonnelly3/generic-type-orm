import { AppDataSource } from "./data-source"
import { OperationOne, OperationTwo, } from "./entity/Operation"

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

    const operationsTwo = await AppDataSource.manager.find(OperationOne)
    console.log("Loaded operation two: ", operationsTwo)

}).catch(error => console.log(error))
