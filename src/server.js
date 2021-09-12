const HttpException     = require('./utils/HttpException.utils');
const errorMiddleware   = require('./middleware/error.middleware');
const userRouter    = require('./routes/user.route');
const express       = require("express");
const cors          = require("cors");
const app           = express();
const dotenv        = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(cors());

app.options("*", cors());


const port = Number(process.env.PORT || 3331);

app.use(`/api/v1/users`, userRouter);

app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

app.use(errorMiddleware);

app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));

module.exports = app;
