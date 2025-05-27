import multer from "multer";
import Client from "../models/Client.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "public/uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if it doesn't exist
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Add Client route
const addClient = async (req, res) => {
  try {
    const {
      name,
      email,
      dob,
      gender,
      maritalStatus,
      password,
      role = "client", // Default to "client" if not provided
      phone, // Include phone field from frontend
    } = req.body;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already registered as client" });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      phone, // Include if User schema has a phone field
      profileImage: req.file ? req.file.filename : "",
    });

    const savedUser = await newUser.save();

    // Create new client
    const newClient = new Client({
      userId: savedUser._id,
      dob,
      gender,
      maritalStatus,
      phone, // Include if Client schema has a phone field
      image: req.file ? req.file.filename : "",
    });

    await newClient.save();

    return res.status(200).json({ success: true, message: "Client created" });
  } catch (error) {
    if (error instanceof multer.MulterError) {
      return res.status(400).json({ success: false, error: error.message });
    }
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Server error in adding client" });
  }
};

// Get all clients
const getClients = async (req, res) => {
  try {
    const clients = await Client.find().populate("userId", { password: 0 });
    return res.status(200).json({ success: true, clients });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get clients server error" });
  }
};

// Get single client
const getClient = async (req, res) => {
  const { id } = req.params;
  try {
    let client = await Client.findById(id).populate("userId", { password: 0 });

    if (!client) {
      client = await Client.findOne({ userId: id }).populate("userId", {
        password: 0,
      });
    }

    if (!client) {
      return res
        .status(404)
        .json({ success: false, error: "Client not found" });
    }

    return res.status(200).json({ success: true, client });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get client server error" });
  }
};

// Update client
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus } = req.body;

    const client = await Client.findById(id);
    if (!client) {
      return res
        .status(404)
        .json({ success: false, error: "Client not found" });
    }

    const user = await User.findById(client.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(client.userId, { name });
    const updatedClient = await Client.findByIdAndUpdate(id, { maritalStatus });

    if (!updatedUser || !updatedClient) {
      return res
        .status(404)
        .json({ success: false, error: "Document not found" });
    }

    return res.status(200).json({ success: true, message: "Client updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Update client server error" });
  }
};

// Export the functions
export { addClient, getClients, getClient, updateClient, upload };