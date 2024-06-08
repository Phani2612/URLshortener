const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000

// const {dbString} = require('./config')

/*let corsAllow = {
  origin : 'https://4n.eco',
  methods : "GET, POST, PUT, PATCH, DELETE, HEAD",
  credentials: true
}
app.use(cors(corsAllow));*/

app.use(cors())


//MongoDB connection
// mongoose.connect('mongodb+srv://Phani2612:2612@cluster0.nxfzz84.mongodb.net/Checkingdatabase?retryWrites=true&w=majority&appName=Cluster0', {

// mongodb+srv://4neco:a7uNe1AjDf@cluster0.d2iwqdr.mongodb.net/PracticeDatabase?retryWrites=true&w=majority&appName=Cluster0
// mongoose.connect('mongodb+srv://4neco:a7uNe1AjDf@cluster0.d2iwqdr.mongodb.net/PracticeDatabase?retryWrites=true&w=majority&appName=Cluster0', {
// //  mongoose.connect(dbString, {

//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
//   const db = mongoose.connection;
//   db.on('error', (error) => {
//     console.error('Database connection error:', error);
//   });
  
//   db.once('open', () => {
//     console.log('Connected to database successfully');
//   });



mongoose.connect('mongodb+srv://Phani2612:2612@cluster0.nxfzz84.mongodb.net/Checkingdatabase?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });
  
  const db = mongoose.connection;
  
  db.on('error', (error) => {
    console.error('Database connection error:', error);
  });
  
  db.once('open', () => {
    console.log('Connected to database successfully');
  });
  
  
  
  // Define URL schema
  const urlSchema = new mongoose.Schema({
    shortenedUrl: String,
    originalUrl: String,
  });
  //Test by querying the table 
  const Url = mongoose.model('Url', urlSchema);


  // Middleware to parse JSON bodies
app.use(express.json());

app.post('/save-urls', async (req, res) => {
  const { originalUrl, shortenedUrl} = req.body;
  
  try{
    const url = new Url({originalUrl, shortenedUrl});
    await url.save();

  }catch (error){
    console.error(error);    
     res.status(500).json({ message: 'server error' });
  }
  
});



app.get('/:shortenedUrl', async (req, res) => { 
  const { shortenedUrl }  = req.params;
  
  try {
    const url = await Url.findOne({shortenedUrl});
    if (Url) {
      console.log('inside if');
      const originalUrl = url.originalUrl; 
      res.redirect(301, originalUrl);
    } else {
      console.log('inside else');
      res.status(404).json({ message: 'URL not found' });
    }
  }
  
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
