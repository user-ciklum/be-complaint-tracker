import { Request, Response } from "express";
import Users from "../models/users.model";
import usersRepository from "../repositories/users.repository";
import otpRepository from "../repositories/otp.repository";
import crypto from 'crypto';
import Otps from "../models/otp.module";

export default class AuthController {
    async login(req: Request, res: Response) {
        if (!req.body.mobilenumber) {
            res.status(400).send({
                message: "mobilenumber can not be empty!"
            });
            return;
        }

        try {
            const mobilenumber = req.body.mobilenumber;
            const users = await usersRepository.retrieveByMobileNumber({ mobilenumber });

            if (users) {
                const randomOTP = crypto.randomInt(1000, 9999);
                console.log("user2", users);
                // Save OTP for the newly created user
                // const otpsObj : Otps = {
                //     userId: users.id,
                //     otp: randomOTP,
                //     active: true
                // }
                console.log("randomOTP123", randomOTP)
                await otpRepository.save({
                    userId: users.id,
                    otp: randomOTP,
                    active: false
                });

                // Return OTP in the response
                return res.status(200).send({ otp: randomOTP, userId: users.id });
            } else
                res.status(200).send({ message: "Invalid Users" })
        } catch (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving userss."
            });
        }
    }

    async verifyOtp(req: Request, res: Response) {
        if (!req.body.otp && !req.body.userId) {
            res.status(400).send({
                message: "otp && userId can not be empty!"
            });
            return;
        }

        try {
            const otp = req.body.otp;
            const userId = req.body.userId;
            const otpData = await otpRepository.verifyOtp({ otp, userId })

            if (otpData) {
                await otpRepository.update({
                    otp: otpData.otp,
                    active: false
                });

                const users = await usersRepository.retrieveById(userId);

                return res.status(200).send({ userInfo: users });
            } else
                res.status(200).send({ message: "Invalid Otps" })
        } catch (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving userss."
            });
        }
    }

    async findAll(req: Request, res: Response) {
        const name = typeof req.query.name === "string" ? req.query.name : "";

        try {
            const searchParams = { name } as Users;

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
}
