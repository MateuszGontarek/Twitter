const Twit = require("../../models/twit");
const jwt = require("jsonwebtoken");

const addTwit = async (req, res) => {
  const date = new Date();
  const data = req.body.data;
  const description = data.twitText;
  const content = data.twitContent.image;
  if (!jwt.verify(req.body.token, "admin4123"))
    return res.status(403).json({ success: false });
  try {
    await new Twit({
      description,
      content,
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
    const twits = await Twit.find();
    return res.status(200).json({ success: true, twits });
  } catch (error) {
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
// const deleteMessage = async (req, res) => {
//   const id = req.headers.id;
//   const token = req.headers.token;
//   if (!jwt.verify(token, "admin4123"))
//     return res.status(403).json({ success: false });
//   try {
//     await Message.findByIdAndDelete(id);
//     return res.status(200).json({ success: true });
//   } catch (error) {
//     return res.status(500).json({ success: false });
//   }
// };

module.exports = {
  addTwit,
  getTwits,
  deleteTwit,
  addComment,
};
