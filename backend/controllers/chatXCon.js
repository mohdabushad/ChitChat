const Conversasion = require("../models/convers");
const Message = require('../models/message')
const cloudinary = require("../config/cloude")
exports.sendMessage = async (req, res) => {
    try {

        const { sender, resiver, content, messegeStatus } = req.body
        const participants = [sender, resiver].sort();

        let conversasion = await Conversasion.findOne({
            participants: participants
        })
        if (!conversasion) {
            conversasion = new Conversasion({
                participants,

            })
            await conversasion.save();
        }
        let imageorvidiourl;

        // Only upload if file exists
        if (req.file) {
            console.log(req.file);
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "chat-media",
                resource_type: "image",
            });
            imageorvidiourl = result.secure_url;
        }

        const message = new Message({
            conversasion: conversasion?._id,
            sender,
            resiver,
            content,
            ...(imageorvidiourl && { imageorvidiourl }),
            messegeStatus,

        })
        await message.save();

        if (message?.content) {
            conversasion.lastMessage = message?.id

        }
        if (!conversasion.unreadCounts) {
            conversasion.unreadCounts = new Map();
        }

        // receiver unread ++
        const receiverId = resiver.toString();
        const senderId = sender.toString();

        conversasion.unreadCounts.set(
            receiverId,
            (conversasion.unreadCounts.get(receiverId) || 0) + 1
        );

        // sender unread always 0
        conversasion.unreadCounts.set(senderId, 0);

        await conversasion.save()
        console.log(imageorvidiourl, sender,
            resiver,
            content,
            messegeStatus,);

        const populatedMessage = await Message.findById(message._id)
            .populate({
                path: 'sender',
                select: 'name profilePicture'
            }).populate({
                path: 'resiver',
                select: 'name profilePicture'
            });


        return res.status(200).json({
            success: true,
            populatedMessage

        });

    } catch (error) {
        console.log("SEND MESSAGE ERROR 👉", error);
        return res.status(400).json({
            message: "bad request",
            error: error.message,
            stack: error.stack
        });
    }
}


exports.getConverstion = async (req, res) => {
    const userId = req.user.id;

    try {
        const conversations = await Conversasion.find({
            participants: userId
        })
            .populate({
                path: 'participants',
                select: 'name profilePicture about email username'
            })
            .populate({
                path: 'lastMessage',
                populate: {
                    path: 'sender resiver',
                    select: 'name '
                }


            })
            .sort({ updatedAt: -1 });

        return res.status(200).json({
            success: true,
            conversations
        });

    } catch (error) {
        console.log("GET CONVERSATION ERROR 👉", error);
        return res.status(400).json({
            message: "bad request",
            error: error.message
        });
    }
};


exports.getMessage = async (req, res) => {
    const { conversasionId } = req.params;
    const userid = req.user.id

    try {
        const conversasion = await Conversasion.findById(conversasionId);

        if (!conversasion) {
            return res.status(400).json({ message: "conversation is not found" })
        }

        const isParticipant = conversasion.participants.some(
            id => id.toString() === userid
        );

        if (!isParticipant) {
            return res.status(403).json({ message: "Not authorized" });
        }


        const message = await Message.find({ conversasion: conversasionId }).populate({
            path: 'sender',
            select: 'name profilePicture'
        })
            .populate({
                path: 'resiver',
                select: 'name profilePicture'
            })
            .sort({ createdAt: 1 });

        await Message.updateMany({
            conversasion: conversasionId,
            resiver: userid,
            messegeStatus: { $in: ['send', "delivered"] }
        },
            { $set: { messegeStatus: "read" } }

        )
        conversasion.unreadCounts.set(userid.toString(), 0);
        await conversasion.save();

        return res.status(200).json({
            success: true,
            message

        });
    } catch (error) {
        console.log("GET CONVERSATION ERROR 👉", error);
        return res.status(400).json({
            message: "bad request",
            error: error.message
        });
    }
}
exports.markread = async (req, res) => {
    const { messageId } = req.body;

    const userid = req.user.id

    try {
        let message = await Message.find({
            _id: { $in: messageId },
            resiver: userid,
        })

        await Message.updateMany({
            _id: { $in: messageId, },
            resiver: userid,
        }, { $set: { messegeStatus: "read" } }
        )
        return res.status(200).json({
            success: true,
            message

        });
    } catch (error) {
        console.log("GET CONVERSATION ERROR 👉", error);
        return res.status(400).json({
            message: "bad request",
            error: error.message
        });
    }
}





exports.deleteMessage = async (req, res) => {
    const { messageId } = req.params;

    const userid = req.user.id

    try {
        const message = await Message.findById(messageId);
        // console.log("Sender:", message.sender.toString());
        // console.log("UserId:", userid);
        // console.log("Message ID:", messageId);

        if (!message) {
            return res.status(200).json({
                success: false,
                message: 'message is not found'

            });
        }

        // if (message.sender.toString() !== userid) {
        //     return res.status(403).json({
        //         success: false,
        //         message: 'आप इस message को delete नहीं कर सकते',
        //     });
        // }
        await message.deleteOne();
        return res.status(200).json({
            success: true,
            message: 'successfully deleted message'

        });

    } catch (error) {
        console.log("GET CONVERSATION ERROR 👉", error);
        return res.status(400).json({
            message: "bad request",
            error: error.message
        });
    }

}   
