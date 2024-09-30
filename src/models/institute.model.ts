import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: "institutes",
})
export default class Institutes extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
    })
    id?: number;

    @Column({
        type: DataType.STRING(255),
        field: "name",
    })
    name?: string;

    @Column({
        type: DataType.ENUM('school', 'college'),
        field: "institute_type",
    })
    institute_type?: 'school' | 'college';

    @Column({
        type: DataType.BOOLEAN,
        field: "active"
    })
    active?: boolean;
}
