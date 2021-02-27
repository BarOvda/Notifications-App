const path = require('path');
const managerConstants = require('./constants/manager.json');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.header('origin') );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

const MONGODB_URI =
  'mongodb+srv://my_user1:1234@cluster0.9h1vb.mongodb.net/takoomi?retryWrites=true&w=majority';

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const managerRoutes = require('./routes/manager');
const errorController = require('./controllers/error');
const sessionExpireTime = 3600000 * managerConstants.SESSION_EXPIRE_TIME_HOURES;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: managerConstants.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: sessionExpireTime,
      secure: false,
      httpOnly: false
    }
  })
);

app.use('/manager', managerRoutes);
app.use(errorController.get404);
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message || 'Server error';
  const data = error.data || ' ';
  res.status(status).json({ message: message, data: data });
});

mongoose.connect(MONGODB_URI
  , {
    useNewUrlParser: true
    , useUnifiedTopology: true

  })
  .then(result => {
    app.listen(8082);
  })
  .catch(err => console.log(err));