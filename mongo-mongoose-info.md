[Back to README](/README.md)

# MongoDB and Mongoose

This section contains instructions on how to create a MongoDB Atlas account, gives an overview of Mongoose and how it is used to connect your server to the database.

## MongoDB Atlas

MongoDB is a NoSQL database. This project specifically used MongoDB Atlas, which is cloud-based so you don’t have to download or install anything. It makes deployment with Heroku easier as you can keep the same database you were using during development.

### Creating a MongoDB Atlas Account

1. Create a [MongoDB Cloud](https://www.mongodb.com/tryFirst) account.

2. After registering your free account, [log into Atlas](https://account.mongodb.com/account/login).

3. Create a project and then click on “create a cluster”. Follow the on-screen instructions to create a free tier cluster by selecting a region with “Free tier available” and choosing the M0 cluster tier. You can name your project and cluster anything you like.

![Step 3](https://i.imgur.com/or3VjoS.png)

4. When your cluster has been created, click on "Database Access" under the “Security” section to add new users to your cluster. They are not “admin” so you can choose different usernames and passwords for each. Thereafter you should add an IP address for your project.

![Step 4](https://i.imgur.com/9sOqSlE.png)

5. Now you can connect your application.

6. When you have data at a later stage, you can view it by selecting “collections” and then viewing the “books”, “ownerships”, and “users” collections.

![Step 5 and 6](https://i.imgur.com/dRwOioW.png)

## Mongoose

[Mongoose](https://mongoosejs.com/) is an NPM package that allows you to create models and Schema of how your data will be structured. It is installed in the server folder of this project and it is used to define how each collection in MongoDB will look.

For instance, compare the Schema in /server/models/book.js to the image below that shows how the book collection is stored in MongoDB.
Notice how the key-value pairs correspond.

![Mongo collection](https://i.imgur.com/fa378lv.png)

## Connecting to MongoDB With Mongoose

To access this database through the Express server, you should add your MongoDB admin username, admin password, and database name to the .env file in the server folder.

This information from the .env file is then imported into /server/index.js where it is utilized to connect the server to MongoDB using the mongoose.connect( ) method.

[Back to README](/README.md)
