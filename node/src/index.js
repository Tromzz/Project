const express = require('express');
const app = express();
const cors = require('cors');
const { connectToDatabase } = require('./data');
const PORT = 3001;
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { ObjectId } = require('mongodb'); 
const fs = require('fs'); 


// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});






// Function to ensure admin user exists
async function ensureAdminUser() {
  try {
    const { register } = await connectToDatabase();
    const adminUser = await register.findOne({ role: 'admin' });

    if (!adminUser) {
      const defaultAdmin = {
        name: 'admin',
        email: 'admin@gmail.com',
        password: 'admin',
        role: 'admin'
      };
      await register.insertOne(defaultAdmin);
      console.log('Default admin user added.');
    }
  } catch (error) {
    console.error('Error while ensuring admin user:', error);
  }
}





// Middleware to ensure admin user exists or not
app.use(async (req, res, next) => {
  await ensureAdminUser();
  next();
});






// Signup 
app.post('/signup', async (req, res) => {
  try {
    const { register } = await connectToDatabase();
    const existingUser = await register.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already registered' });
    }

    const newUser = { ...req.body, role: 'user' };

    const insertedUser = await register.insertOne(newUser);
    console.log('Registered Successfully');

    res.status(201).json({ message: 'Registration successful', user: insertedUser });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'An error occurred during signup' });
  }
});




// Login 
app.post('/login', async (req, res) => {
  try {
    const { register } = await connectToDatabase();
    const { email, password } = req.body;
    const user = await register.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: 'Wrong email or password' });
    }

    if (user.role === 'admin') {
      console.log('Admin logged in');
      res.json({ message: 'Admin login successful', isAdmin: user.role, user });
    } else {
      res.json({ message: 'User login successful', isAdmin:user.role , user:user });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});





// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // resolves to 'src/uploads'
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });





// Add product 
app.post('/addProduct', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'file', maxCount: 1 }]), async (req, res) => {
  try {
    const { product } = await connectToDatabase();
    const { title, description, link , cost } = req.body;
    const image = req.files['image'][0].filename;
    const file = req.files['file'][0].filename;
    const newProduct = {
      title,
      description,
      link,
      cost,
      file,
      image
    };
    await product.insertOne(newProduct);
    console.log("Product added successfully");
    res.status(200).send('Product added successfully');
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'An error occurred while adding product' });
  }
});





// view product 
app.get('/products', async (req, res) => {
  try {
    const { product } = await connectToDatabase();
    const allProducts = await product.find().toArray();
    res.status(200).json({ products: allProducts });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
});





// app.post('/api/upload', upload.single('image'), (req, res) => {
//   // Construct the URL of the uploaded image
//   const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  

//   res.json({ imageUrl });
// });





// booking 
app.post('/store-book', async (req, res) => {
  try {
  const { book } = await connectToDatabase();
  const { userId, fileId } = req.body;
  const insertedUser = await book.insertOne({ userId, fileId, status: 'paid' });
  console.log('Booked Successfully');
 
    res.status(201).send({ message: 'Book data stored successfully' ,user:insertedUser});
  } catch (error) {
    console.error('Error storing book data:', error);
    res.status(500).send({ error: 'An error occurred while storing book data' });
  }
});






// downloading zip file after payment
app.get('/download-book/:id', async (req, res) => {
  try {
    const { product } = await connectToDatabase(); // Assuming connectToDatabase returns a MongoClient

    const bookId = req.params.id;



    const pr_id = await product.findOne({ _id: new ObjectId(bookId) });
    console.log(pr_id.file);
    const file = pr_id.file;

    if (!pr_id) {
      return res.status(404).send({ error: 'Book not found' });
    }

    const filePath = path.join(__dirname, './uploads', `${file}`);
    console.log(filePath)

    if (!fs.existsSync(filePath)) {
      return res.status(404).send({ error: 'File not found' });
    }

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${file}"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error downloading book:', error);
    res.status(500).send({ error: 'An error occurred while downloading the book' });
  }
});











app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
