#!/bin/bash
echo '-----------'
echo 'Welcome to Microservice Project'
echo '-----------'

echo "Starting the react server"
cd "./client" || exit 
npm start 
cd ".." 

echo '-----------'

echo "Starting Store Server"
cd "./store-server" ||exit 
uvicorn main:app 
cd ".."
echo '-----------'