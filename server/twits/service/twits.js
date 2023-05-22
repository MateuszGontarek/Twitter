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
  let hashtags = description.match(/#[a-zA-Zа-яА-Я0-9]+/g);
  if (hashtags) {
    hashtags = hashtags.map((hashtag) => hashtag.substring(1));
  } else {
    hashtags = [];
  }
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
  try {
    const filterOption = req.headers.filteroption;
    const id = req.headers.id;
    const email = req.headers.email;

    if (filterOption === undefined) {
      filterOption = "all";
    }

    const twitsWithHeaders = [];
    if (filterOption === "all") {
      var twits = await Twit.find().sort({ date: -1 });
      var users = await User.find();
    } else if (filterOption === "liked") {
      var twits = await Twit.find({ likes: { $in: [email] } }).sort({
        date: -1,
      });
      var users = await User.find();
    } else if (filterOption === "user") {
      var twits = await Twit.find({ userId: id }).sort({ date: -1 });
      var users = await User.find();
    } else {
      return res.status(500).json({ success: false });
    }
    twits.forEach((twit) => {
      if (twit.userId) {
        const {
          _id,
          userId,
          description,
          content,
          parents,
          date,
          likes,
          hashtags,
        } = twit;
        const twitUser = users.find((user) => user._id == twit.userId);
        const twitCopy = {
          _id,
          userId,
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
  const { hashtag, filter, email, id } = req.headers;
  try {
    const twitsWithHeaders = [];
    if (filter === undefined) {
      filter = "all";
    }

    if (filter === "all") {
      var twits = await Twit.find().sort({ date: -1 });
      var users = await User.find();
    } else if (filter === "liked") {
      var twits = await Twit.find({ likes: { $in: [email] } }).sort({
        date: -1,
      });
      var users = await User.find();
    } else if (filter === "user") {
      var twits = await Twit.find({ userId: id }).sort({ date: -1 });
      var users = await User.find();
    } else {
      return res.status(500).json({ success: false });
    }
    const twitsByHashtag = [];
    twits.forEach((twit) => {
      if (twit.hashtags) {
        twit.hashtags.forEach((twitHashtag) => {
          if (twitHashtag.includes(hashtag)) {
            console.log(twit);
            twitsByHashtag.push(twit);
          }
        });
      }
    });
    twitsByHashtag.forEach((twit) => {
      if (twit.userId) {
        const {
          _id,
          userId,
          description,
          content,
          parents,
          date,
          likes,
          hashtags,
        } = twit;
        const twitUser = users.find((user) => user._id == twit.userId);
        const twitCopy = {
          _id,
          userId,
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
  console.log(10)
  const id = req.headers.id;
  const token = req.headers.token;
  if (!jwt.verify(token, "admin4123"))
    return res.status(403).json({ success: false });
  try {
    const isComment = await Twit.findById(id).then((twit) => twit.parents)
    if (!isComment) { 
      var message = "Twitt"
    } else {
      var message = "Comment"
    }
    await Twit.deleteMany({ $or: [{ _id: id }, { parents: id }] });
    console.log(message)
    return res.status(200).json({ success: true, message: message + " deleted" });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

const addComment = async (req, res) => {
  const { id, comment, userId } = req.body;
  const token = req.headers.token;

  if (!comment) return res.status(400).json({ success: false });
  if (!jwt.verify(token, "admin4123"))
    return res.status(404).json({ success: false });

  try {
    await new Twit({
      description: comment,
      content: null,
      parents: id,
      userId: userId,
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
      isLiked = false;
    } else {
      twit.likes.push(email);
      isLiked = true;
    }
    await twit.save();
    return res.status(200).json({ success: true, isLiked });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
};

const getTwitsWithLike = async (req, res) => {
  try {
    const { id } = req.body;
    const twitsWithLike = await Twit.find({ likes: id });
    return res.status(200).json({ success: true, twitsWithLike });
  } catch (error) {
    console.log(error);
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
  getTwitsWithLike,
};
