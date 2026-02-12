const mongoose = require('mongoose');

const massegeSchema = new mongoose.Schema({
    conversasion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversasion',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    resiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    content: { type: String },
    imageorvidiourl: { type: String },
    contentType: { type: String, enum: ['image', 'video', 'text'] },
    reactions: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                required: true
            },
            emoji: { type: String }
        }
    ],
    messegeStatus: { type: String, default: 'send' }
}, { timestamps: true });

const Message = mongoose.model('Message', massegeSchema)

module.exports = Message 
