const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  const users = await User.find().sort({ date: -1 });
  const token = req.headers.token;
  const decoded = jwt.verify(token, "admin4123");
  if (decoded.role === "admin") {
    const response = {
      success: true,
      users,
    };
    return res.status(200).json(response);
  } else {
    return res.status(403).json({ success: false });
  }
};

const addUser = async (req, res) => {
  const date = new Date();
  const data = req.body.data;
  const email = data.email;
  const nickname = data.nickname;
  const password = data.password;
  try {
    await new User({ nickname, email, password, date }).save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};
const updateUser = async (req, res) => {
  const id = req.body.id;
  const newAvatar = req.body.newAvatar;
  if (!jwt.verify(req.body.token, "admin4123"))
    return res.status(403).json({ success: false });
  try {
    await User.findOneAndUpdate(
      { _id: id },
      { $set: { avatar: newAvatar } },
      { useFindAndModify: false }
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};
const deleteUser = async (req, res) => {
  const id = req.headers.id;
  const token = req.headers.token;
  const decoded = jwt.verify(token, "admin4123");
  if (decoded.role === "admin") {
    try {
      await User.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false });
    }
  } else {
    return res.status(403).json({ success: false });
  }
};
module.exports = {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
};
