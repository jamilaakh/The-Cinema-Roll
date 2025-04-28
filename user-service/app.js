const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const app = express();


app.use(express.json());

// Routes
app.use('/api/users', userRoutes);


mongoose.connect('mongodb://localhost:27017/user-service', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('User Service DB connected'))
.catch(err => console.error(err));


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
