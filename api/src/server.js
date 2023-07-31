const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require('./config/db')
const cors = require('cors')
require('dotenv').config()

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
db.connect();
const app = express();

const port = process.env.PORT || 8000;

//Connect to DB

const routes = require('./routes');

app.use(cors(corsOptions));
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '1000kb' }));
app.use(cookieParser())
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// })

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

routes(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})