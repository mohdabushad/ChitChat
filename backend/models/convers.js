const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Message',
      
    },
    unreadCounts: {
        type: Map,
        of: Number,
        default: {},
    },

}, { timestamps: true })

const Conversasion = mongoose.model('Conversasion', conversationSchema)

module.exports = Conversasion