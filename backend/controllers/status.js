

const Conversasion = require("../models/convers");
const Story = require('../models/status')
const cloudinary = require("../config/cloude")
exports.createStory = async (req, res) => {
    try {
        const userId = req.user.id;
        const { text } = req.body;

        let mediaUrl;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "stories",
                resource_type: "auto",
            });
            mediaUrl = result.secure_url;
        }

        const story = await Story.create({
            user: userId,
            text,
            mediaUrl,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
        });

        res.status(201).json({
            success: true,
            story,
        });
    } catch (error) {
        console.log("CREATE STORY ERROR 👉", error);
        res.status(500).json({ message: "Server error" });
    }
};

