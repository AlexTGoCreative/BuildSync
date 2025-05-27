import express from "express";
import { addClient, upload, getClients, getClient, updateClient } from "../controllers/clientController.js";

const router = express.Router();

router.post("/add", upload.single("image"), addClient); // Changed "profileImage" to "image"
router.get("/", getClients);
router.get("/:id", getClient);
router.put("/:id", updateClient);

export default router;