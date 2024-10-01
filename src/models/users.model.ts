import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "users",
})
export default class Users extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id",
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    unique: true,
    field: "username",
  })
  username?: string;

  @Column({
    type: DataType.STRING(255),
    field: "password",
  })
  password?: string;

  @Column({
    type: DataType.STRING(255),
    field: "name",
  })
  name?: string;

  @Column({
    type: DataType.ENUM('student', 'teacher', 'management'),
    field: "role",
  })
  role?: 'student' | 'teacher' | 'management';

  @Column({
    type: DataType.ENUM('school', 'college'),
    field: "institute_type",
  })
  institute_type?: 'school' | 'college';

  @Column({
    type: DataType.STRING(255),
    field: "institute_id",  // Corrected from "mobilenumber"
  })
  institute_id?: string;

  @Column({
    type: DataType.STRING(255),
    field: "mobilenumber",
  })
  mobilenumber?: string;

  @Column({
    type: DataType.BOOLEAN,
    field: "active",
  })
  active?: boolean;

  @Column({
    type: DataType.JSON,  // Use JSON to store arrays in MySQL
    field: "class",
  })
  class?: string[];
}
