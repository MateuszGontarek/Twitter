const Twit = require("../../models/twit");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const addTwit = async (req, res) => {
  const date = new Date();
  const data = req.body.data;
  const description = data.twitText;
  const userId = data.userId;
  const content = data.twitContent.image;
  if (!jwt.verify(req.body.token, "admin4123"))
    return res.status(403).json({ success: false });
  try {
    await new Twit({
      description,
      content,
      userId,
      date,
    }).save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

const getTwits = async (req, res) => {
  if (!jwt.verify(req.headers.token, "admin4123"))
    return res.status(403).json({ success: false });
  try {
    const twitsWithHeaders = [];
    const twits = await Twit.find().sort({ date: -1 });
    const users = await User.find();

    twits.forEach((twit) => {
      const { _id, description, content, parents, date } = twit;
      const twitUser = users.find((user) => user._id == twit.userId);
      const twitCopy = { _id, description, content, parents, date };

      twitCopy.nickname = twitUser.nickname;
      twitCopy.avatar = twitUser.avatar;
      twitsWithHeaders.push(twitCopy);
    });

    return res.status(200).json({ success: true, twitsWithHeaders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};

const deleteTwit = async (req, res) => {
  const id = req.headers.id;
  const token = req.headers.token;
  if (!jwt.verify(token, "admin4123"))
    return res.status(403).json({ success: false });
  try {
    await Twit.findByIdAndDelete(id);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

const addComment = async (req, res) => {
  const { id, comment } = req.body;
  const token = req.headers.token;

  if (!comment) return res.status(400).json({ success: false });
  if (!jwt.verify(token, "admin4123"))
    return res.status(404).json({ success: false });

  try {
    await new Twit({
      description: comment,
      content: null,
      parents: id,
    }).save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false });
  }
};

module.exports = {
  addTwit,
  getTwits,
  deleteTwit,
  addComment,
};
