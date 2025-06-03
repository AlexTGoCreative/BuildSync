import express from 'express';
import Client from '../models/Client.js';
import WorkRequest from '../models/Work.js';
import { body, validationResult } from 'express-validator';
import multer from 'multer';
import path from 'path';

const router = express.Router();

async function addWorkRequest(req, res) {
  try {
    const validations = [
      body('userId').isMongoId().withMessage('Invalid user ID'),
      body('name').notEmpty().withMessage('Request name is required'),
      body('startDate').isDate().withMessage('Valid start date is required'),
      body('endDate').isDate().withMessage('Valid end date is required'),
      body('startDate').custom((startDate, { req }) => {
        if (new Date(startDate) > new Date(req.body.endDate)) {
          throw new Error('Start date must be before end date');
        }
        return true;
      }),
    ];

    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ success: false, error: errors.array()[0].msg });
    }

    const { userId, name, startDate, endDate } = req.body;

    const client = await Client.findOne({ userId });
    if (!client) {
      return res.status(404).json({ success: false, error: 'Client not found' });
    }

    const newWorkRequest = new WorkRequest({
      clientId: client._id,
      name,
      startDate,
      endDate,
      details: req.file ? path.basename(req.file.path) : null, 
      status: 'Pending',
    });

    await newWorkRequest.save();

    return res.status(201).json({
      success: true,
      request: newWorkRequest,
    });
  } catch (error) {
    console.error('Error adding work request:', error.message);
    return res.status(500).json({ success: false, error: 'Work request add server error' });
  }
}

const getWorkRequest = async (req, res) => {
  try {
    const { id, role } = req.params;
    let workRequests;
    if (role === 'admin') {
      workRequests = await WorkRequest.find({ clientId: id });
    } else {
      const client = await Client.findOne({ userId: id });
      if (!client) {
        return res.status(404).json({ success: false, error: 'Client not found' });
      }
      workRequests = await WorkRequest.find({ clientId: client._id });
    }

    return res.status(200).json({ success: true, requests: workRequests });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, error: 'Work request retrieval server error' });
  }
};

const getWorkRequests = async (req, res) => {
  try {
    const workRequests = await WorkRequest.find().populate({
      path: 'clientId',
      populate: {
        path: 'userId',
        select: 'name',
      },
    });

    return res.status(200).json({ success: true, requests: workRequests });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, error: 'Work requests retrieval server error' });
  }
};

const getWorkRequestDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const workRequest = await WorkRequest.findById(id).populate({
      path: 'clientId',
      populate: {
        path: 'userId',
        select: 'name',
      },
    });

    if (!workRequest) {
      return res.status(404).json({ success: false, error: 'Work request not found' });
    }

    return res.status(200).json({ success: true, request: workRequest });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, error: 'Work request detail server error' });
  }
};

const updateWorkRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status" });
    }

    const updateData = {
      status,
      updatedAt: Date.now(),
    };

    if (status === "Rejected") {
      if (!rejectionReason || !rejectionReason.trim()) {
        return res.status(400).json({
          success: false,
          error: "Rejection reason is required when rejecting a work request",
        });
      }
      updateData.rejectionReason = rejectionReason.trim();
    } else {
      updateData.rejectionReason = null;
    }

    const workRequest = await WorkRequest.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!workRequest) {
      return res.status(404).json({ success: false, error: "Work request not found" });
    }

    return res.status(200).json({ success: true, request: workRequest });
  } catch (error) {
    console.error("Error updating work request:", error.message);
    return res.status(500).json({ success: false, error: "Work request update server error" });
  }
};

export { addWorkRequest, getWorkRequest, getWorkRequests, getWorkRequestDetail, updateWorkRequest };