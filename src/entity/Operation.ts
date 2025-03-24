import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm"

export abstract class BaseOperation<State> {
    @PrimaryGeneratedColumn()
    id: number

    @Column("int")
    status: number

    @Column("text")
    updatedAt: Date

    abstract state: State

    @BeforeInsert()
    updateDates() {
        console.log("updateDates")
        this.updatedAt = new Date()
    }

}

export class OperationOneState {
    @Column("int")
    value: number;
}

@Entity()
export class OperationOne extends BaseOperation<OperationOneState> {
    @Column(() => OperationOneState)
    override state: OperationOneState;
}

@Entity()
export class OperationTwoState {
    @Column("date")
    date: Date;

    toString() {
        return `OperationTwoState: { date: ${this.date} }`;
    }
}

@Entity()
export class OperationTwo extends BaseOperation<OperationTwoState> {
    @Column(() => OperationTwoState)
    override state: OperationTwoState;
}
