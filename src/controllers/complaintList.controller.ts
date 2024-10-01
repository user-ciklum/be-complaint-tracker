import { Request, Response } from "express";
import ComplaintList from "../models/compaintList.model";
import complaintListRepository from "../repositories/complaintList.repository";

export default class ComplaintListController {
  async create(req: Request, res: Response) {
    if (!req.body.subType) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const complaintList: ComplaintList = req.body;
      if (!complaintList.active) complaintList.active = false;

      const savedComplaintList = await complaintListRepository.save(complaintList);

      res.status(201).send(savedComplaintList);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving complaintList."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      // Dynamically build search parameters based on available query parameters
      const searchParams = {} as ComplaintList;

      if (req.query.complaintType && typeof req.query.complaintType === 'string') {
        searchParams.complaintType = req.query.complaintType;
      }

      if (req.query.complaintOn && typeof req.query.complaintOn === 'string') {
        searchParams.complaintOn = req.query.complaintOn;
      }

      if (req.query.instituteType && typeof req.query.instituteType === 'string') {
        searchParams.inistituteType = req.query.instituteType;
      }

      if (req.query.subType && typeof req.query.subType === 'string') {
        searchParams.subType = req.query.subType;
      }

      if (req.query.description && typeof req.query.description === 'string') {
        searchParams.description = req.query.description;
      }

      if (req.query.assignedTo && typeof req.query.assignedTo === 'string') {
        searchParams.assignedTo = req.query.assignedTo;
      }

      if (req.query.createdBy && typeof req.query.createdBy === 'string') {
        searchParams.createdBy = req.query.createdBy;
      }

      if (req.query.updatedBy && typeof req.query.updatedBy === 'string') {
        searchParams.updatedBy = req.query.updatedBy;
      }

      if (req.query.resolution && typeof req.query.resolution === 'string') {
        searchParams.resolution = req.query.resolution;
      }

      if (req.query.remainder && typeof req.query.remainder === 'string') {
        searchParams.remainder = req.query.remainder;
      }

      if (req.query.criticality && typeof req.query.criticality === 'string') {
        searchParams.criticality = req.query.criticality;
      }

      if (req.query.active !== undefined && (req.query.active === 'true' || req.query.active === 'false')) {
        searchParams.active = req.query.active === 'true';
      }

      // Call the repository method to retrieve complaints based on the search parameters
      const complaintList = await complaintListRepository.retrieveAll(searchParams);

      res.status(200).send(complaintList);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving the complaint list.",
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const ComplaintList = await complaintListRepository.retrieveById(id);

      if (ComplaintList) res.status(200).send(ComplaintList);
      else
        res.status(404).send({
          message: `Cannot find ComplaintList with id=${id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving ComplaintList with id=${id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let ComplaintList: ComplaintList = req.body;
    ComplaintList.id = parseInt(req.params.id);

    try {
      const num = await complaintListRepository.update(ComplaintList);

      if (num == 1) {
        res.send({
          message: "ComplaintList was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ComplaintList with id=${ComplaintList.id}. Maybe ComplaintList was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating ComplaintList with id=${ComplaintList.id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    try {
      const num = await complaintListRepository.delete(id);

      if (num == 1) {
        res.send({
          message: "ComplaintList was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete ComplaintList with id=${id}. Maybe ComplaintList was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete ComplaintList with id==${id}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await complaintListRepository.deleteAll();

      res.send({ message: `${num} Tutorials were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all complaintList."
      });
    }
  }

  async findAllPublished(req: Request, res: Response) {
    try {
      const searchParams = { active: true } as ComplaintList;
      const complaintList = await complaintListRepository.retrieveAll(searchParams);

      res.status(200).send(complaintList);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving complaintList."
      });
    }
  }
}
