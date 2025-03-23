import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

export abstract class BaseOperation<State> {
    @PrimaryGeneratedColumn()
    id: number

    @Column("int")
    status: number

    abstract state: State
}

class OperationOneState {
    @Column("int")
    value: number;
}

@Entity()
export class OperationOne extends BaseOperation<OperationOneState> {
    @Column(() => OperationOneState)
    override state: OperationOneState;
}


class OperationTwoState {
    @Column("date")
    date: Date;
}

@Entity()
export class OperationTwo extends BaseOperation<OperationTwoState> {
    @Column(() => OperationTwoState)
    override state: OperationTwoState;
}
