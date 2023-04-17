const Twit = require("../../models/twit");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const addTwit = async (req, res) => {
  if (!jwt.verify(req.body.token, "admin4123"))
    return res.status(403).json({ success: false });
  const date = new Date();
  const data = req.body.data;
  const description = data.twitText;
  const userId = data.userId;
  const content = data.twitContent.image;
  const hashtags = description
    .match(/#[a-zA-Zа-яА-Я0-9]+/g)
    .map((hashtag) => hashtag.substring(1));
  try {
    await new Twit({
      description,
      content,
      userId,
      date,
      hashtags,
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
      if (twit.userId) {
        const { _id, description, content, parents, date, likes, hashtags } =
          twit;
        const twitUser = users.find((user) => user._id == twit.userId);
        const twitCopy = {
          _id,
          description,
          content,
          parents,
          date,
          likes,
          hashtags,
        };

        twitCopy.nickname = twitUser.nickname;
        twitCopy.avatar = twitUser.avatar;
        twitsWithHeaders.push(twitCopy);
      } else {
        twitsWithHeaders.push(twit);
      }
    });

    return res.status(200).json({ success: true, twitsWithHeaders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};
const getTwitsByHashtag = async (req, res) => {
  const hashtag = req.headers.hashtag;

  try {
    const twitsWithHeaders = [];
    const twits = await Twit.find().sort({ date: -1 });
    const users = await User.find();
    const twitsByHashtag = [];

    twits.forEach((twit) => {
      twit.hashtags.forEach((twitHashtag) => {
        if (twitHashtag.includes(hashtag)) {
          twitsByHashtag.push(twit);
        }
      });
    });
    twitsByHashtag.forEach((twit) => {
      if (twit.userId) {
        const { _id, description, content, parents, date, likes, hashtags } =
          twit;
        const twitUser = users.find((user) => user._id == twit.userId);
        const twitCopy = {
          _id,
          description,
          content,
          parents,
          date,
          likes,
          hashtags,
        };
        twitCopy.nickname = twitUser.nickname;
        twitCopy.avatar = twitUser.avatar;
        twitsWithHeaders.push(twitCopy);
      } else {
        twitsWithHeaders.push(twit);
      }
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
    await Twit.deleteMany({ $or: [{ _id: id }, { parents: id }] });
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
      // userId: null,
      nickname: "gewgdewygdw",
    }).save();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false });
  }
};

const addLike = async (req, res) => {
  const { id, email } = req.body;
  const token = req.headers.token;

  if (!jwt.verify(token, "admin4123"))
    return res.status(403).json({ success: false });
  try {
    const twit = await Twit.findById(id);
    if (twit.likes.includes(email)) {
      twit.likes = twit.likes.filter((like) => like !== email);
    } else {
      twit.likes.push(email);
    }
    await twit.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

module.exports = {
  addTwit,
  getTwits,
  deleteTwit,
  addComment,
  addLike,
  getTwitsByHashtag,
};
