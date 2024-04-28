const userCredential = require("../../models/userCredential.model.js");
const bcrypt = require("bcrypt");
const loginHandler = async (req, res) => {
  let { loginid, password } = req.body;

  try {
    let user = await userCredential.findOne({ loginid });
    // if (!user || password !== user.password) {
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const data = {
      success: true,
      message: "Login",
      loginid: user.loginid,
      id: user.id,
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

  console.log(password);

  try {
    let user = await userCredential.findOne({ loginid, role });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User With This LoginId Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    user = await userCredential.create({
      loginid,
      password: hashedPassword,
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
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateHandler = async (req, res) => {
  try {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    let user = await userCredential.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User Exists!",
      });
    }
    user.password = hashedPassword;
    await user.save();
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
