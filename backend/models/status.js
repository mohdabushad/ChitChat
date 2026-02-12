const mongoose = require("mongoose");



const storySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },

        text: String,

        mediaUrl: String, // image / video

        viewers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
            },
        ],

        expiresAt: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

// 🔥 auto delete after expiry
storySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Story", storySchema);
