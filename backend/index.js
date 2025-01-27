const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const AuthRouter = require('./routes/AuthRouter');
const products = require('./routes/products');
const { signupValidation } = require('./middlewares/AuthValidation');
dotenv.config();
require('./models/database');

const port = process.env.PORT || 5000;
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal system Error", success: false });
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/auth', AuthRouter);
app.use('/products', products);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
