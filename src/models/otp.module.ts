import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "otps",
})
export default class Otps extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.INTEGER,
    field: "otp"
  })
  otp?: number;

  @Column({
    type: DataType.INTEGER,
    field: "userId"
  })
  userId?: number;

  @Column({
    type: DataType.BOOLEAN,
    field: "active"
  })
  active?: boolean;
}
