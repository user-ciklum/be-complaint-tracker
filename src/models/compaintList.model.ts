import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "complaintlist",
})
export default class ComplaintList extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.STRING(255),
    field: "inistituteId"
  })
  inistituteId?: string;
  
  @Column({
    type: DataType.STRING(255),
    field: "inistituteType"
  })
  inistituteType?: string;

  @Column({
    type: DataType.STRING(255),
    field: "complaintType"
  })
  complaintType?: string;

  @Column({
    type: DataType.STRING(255),
    field: "categoryType"
  })
  categoryType?: string;

  @Column({
    type: DataType.STRING(255),
    field: "complaintOn"
  })
  complaintOn?: string;

  @Column({
    type: DataType.STRING(255),
    field: "assignedType"
  })
  assignedType?: string;

  @Column({
    type: DataType.STRING(255),
    field: "assignedTo"
  })
  assignedTo?: string;

  @Column({
    type: DataType.STRING(255),
    field: "resolution"
  })
  resolution?: string;

  @Column({
    type: DataType.STRING(255),
    field: "remainder"
  })
  remainder?: string;

  @Column({
    type: DataType.STRING(255),
    field: "criticality"
  })
  criticality?: string;

  @Column({
    type: DataType.STRING(255),
    field: "description"
  })
  description?: string;

  @Column({
    type:  DataType.STRING(255),
    field: "status",
  })
  status?: string;

  @Column({
    type: DataType.INTEGER,
    field: "createdBy"
  })
  createdBy?: string;

  @Column({
    type: DataType.INTEGER,
    field: "updatedBy"
  })
  updatedBy?: string;

  @Column({
    type: DataType.BOOLEAN,
    field: "active"
  })
  active?: boolean;

}
