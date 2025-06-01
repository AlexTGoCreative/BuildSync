import express from "express";
import { addClient, upload, getClients, getClient, updateClient,deleteClient } from "../controllers/clientController.js";

const router = express.Router();

router.post("/add", upload.single("image"), addClient); 
router.get("/", getClients);
router.get("/:id", getClient);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;