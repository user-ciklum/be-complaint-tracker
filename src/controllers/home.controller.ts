import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import usersRepository from "../repositories/users.repository";
import Users from "../models/users.model";
import complaintListRepository from "../repositories/complaintList.repository";
import ComplaintList from "../models/compaintList.model";

export function welcome(req: Request, res: Response): Response {
  return res.json({ message: "Welcome to bezkoder application." });
}

export async function loadData(req: Request, res: Response) {
  try {
    const usersFilePath = path.join(__dirname, "../../../resources/users.json");
    if (fs.existsSync(usersFilePath)) {
      console.log("----Loading User data from file----");
      const fileData = fs.readFileSync(usersFilePath, "utf-8");
      const usersArray: Users[] = JSON.parse(fileData);

      for (const userData of usersArray) {
        try {
          const user: Users = userData;
          if (!user.active) {
            user.active = false;
          }
          await usersRepository.save(user);
        } catch (error) {
          console.log(`Error occurred while inserting ${userData.name} from file - ${error}`);
          continue;
        }
      }
      console.log("----Completed Loading User data from file----");
    } else {
      console.log("----User data file not found----");
    }

    const complaintsFilePath = path.join(__dirname, "../../../resources/complaints.json");
    if (fs.existsSync(complaintsFilePath)) {
      console.log("----Loading complaint data from file----");
      const complaintFileData = fs.readFileSync(complaintsFilePath, "utf-8");
      const complaintArray: ComplaintList[] = JSON.parse(complaintFileData);

      for (const complaintData of complaintArray) {
        try {
          const complaint: ComplaintList = complaintData;
          await complaintListRepository.save(complaint);
        } catch (error) {
          console.log(`Error occurred while inserting complaint from file - ${error}`);
          continue;
        }
      }
      console.log("----Completed loading complaint data from file----");
    } else {
      console.log("----Complaint data file not found----");
    }
  } catch (error) {
    return res.status(500).send({
      message: `Error occurred while inserting data from file - ${error}`,
    });
  }
  return res.json({ message: "Successfully loaded the data from the file" });
}
