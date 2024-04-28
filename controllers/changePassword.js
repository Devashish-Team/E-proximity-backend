const userCredential = require("../models/userCredential.model.js");
const bcrypt = require("bcrypt");
const changepasswordHandler = async (req, res) => {
  const { newPassword } = req.body;
  let user = await userCredential.findById(req.params.id);

  try {
    // Find the user by email

    const user = await userCredential.findById(req.params.id);
    console.log(user);

    // Check if the user exists and the old password is correct

    // Validate the password format

    // Update the password
    try {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      console.log(hashedNewPassword);
      user.password = hashedNewPassword;
      await user.save();
  } catch (error) {
      console.error(error);
      // handle error appropriately
  }

  const data = {
    success: true,
    message: "Updated Successful!",
  };
  res.json(data);
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  changepasswordHandler,
};
