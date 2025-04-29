// needs
// 1 - use query builder for inserts and some
// 2 - use ORM for custom queries

import { DataSource, EntityTarget } from "typeorm";
import { BaseOperation, OperationOne, OperationOneState, OperationTwo, OperationTwoState } from "./entity/Operation";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { AppDataSource } from "./data-source";


// options
// 1 - use custom repository
// 2 - just wrap around
// 3 - entity manager

class SchedulerRepository<State, Operation extends BaseOperation<State>, Table extends EntityTarget<Operation>> {
    private readonly datasource: DataSource;
    constructor(private readonly table: Table, private readonly stateColumns: ((keyof State) & string)[]) {
        this.datasource = AppDataSource;
    }

    async schedule(operation: Operation) {
        const subQuery = this.datasource.getRepository(this.table)
            .createQueryBuilder("operation")
            .select(this.stateColumns);

        return this.datasource.manager.getRepository(this.table).save(operation);
    }

    async rawSchedule(operation: QueryDeepPartialEntity<Operation>) {
        const subQuery = this.datasource.getRepository(this.table)
            .createQueryBuilder("operation")
            .select(this.stateColumns);

        console.log("before insert");
        return this.datasource.createQueryBuilder()
            .insert()
            .into(this.table)
            .values([operation].map((op) => ({...op, updatedAt: new Date()}))).execute();

    }
}

class Scheduler<State, Operation extends BaseOperation<State>, Table extends EntityTarget<Operation>> {
    private readonly repo: SchedulerRepository<State, Operation, Table>;

    constructor(table: Table, stateColumns: ((keyof State) & string)[]) {
        this.repo = new SchedulerRepository(table, stateColumns);
    }

    async schedule(operation: Operation) {
        return this.repo.schedule(operation);
    }

    async rawSchedule(operation: QueryDeepPartialEntity<Operation>) {
        return this.repo.rawSchedule(operation);
    }
}

export async function query() {
    const stateColumns: (keyof OperationOneState)[] = ["value"];
    const oneScheduler = new Scheduler<OperationOneState, OperationOne, EntityTarget<OperationOne>>(OperationOne, stateColumns);

    const operation = new OperationOne();
    operation.state = {
        value: 1,
    }
    operation.status = 2;
    return oneScheduler.schedule(operation);
}

export async function queryTwo() {
    const stateColumns: (keyof OperationTwoState)[] = ["date"];
    const oneScheduler = new Scheduler<OperationTwoState, OperationTwo, EntityTarget<OperationTwo>>(OperationTwo, stateColumns);

    const operation = new OperationTwo();
    operation.state = {
        date: new Date(),
    }
    operation.status = 2;
    await oneScheduler.schedule(operation);
    return oneScheduler.rawSchedule({ state: { date: "asdf" }, status: 2 });
}

