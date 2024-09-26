import { Op } from "sequelize";
import Users from "../models/users.model";
import Otps from "../models/otp.module";

interface IOtpsRepository {
  save(opts: any): Promise<Otps>;
  retrieveOtpByUserId(searchParams: {otp: string, active: boolean}): Promise<Otps | null>;
  verifyOtp(searchParams: {otp: string, userId: string}): Promise<Otps | null>;
 // update(otps: Otps): Promise<number>;
  delete(usersId: number): Promise<number>;
}

interface SearchCondition {
  [key: string]: any;
}

class OtpsRepository implements IOtpsRepository {
 
  async save(otps: any): Promise<Otps> {
    try {
      console.log("otps123",otps)
      return await Otps.create({
        otp: otps.otp,
        userId: otps.userId,
        active: otps.active
      });
    } catch (err) {
      throw new Error("Failed to create Otps!");
    }
  }

  async verifyOtp(searchParams: {otp?: string, userId?: string}): Promise<Otps | null> {
    try {
      let condition: SearchCondition = {};
  
      // If active is provided in the searchParams, set condition.active
      if (searchParams?.otp !== undefined) {
        condition.otp = searchParams.otp;
      }
  
      // If mobilenumber is provided in the searchParams, set condition.mobilenumber
      if (searchParams?.userId) {
        condition.userid = searchParams.userId;
      }
      const otpData =  await Otps.findOne({ where: condition });
      return otpData?.get();
    } catch (error) {
      throw new Error("Failed to find Otp!");
    }
  }
  

  async retrieveOtpByUserId(searchParams: {otp?: string, active?: boolean}): Promise<Otps | null> {
    try {
      let condition: SearchCondition = {};

      if (searchParams?.active) condition.active = true;

      if (searchParams?.otp)
        condition.otp = { [Op.like]: `%${searchParams.otp}%` };

      return await Otps.findOne({ where: condition });
    } catch (error) {
      throw new Error("Failed to retrieve Userss!");
    }
  }

  async update(newData: {otp?: number, active?: boolean}): Promise<number> {
    const { otp , active } = newData;

    try {
      const affectedRows = await Otps.update(
        { active },
        { where: { otp } }
      );

      return affectedRows[0];
    } catch (error) {
      throw new Error("Failed to update otps!");
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
}

export default new OtpsRepository();
