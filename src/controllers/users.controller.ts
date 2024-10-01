import { Request, Response } from "express";
import Users from "../models/users.model";
import usersRepository from "../repositories/users.repository";
import path from "path";
import fs from "fs";

export default class UsersController {
  async create(req: Request, res: Response) {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const users: Users = req.body;
      if (!users.active) users.active = false;

      const savedUsers = await usersRepository.save(users);

      res.status(201).send(savedUsers);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving userss."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {

      const searchParams = {} as Users;

      if (req.query.name && typeof req.query.name === 'string') {
        searchParams.name = req.query.name;
      }

      if (req.query.role && typeof req.query.role === 'string') {
        searchParams.role = req.query.role as "student" | "teacher" | "management" | "admin";
      }

      if (req.query.institute_type && typeof req.query.institute_type === 'string') {
        searchParams.institute_type = req.query.institute_type as "school" | "college";
      }

      if (req.query.institute_id && typeof req.query.institute_id === 'string') {
        searchParams.institute_id = req.query.institute_id;
      }

      if (req.query.mobilenumber && typeof req.query.mobilenumber === 'string') {
        searchParams.mobilenumber = req.query.mobilenumber;
      }

      if (req.query.class && typeof req.query.class === 'string') {
        searchParams.class = [req.query.class];
      }

      if (req.query.active !== undefined && (req.query.active === 'true' || req.query.active === 'false')) {
        searchParams.active = req.query.active === 'true';
      }

      const userss = await usersRepository.retrieveAll(searchParams);

      res.status(200).send(userss);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving userss."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const users = await usersRepository.retrieveById(id);

      if (users) res.status(200).send(users);
      else
        res.status(404).send({
          message: `Cannot find Users with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Users with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let users: Users = req.body;
    users.id = parseInt(req.params.id);

    try {
      const num = await usersRepository.update(users);

      if (num == 1) {
        res.send({
          message: "Users was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Users with id=${users.id}. Maybe Users was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Users with id=${users.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await usersRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "Users was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Users with id=${id}. Maybe Users was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Users with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await usersRepository.deleteAll();

      res.send({ message: `${num} Userss were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all userss."
      });
    }
  }

  async findAllActive(req: Request, res: Response) {
    try {
      const searchParams = { active: true } as Users;

      const userss = await usersRepository.retrieveAll(searchParams);

      res.status(200).send(userss);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving userss."
      });
    }
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const user = await usersRepository.authenticate(username, password);
      if (!user) {
        return res.status(401).send({ message: "Invalid credentials" });
      }

      res.status(200).send({ userInfo: user });
    } catch (err) {
      res.status(500).send({ message: "Login failed" });
    }
  }

  async bulkUserImport(req: Request, res: Response) {
    // Construct the path to the users.json file in the resource folder
    const filePath = path.join(__dirname, "../../../resources/users.json");

    try {
      // Read the JSON file
      const fileData = fs.readFileSync(filePath, "utf-8");

      // Parse the JSON file
      const usersArray: Users[] = JSON.parse(fileData);

      // Loop through the array and save each user
      for (const userData of usersArray) {
        const user: Users = userData;

        console.log("Looping data ----")
        // Check if active is not provided, set to false
        if (!user.active) {
          user.active = false;
        }

        // Save each user to the database using the repository
        await usersRepository.save(user);
      }

      res.status(201).send({ message: "All users were successfully inserted!" });
    } catch (err) {
      console.log(err)
      res.status(500).send({
        message: "Error occurred while inserting users from JSON file",
      });
    }
  }
}
