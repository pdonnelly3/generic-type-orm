// needs
// 1 - use query builder for inserts and some
// 2 - use ORM for custom queries

import { DataSource, EntityTarget, Repository } from "typeorm";
import { BaseOperation, OperationOne, OperationOneState } from "./entity/Operation";


// options
// 1 - use custom repository
// 2 - just wrap around
// 3 - entity manager

class SchedulerRepository<State, Table extends EntityTarget<BaseOperation<State>>> {
    private readonly datasource: DataSource;
    constructor(private readonly table: Table, private readonly stateColumns: ((keyof State) & string)[]) {}

    async schedule(operation: BaseOperation<State>) {
        const results: BaseOperation<State>[] = await this.datasource.getRepository(this.table)
            .createQueryBuilder("operation")
            .select(this.stateColumns)
            .getMany();

        return results;
    }
}

class Scheduler<State, Table extends EntityTarget<BaseOperation<State>>> {
    private readonly repo: SchedulerRepository<State, Table>;

    constructor(table: Table, stateColumns: ((keyof State) & string)[]) {
        this.repo = new SchedulerRepository(table, stateColumns);
    }

    async schedule(operation: BaseOperation<State>) {
        return this.repo.schedule(operation);
    }
}

export async function query() {
    const stateColumns: (keyof OperationOneState)[] = ["value"] as const;
    const oneScheduler = new Scheduler<OperationOneState, EntityTarget<OperationOne>>(OperationOne, stateColumns);

    const results = await oneScheduler.schedule({state: {value: 1}, status: 1, id: 1});


}

