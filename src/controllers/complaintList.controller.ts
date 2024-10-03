import { Request, Response } from "express";
import ComplaintList from "../models/compaintList.model";
import complaintListRepository from "../repositories/complaintList.repository";

export default class ComplaintListController {
  async create(req: Request, res: Response) {
    if (!req.body.categoryType) {
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

      if (req.query.assignedType && typeof req.query.assignedType === 'string') {
        searchParams.assignedType = req.query.assignedType;
      }

      if (req.query.categoryType && typeof req.query.categoryType === 'string') {
        searchParams.categoryType = req.query.categoryType;
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

      if (req.query.status && typeof req.query.status === 'string') {
        searchParams.status = req.query.status;
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

  async retrieveByUserId(req: Request, res: Response) {
    const userId: number = parseInt(req.params.id);

    try {
      const ComplaintList = await complaintListRepository.retrieveByUserId(userId);

      if (ComplaintList) res.status(200).send(ComplaintList);
      else
        res.status(404).send({
          message: `Cannot find ComplaintList with id=${userId}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving ComplaintList with id=${userId}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let complaintData: ComplaintList = req.body; 
    complaintData.id = parseInt(req.params.id);
  
    try {
      // Calling the update method from the repository
      const updatedComplaintList = await complaintListRepository.update(complaintData);
  
      if (updatedComplaintList) {
        // Send the updated complaint list if found
        res.status(200).send(updatedComplaintList);
      } else {
        // If no rows were updated, send a 404 error
        res.send({
          message: `Cannot update ComplaintList with id=${complaintData.id}. Maybe ComplaintList was not found!`
        });
      }
    } catch (err) {
      // In case of error, send a 500 error with a meaningful message
      res.status(500).send({
        message: `Error updating ComplaintList with id=${complaintData.id}.`
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
