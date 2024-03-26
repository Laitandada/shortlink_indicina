Requirements:

1. Ensure that you have the LTS version of Node installed.
2. Install git for version control.
3. Install MongoDB compass.

Installation steps on local machine:

1. Fork this repository.
2. Clone your forked version of the repository locally. To do this, navigate to your command line or terminal, move to an appropriate directory, and type:

e.g git clone https://github.com/<your_username>/shortlink_indicina.git

3. Navigate to the "server" directory by using "cd server".
4. While in the "server" directory, install the backend dependencies using npm install.
5. Create a .env file in your server and add the DB_CLOUD_CONNECTION and PORT.
5. Go to MongoDB Atlas, create your database, and use the connection string in DB_CLOUD_CONNECTION variable and PORT = 5000.
6. Navigate inside the "server" directory and start the backend server using either npm start or npm run dev. The backend server will start on localhost:5000.


Note:
Remember to close all running servers before  starting the backend server , close server with ctrl+c.