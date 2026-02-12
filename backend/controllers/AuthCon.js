const Conversasion = require('../models/convers')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const users = require('../models/user')
const cloudinary = require("../config/cloude")
const user = require('../models/user')

exports.signup = async (req, res) => {
    try {
        const { name, email, password, username } = req.body
        const userexits = await users.findOne({
            $or: [{ email }, { username }]
        });



        if (userexits) {
            return res.status(409).json({ massege: "username or email is alrady exist", success: false })
        }
        const hashPass = await bcrypt.hash(password, 10)
        const creat = await users.create({ name, email, password: hashPass, username })


        res.status(200).json({ massege: 'succesfully signup user', success: true, data: creat })
    } catch (error) {
        console.log(error.massege)
    }

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userexits = await users.findOne({ email })


        if (!userexits) {
            return res.status(409).json({ message: "user email is invalid", success: false })
        }
        const checkhPass = await bcrypt.compare(password, userexits.password)
        if (!checkhPass) {
            return res.status(409).json({ message: "invalid password", success: false })
        }

        const token = jwt.sign({ email: userexits.email, id: userexits._id, name: userexits.name }, process.env.SCKEY,
            { expiresIn: '24h' }
        )
     res.cookie("token", token, {
       httpOnly: true,
        secure: true,        
        sameSite: "none",    
        maxAge: 24 * 60 * 60 * 1000,
     });



        res.status(200).json({ messege: 'succesfully signin user', success: true, data: token, name: userexits.name })
    } catch (error) {
        console.log(error)

        res.status(500).json({ error: error.message });
    }

}

exports.logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ massege: 'succesfully logout user' })
    } catch (error) {
        console.log(error.massege)
        res.status(500).json({ error: error.message });
    }
}

exports.updateProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, about } = req.body;

    let profilePicture;

    // Only upload if file exists
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "profiles",
            resource_type: "image",
        });
        profilePicture = result.secure_url;
    }

    try {
        const updatedUser = await users.findByIdAndUpdate(
            userId,
            {
                name,
                about,
                ...(profilePicture && { profilePicture }), // Only add if exists
            },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await users
            .findById(req.user.id)
            .select("-password"); // 🔥 hide password

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // If image is stored as filename (local upload)
        if (user.image && !user.image.startsWith("http")) {
            user.image = `http://localhost:8000/uploads/${user.image}`;
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAlluser = async (req, res) => {

    try {
        const userId = req.user.id;
        let { query } = req.params;


        let filter = {
            _id: { $ne: userId },
            $or: [
                {
                    username: {
                        $regex: `(?=.*${query}.{2,})`,
                        $options: 'i'
                    } }

            ]
        };
        const userlist = await users.find(filter).select("-password")


        return res.status(200).json({
            success: true,
            message: "Successful data fetch",
            userlist
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



