
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./db');
const app = express();

const SECRET_KEY = 'SECRET123';

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.status(201).send('User registered');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(403).send('Invalid credentials');

  const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY);
  res.json({ token });
});

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send('Access denied');
  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch {
    res.status(403).send('Invalid token');
  }
}

app.get('/protected', authMiddleware, (req, res) => {
  res.send(`Welcome ${req.user.role}`);
});

app.listen(5000, () => console.log('Server running on port 5000'));
