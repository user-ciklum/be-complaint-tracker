import { Request, Response } from "express";
import Institute from "../models/institute.model";
import instituteRepository from "../repositories/institute.repository";

export default class InstituteController {
    async create(req: Request, res: Response) {
        if (!req.body.name) {
            res.status(400).send({
                message: "Content can not be empty!",
            });
            return;
        }

        try {
            const institute: Institute = req.body;
            if (!institute.active) institute.active = false;

            const savedInstitute = await instituteRepository.save(institute);

            res.status(201).send(savedInstitute);
        } catch (err) {
            res.status(500).send({
                message: "Some error occurred while creating the institute.",
            });
        }
    }

    async findAll(req: Request, res: Response) {
        const name = typeof req.query.name === "string" ? req.query.name : "";

        try {
            const institutes = await instituteRepository.retrieveAll({ name });

            res.status(200).send(institutes);
        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while retrieving institutes.",
            });
        }
    }

    async findOne(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const institute = await instituteRepository.retrieveById(id);

            if (institute) res.status(200).send(institute);
            else
                res.status(404).send({
                    message: `Cannot find Institute with id=${id}.`,
                });
        } catch (err) {
            res.status(500).send({
                message: `Error retrieving Institute with id=${id}.`,
            });
        }
    }

    async update(req: Request, res: Response) {
        let institute: Institute = req.body;
        institute.id = parseInt(req.params.id);

        try {
            const num = await instituteRepository.update(institute);

            if (num == 1) {
                res.send({
                    message: "Institute was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update Institute with id=${institute.id}. Maybe Institute was not found or req.body is empty!`,
                });
            }
        } catch (err) {
            res.status(500).send({
                message: `Error updating Institute with id=${institute.id}.`,
            });
        }
    }

    async delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const num = await instituteRepository.delete(id);

            if (num == 1) {
                res.send({
                    message: "Institute was deleted successfully!",
                });
            } else {
                res.send({
                    message: `Cannot delete Institute with id=${id}. Maybe Institute was not found!`,
                });
            }
        } catch (err) {
            res.status(500).send({
                message: `Could not delete Institute with id=${id}.`,
            });
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            const num = await instituteRepository.deleteAll();

            res.send({ message: `${num} Institutes were deleted successfully!` });
        } catch (err) {
            res.status(500).send({
                message: "Some error occurred while removing all institutes.",
            });
        }
    }

    async findAllActive(req: Request, res: Response) {
        try {
            const institutes = await instituteRepository.retrieveAll({ status: "active" });

            res.status(200).send(institutes);
        } catch (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving institutes.",
            });
        }
    }
}
