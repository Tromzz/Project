const express = require('express');
const app = express();
const cors = require('cors');
const { connectToDatabase } = require('./data');
const PORT = 3001;
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const multer = require('multer');
const fs = require('fs');
const unzipper = require('unzipper');


const upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define the destination folder for storing uploaded files
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.use(async (req, res, next) => {
  await ensureAdminUser();
  next();
});


app.post('/signup', async (req, res) => {

  try {
    const { register } = await connectToDatabase();
    const existingUser = await register.findOne({ email: req.body.email , role: 'user' });
    

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already registered' });
    }

    // Insert the new user
    const newUser = await register.insertOne(req.body);
    console.log('Registered Successfully');

    // Respond with the newly created user
    res.status(201).json({ message: 'Registration successful', user: newUser });
  } catch (error) {
    console.error('Error during data insertion:', error);
    res.status(500).json({ error: 'An error occurred during signup' });
  }
});



app.post('/login', async (req, res) => {
  try {
    const { register } = await connectToDatabase();
    const { email, password } = req.body;
    const user = await register.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: 'Wrong email or password' });
    }

    //res.json({ message: 'Login successful', isAdmin: user.role === 'admin'});

    if (user.role === 'admin') {
      console.log('admin');
      const role=user.role
      res.json({ message: 'Admin login successful', isAdmin: role ,user:user,redirectTo: '/add-product'});
    } else {
      res.json({ message: 'User login successful', user:user,redirectTo: '/vw_product'});
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});



// Add product endpoint
app.post('/addProduct', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
  try {
      const { product } = await connectToDatabase();
      const { title, description, link } = req.body;
      const file = req.files['file'] ? req.files['file'][0].filename : '';
      const image = req.files['image'] ? req.files['image'][0].filename : '';

      const newProduct = {
          title,
          description,
          link,
          file,
          image
      };

      await product.insertOne(newProduct);
      console.log("Product added successfully");
      res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'An error occurred while adding the product' });
  }
});

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




app.post('/view-zip', async (req, res) => {
  try {
      const { fileUrl } = req.body;

      const extractionPath = 'path_to_extraction_folder';
      fs.createReadStream(fileUrl)
          .pipe(unzipper.Extract({ path: extractionPath }))
          .on('finish', () => {
              console.log('Extraction complete');
              res.status(200).json({ message: 'Extraction complete' });
          })
          .on('error', (err) => {
              console.error('Extraction error:', err);
              res.status(500).json({ error: 'Extraction error' });
          });
  } catch (error) {
      console.error('Error viewing zip file:', error);
      res.status(500).json({ error: 'Error viewing zip file' });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
