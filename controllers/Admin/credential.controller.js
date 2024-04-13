const userCredential = require("../../models/userCredential.model.js");

const loginHandler = async (req, res) => {
    let { loginid, password } = req.body;
    try {
        let user = await userCredential.findOne({ loginid });
        if (!user || password !== user.password) {
            return res
                .status(400)
                .json({ success: false, message: "Wrong Credentials" });
        }
        const data = {
            success: true,
            message: "Login Successful!",
            loginid: user.loginid,
            id: user.id,
            role: user.role,
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const registerHandler = async (req, res) => {
    let { loginid, password, role } = req.body;
    try {
        let user = await userCredential.findOne({ loginid, role });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User With This LoginId Already Exists",
            });
        }
        user = await userCredential.create({
            loginid,
            password,
            role,
        });
        const data = {
            success: true,
            message: "Register Successful!",
            loginid: user.loginid,
            id: user.id,
            role: user.role,
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const updateHandler = async (req, res) => {
    try {
        let user = await userCredential.findByIdAndUpdate(req.params.id, req.body);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No User Exists!",
            });
        }
        const data = {
            success: true,
            message: "Updated Successful!",
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteHandler = async (req, res) => {
    try {
        let user = await userCredential.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No User Exists!",
            });
        }
        const data = {
            success: true,
            message: "Deleted Successful!",
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { loginHandler, registerHandler, updateHandler, deleteHandler }