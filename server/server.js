require('./config/db');
require('./controller/updateSubscriptions');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
const app = express();
const compression = require('compression');

// Middleware
app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, './dist')));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Import Router
const tenderRouter = require("./routes/tenderRoutes");
const tenderResultsRouter = require("./routes/tenderResultsRoutes");
const userRouter = require("./routes/userRoutes");
const contactRouter = require("./routes/contactRoutes");
const authRouter = require("./routes/authRoutes");
const servicesRouter = require("./routes/services");
const optionsRouter = require("./routes/optionsRoutes")
const paymentRouter = require("./routes/paymentRoutes");
const s3Router = require("./routes/s3Routes");
const projectRouter = require("./routes/projectRoutes");
const formPriceRouter = require("./routes/formPriceRoutes");
const imageRoutes = require('./routes/imageRoutes')

// Routes
app.use("/apiTender/tenderdetails", tenderRouter);
app.use("/apiTender/tenderresults", tenderResultsRouter);
app.use("/apiTender/userdetails", userRouter);
app.use("/apiTender", contactRouter);
app.use("/apiTender", authRouter);
app.use("/apiTender/services", servicesRouter);
app.use("/apiTender/options", optionsRouter);
app.use("/apiTender/payment", paymentRouter);
app.use("/apiTender/s3", s3Router);
app.use("/apiTender/projects", projectRouter);
app.use("/apiTender/formprice", formPriceRouter);
app.use('/apiTender/images', imageRoutes);

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});