const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const data = req.body;

  try {
    const user = await User.findOne({ email: data.email });
    const hint = await User.find();
    if (!user) return res.status(200).json({ success: false, hint: hint });

    if (data.password === user.password && user.admin) {
      const token = jwt.sign({ email: user.email, role: "admin" }, "admin4123");

      return res.status(200).json({ success: true, token });
    } else {
      return res.status(200).json({ success: false, hint: hint });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, hint: hint });
  }
};
const loginUser = async (req, res) => {
  const data = req.body;
  try {
    const user = await User.findOne({ email: data.login });
    const hint = await User.find();
    if (!user) return res.status(200).json({ success: false, hint: hint });

    if (data.password === user.password) {
      const token = jwt.sign({ email: user.email }, "admin4123");
      return res.status(200).json({
        success: true,
        token,
        user,
      });
    } else {
      return res.status(200).json({ success: false, hint: hint });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, hint: hint });
  }
};

module.exports = {
  login,
  loginUser,
};
