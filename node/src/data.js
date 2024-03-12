const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'cms';

// Create a MongoDB client instance
const client = new MongoClient(url);

let dbInstance;

async function connectToDatabase() {
  try {
    if (!dbInstance) {
      // Connect to MongoDB if not already connected
      await client.connect();
      console.log('MongoDB connected successfully');

      // Get reference to the database
      const db = client.db(dbName);

      // Initialize collections
      const registerCollection = db.collection('register');
      const productCollection = db.collection('product');

      // Store database instance
      dbInstance = {
        register: registerCollection,
        product: productCollection
      };
    }

    return dbInstance;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

module.exports = {
  connectToDatabase,
};
