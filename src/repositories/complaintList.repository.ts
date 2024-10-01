import { Op } from "sequelize";
import ComplaintList from "../models/compaintList.model";

interface IComplaintListRepository {
  save(complaintList: ComplaintList): Promise<ComplaintList>;
  retrieveAll(searchParams: ComplaintList): Promise<ComplaintList[]>;
  retrieveById(complaintId: number): Promise<ComplaintList | null>;
  update(complaintList: ComplaintList): Promise<number>;
  delete(complaintId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

class ComplaintListRepository implements IComplaintListRepository {
  async save(complaintList: ComplaintList): Promise<ComplaintList> {
    try {
      return await ComplaintList.create({
        inistituteType: complaintList.inistituteType,
        complaintType: complaintList.complaintType,
        complaintOn: complaintList.complaintOn,
        subType: complaintList.subType,
        description: complaintList.description,
        assignedTo: complaintList.assignedTo,
        resolution: complaintList.resolution,
        remainder: complaintList.remainder,
        criticality: complaintList.criticality,
        createdBy: complaintList.createdBy,
        updatedBy: complaintList.updatedBy

      });
    } catch (err) {
      throw new Error("Failed to create ComplaintList!");
    }
  }

  async retrieveAll(searchParams: Partial<ComplaintList>): Promise<ComplaintList[]> {
    try {
      let condition: SearchCondition = {};

      // Dynamically build search conditions based on searchParams
      Object.keys(searchParams).forEach((key) => {
        const value = (searchParams as any)[key];

        // Skip undefined or null values
        if (value !== undefined && value !== null) {
          if (typeof value === 'string') {
            // Use partial match for string fields
            condition[key] = { [Op.like]: `%${value}%` };
          } else {
            // Direct match for non-string fields (boolean, integers, etc.)
            condition[key] = value;
          }
        }
      });

      return await ComplaintList.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve ComplaintList!");
    }
  }

  async retrieveById(complaintId: number): Promise<ComplaintList | null> {
    try {
      return await ComplaintList.findByPk(complaintId);
    } catch (error) {
      throw new Error("Failed to retrieve Complaint!");
    }
  }

  async update(complaintList: ComplaintList): Promise<number> {
    const {
      id,
      inistituteType,
      complaintType,
      complaintOn,
      subType,
      description,
      assignedTo,
      resolution,
      remainder,
      criticality,
      createdBy,
      updatedBy
    } = complaintList;

    try {
      const affectedRows = await ComplaintList.update(
        {
          id,
          inistituteType,
          complaintType,
          complaintOn,
          subType,
          description,
          assignedTo,
          resolution,
          remainder,
          criticality,
          createdBy,
          updatedBy
        },
        { where: { id: id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update ComplaintList!");
    }
  }

  async delete(complaintId: number): Promise<number> {
    try {
      const affectedRows = await ComplaintList.destroy({ where: { id: complaintId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete ComplaintList!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return ComplaintList.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete ComplaintList!");
    }
  }
}

export default new ComplaintListRepository();
