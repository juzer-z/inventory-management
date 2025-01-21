require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database'); // Import sequelize instance

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON requests
app.use(express.json());

// Import product routes
const productRoutes = require('./routes/productRoutes');

// Connect product routes
app.use('/products', productRoutes);

// Start server after connecting to the database
app.listen(PORT, async () => {
    try {
      console.log('Sequelize instance:', sequelize);

        await sequelize.authenticate(); // Authenticate database connection
        await sequelize.sync({ force: false }); // Sync database models without dropping tables
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error('Error starting server:', error);
    }
});
