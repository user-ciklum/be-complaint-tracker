import { Op } from "sequelize";
import Users from "../models/users.model";
import Otps from "../models/otp.module";

interface IUsersRepository {
  save(users: Users): Promise<Users>;
  retrieveAll(searchParams: { name: string, active: boolean }): Promise<Users[]>;
  retrieveByMobileNumber(searchParams: { name: string, active: boolean }): Promise<Users | null>;
  retrieveById(usersId: number): Promise<Users | null>;
  update(users: Users): Promise<number>;
  delete(usersId: number): Promise<number>;
  deleteAll(): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

class UsersRepository implements IUsersRepository {
  async save(users: Users): Promise<Users> {
    try {
      return await Users.create({
        name: users.name,
        mobilenumber: users.mobilenumber,
        role: users.role,
        active: users.active
      });
    } catch (err) {
      throw new Error("Failed to create Users!");
    }
  }

  async retrieveAll(searchParams: { name?: string, active?: boolean }): Promise<Users[]> {
    try {
      let condition: SearchCondition = {};

      if (searchParams?.active) condition.active = true;

      if (searchParams?.name)
        condition.title = { [Op.like]: `%${searchParams.active}%` };

      return await Users.findAll({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve Userss!");
    }
  }

  async retrieveByMobileNumber(searchParams: { mobilenumber?: string, active?: boolean }): Promise<Users | null> {
    try {
      let condition: SearchCondition = {};

      // If active is provided in the searchParams, set condition.active
      if (searchParams?.active !== undefined) {
        condition.active = searchParams.active;
      }

      // If mobilenumber is provided in the searchParams, set condition.mobilenumber
      if (searchParams?.mobilenumber) {
        condition.mobilenumber = searchParams.mobilenumber;
      }

      console.log("condition", condition);
      const users = await Users.findOne({ where: condition });
      console.log("user1", users?.get());
      return users?.get();
    } catch (error) {
      console.log("err1", error)
      throw new Error("Failed to retrieve Users!");
    }
  }

  async retrieveById(usersId: number): Promise<Users | null> {
    try {
      return await Users.findByPk(usersId);
    } catch (error) {
      throw new Error("Failed to retrieve Userss!");
    }
  }

  async update(users: Users): Promise<number> {
    const { id, name, mobilenumber, role, active } = users;

    try {
      const affectedRows = await Users.update(
        { name, mobilenumber, role, active },
        { where: { id: id } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update Users!");
    }
  }

  async delete(usersId: number): Promise<number> {
    try {
      const affectedRows = await Users.destroy({ where: { id: usersId } });

      return affectedRows;
    } catch (error) {
      throw new Error("Failed to delete Users!");
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return Users.destroy({
        where: {},
        truncate: false
      });
    } catch (error) {
      throw new Error("Failed to delete Userss!");
    }
  }
}

export default new UsersRepository();
