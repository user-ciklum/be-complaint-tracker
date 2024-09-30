import { Op } from "sequelize";
import Institute from "../models/institute.model";

interface IInstituteRepository {
    save(institute: Institute): Promise<Institute>;
    retrieveAll(searchParams: { name?: string; status?: string }): Promise<Institute[]>;
    retrieveById(instituteId: number): Promise<Institute | null>;
    update(institute: Institute): Promise<number>;
    delete(instituteId: number): Promise<number>;
    deleteAll(): Promise<number>;
}

interface SearchCondition {
    [key: string]: any;
}

class InstituteRepository implements IInstituteRepository {
    async save(institute: Institute): Promise<Institute> {
        try {
            return await Institute.create({
                name: institute.name,
                institute_type: institute.institute_type,
                active: institute.active,
            });
        } catch (err) {
            throw new Error("Failed to create Institute!");
        }
    }

    async retrieveAll(searchParams: { name?: string; status?: string }): Promise<Institute[]> {
        try {
            let condition: SearchCondition = {};

            if (searchParams?.status) condition.status = searchParams.status;

            if (searchParams?.name) condition.name = { [Op.like]: `%${searchParams.name}%` };

            return await Institute.findAll({ where: condition });
        } catch (error) {
            throw new Error("Failed to retrieve Institutes!");
        }
    }

    async retrieveById(instituteId: number): Promise<Institute | null> {
        try {
            return await Institute.findByPk(instituteId);
        } catch (error) {
            throw new Error("Failed to retrieve Institute!");
        }
    }

    async update(institute: Institute): Promise<number> {
        const { id, name, institute_type, active } = institute;

        try {
            const affectedRows = await Institute.update(
                { name, institute_type, active },
                { where: { id: id } }
            );

            return affectedRows[0];
        } catch (error) {
            throw new Error("Failed to update Institute!");
        }
    }

    async delete(instituteId: number): Promise<number> {
        try {
            const affectedRows = await Institute.destroy({ where: { id: instituteId } });

            return affectedRows;
        } catch (error) {
            throw new Error("Failed to delete Institute!");
        }
    }

    async deleteAll(): Promise<number> {
        try {
            return Institute.destroy({
                where: {},
                truncate: false,
            });
        } catch (error) {
            throw new Error("Failed to delete Institutes!");
        }
    }
}

export default new InstituteRepository();
