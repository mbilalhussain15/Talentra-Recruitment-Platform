const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        res.status(201).json({ saveStudent, message: "Created successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;