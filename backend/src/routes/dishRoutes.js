import express from "express";
import { authenticateUser } from "../authMiddleware";
import { cdaClient, cmaClient } from "../contentfulClient";

const router = express.Router();

// Define dish routes
router.get('/', (req, res) => {
    // Handle GET request for dishes
});

router.post('/', (req, res) => {
    // Handle POST request to create a new dish
});

router.delete('/:id', (req, res) => {
    // Handle DELETE request to delete a dish by ID
});

router.put('/:id', (req, res) => {
    // Handle PUT request to update a dish by ID
});

export default router;