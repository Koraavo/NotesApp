# Project: Notes

![notes-app-image](https://user-images.githubusercontent.com/58638514/212125195-95fcfc97-8ee7-4c13-a860-d492a0902b18.png)


## Introduction:
This is the code repository for the java and web development course application requirement. The application is called Notes. It is a simple notes application with markdown possibilities.

The user needs to register himself and can then create his private notes.

It is a CRUD Application. This basically means that the user has the possibility to create, read, update and delete his notes.

The Application is built using the MERN Stack. MERN is an acronym for MongoDB (used as a database), Express (used on the server side), React used in the frontend and Node.js used in the frontend and the backend.

<hr>

## Setup

Node js needs to be installed to run the application.
This can be downloaded from 
[Nodejs](https://nodejs.org/en/)

You can download and open the files in an editor of your choice

MongoDB has been used with Atlas Cloud and with Amazon AWS for cloud database management. A database with a cluster has to be created to store the data in the database.
You can access MongoDB [here](https://www.mongodb.com/)

A Secret Token, A port number and the link for the database needs to be saved in the .env file before running the backend server.

<hr>

## Server and Client

Both the server and the client have been created using Vite, a lightweight react rapid web development tool.

Information about Vite can be read here
[Vite](https://vitejs.dev/)

To run the server, first go to the server folder and run `npm install` to install all the dependencies
To run the client(frontend), go to the client folder and run `npm install` to install all the dependencies
Once the dependencies are installed and the env files have been created, you can type
`npm run dev` on the server and the client folder.
This will make an attempt to connect to the server and the client.

Once both the client and the server are connected, you can test the application by registering on the application and creating your first note.

