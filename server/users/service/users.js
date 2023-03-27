const User = require("../../models/user");
const Message = require("../../models/message");
const jwt = require("jsonwebtoken");

const validateEmail = async (req, res) => {
  const users = await User.find().sort({ date: -1 });
  const receiveremail = req.headers.receiveremail;
  const actualAdress = req.headers.actualadress;
  if (receiveremail) {
    const verifyUserEmail = () => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].email === receiveremail) {
          return true;
        }
      }
      return false;
    };
    const verifyUser = verifyUserEmail();
    if (verifyUser) {
      const response = {
        success: true,
      };
      return res.status(200).json(response);
    } else {
      const response = {
        success: false,
      };
      return res.status(200).json(response);
    }
  }
  if (actualAdress) {
    const giveMailPromt = () => {
      const length = actualAdress.length;
      for (let i = 0; i < users.length; i++) {
        if (users[i].email.slice(0, length) === actualAdress) {
          return users[i].email;
        }
      }
      return false;
    };
    const mail = giveMailPromt();
    if (mail) {
      const response = {
        success: true,
        mail,
      };
      return res.status(200).json(response);
    } else {
      const response = {
        success: false,
      };
      return res.status(200).json(response);
    }
  }
};

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
  console.log("adding user");
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
  validateEmail,
};
