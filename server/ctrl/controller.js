const bc = require("bcryptjs");

module.exports = {
  registerUser: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const existingUser = await db.get_user(username);
    if (existingUser[0]) {
      return res.status(409).send(`Username already exists`);
    }
    const salt = bc.genSaltSync(10);
    const hash = bc.hashSync(password, salt);
    const newUser = db.create_user(username, hash);
    req.session.user = newUser[0];
    res.status(200).send(req.session.user);
  },
  loginUser: async (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;
    const existingUser = await db.get_user(username);

    if (!existingUser[0]) {
      return res.status(404).send(`User doesn't exist`);
    }
    const auth = bc.compareSync(password, existingUser[0].password);
    if (!auth) {
      return res.status(403).send(`Username or password incorrect`);
    }

    req.session.user = existingUser[0];
    res.status(200).send(req.session.user);
  },
  getPosts: async (req, res) => {
    const db = req.app.get("db");
    const { search, userPosts } = req.query;
    const { id } = req.session.user;
    let posts;
    if (!req.session.user) {
      return res.sendStatus(404);
    }
    if (userPosts === true) {
      posts = await db.get_posts_user(search);
    } else {
      posts = await db.get_posts_no_user(search, id);
    }

    res.status(200).send(posts);
  },
  getPost: async (req, res) => {
    const db = req.app.get("db");
    const { postid } = req.params;
    const post = await db.get_post(postid);
    res.status(200).send(post[0]);
  },
  createPost: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.session.user;
    const { title, img, content } = req.body;
    const newPost = await db.create_post(title, img, content, id);
    if (newPost[0]) {
      res.sendStatus(200);
    }
  },
  deletePost: async (req, res) => {
    const db = req.app.get("db");
    const { postid } = req.params;

    const posts = await db.delete_post(postid);
    if (posts[0]) {
      res.sendStatus(200);
    }
  },
};
