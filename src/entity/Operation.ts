import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, Index, getMetadataArgsStorage, EntityOptions, } from "typeorm"

function OperationTable(
    name?: string,
    maybeOptions?: EntityOptions
) {
    return function (
        target
    ) {
        // setup Entity
        Entity(name, maybeOptions)(target);

        const metadata = getMetadataArgsStorage();
        const embededds = metadata.filterEmbeddeds(target);

        // setup Index on state fields
        const state = embededds.find((op) => op.propertyName === 'state');
        if (!state) {
            throw new Error("state is there");
        }
        const stateColumns = metadata.filterColumns(state.type());
        Index(stateColumns.map((i) => `state.${i.propertyName}`))(target);
    }
}


export abstract class BaseOperation<State> {
    @PrimaryGeneratedColumn()
    id: number

    @Column("int")
    status: number

    @Column("text")
    updatedAt: Date

    @BeforeInsert()
    updateDates() {
        console.log("updateDates")
        this.updatedAt = new Date()
    }

    abstract state: State
}

export class OperationOneState {
    @Column("int")
    value: number;
}



@OperationTable()
export class OperationOne extends BaseOperation<OperationOneState> {
    @Column(() => OperationOneState)
    override state: OperationOneState;
}


export class OperationTwoState {
    @Column("date")
    date: Date;

    @Column("text")
    other?: string;
}

@OperationTable()
export class OperationTwo extends BaseOperation<OperationTwoState> {
    @Column(() => OperationTwoState)
    override state: OperationTwoState;
}
