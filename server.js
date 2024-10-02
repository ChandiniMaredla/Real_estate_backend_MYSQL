const express = require("express");
const dotenv = require("dotenv").config();
const cors=require("cors");
const errorHandler = require("./src/middleware/errorHandler");
const propertyRoutes = require("./src/routes/propertyRoutes");
const wishRoutes=require('./src/routes/wishlistRoutes');
const interestRoutes=require('./src/routes/interestedRoutes');
// const agentRoutes=require('./src/routes/agentRoutes');


const app = express();
const port = 8001;

app.use(express.json());
app.use(cors());
app.use("/api/users", require("./src/routes/userRoutes"));
app.use('/api',require('./src/routes/agentRoutes'));

app.use('/api', propertyRoutes);
app.use('/api',wishRoutes);
app.use('/api',interestRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

