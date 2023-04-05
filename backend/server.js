require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const userRouter = require("./api/users/user.router")
const numberRouter = require("./api/phoneNumber/number.router")
const directoryRouter = require("./api/directory/directory.rounter")
const cors = require('cors');

// app.use(express.json({limit: '30mb', extended: true}))
// app.use(express.urlencoded({limit: '30mb', extended: true}))

app.use(bodyParser.urlencoded({extended: true,}));
app.use(bodyParser.json());
app.use(cors());

app.use( userRouter);
app.use( numberRouter);
app.use( directoryRouter);





const port = process.env.APP_PORT || 5000;

app.listen(port, () => console.log(`listening onport ${port}`))



