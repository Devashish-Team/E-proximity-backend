const userCredential = require("../../models/userCredential.model.js");

const bcrypt = require("bcrypt");

const loginHandler = async (req, res) => {
  let { loginid, password } = req.body;
  try {
    let user = await userCredential.findOne({ loginid });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const data = {
      success: true,
      message: "Login Successful!",
      loginid: user.loginid,
      id: user._id,
      role: user.role,
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const registerHandler = async (req, res) => {
  let { loginid, password, role } = req.body;
  try {
    let user = await userCredential.findOne({ loginid });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User With This LoginId Already Exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await userCredential.create({
      loginid,
      password: hashedPassword,
      role,
    });
    const data = {
      success: true,
      message: "Register Successful!",
      loginid: user.loginid,
      id: user._id,
    };
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateHandler = async (req, res) => {
  try {
    let user = await userCredential.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

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
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  loginHandler,
  registerHandler,
  updateHandler,
  deleteHandler,
};
