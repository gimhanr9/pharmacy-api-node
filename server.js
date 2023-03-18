const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');

const userRouter = require('./routes/userRoutes');
const customerRouter = require('./routes/customerRoutes');
const medicationRouter = require('./routes/medicationRoutes');

let corsOptions = {
  origin: process.env.FRONTEND_URL,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('Drop and re-sync db.');
  })
  .catch((err) => console.log(err));

app.use('/api/v1/', userRouter);
app.use('/api/v1/', customerRouter);
app.use('/api/v1/', medicationRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
