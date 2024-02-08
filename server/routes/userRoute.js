const router = require('express').Router()
const User = require('../models/userModel')



router.post("/register", (req, res) => {
    const { name, email, password } = req.body
    const newUser = new User({ name, email, password })

    try {
        newUser.save()
        res.status(200).json({ success: true, message: "Register successfully" })
    } catch (error) {
        res.status(400).json({ message: error })
    }
})


router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.find({ email, password })
        if (user.length > 0) {
            const currentUser = {
                name: user[0].name,
                email: user[0].email,
                isAdmin: user[0].isAdmin,
                _id: user[0]._id
            }
            res.status(200).send(currentUser)
        }
        else {
            res.status(400).json({ message: "User Not Find" })
        }

    } catch (error) {
        res.status(404).json({ message: error })
    }
})


router.get("/getallusers", async (req, res) => {

    try {
        const users = await User.find({})

        res.status(200).send(users)
    } catch (error) {
        res.status(404).json({ message: error })
    }
})

router.post("/deleteuser", async (req, res) => {
    const { userId } = req.body
    try {
        await User.findByIdAndDelete(userId)
        res.status(200).send("user deleted successfully")
    } catch (error) {
        res.status(404).json({ message: error.stack })
    }
})




module.exports = router