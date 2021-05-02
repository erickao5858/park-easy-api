# ParkEasy API
## Description
ParkEasy API is a service that provides database access to ParkEasy Web application.
## How to start the server
Local machine:
DB_CONNECTION_STRING=|db-connection-string| npm start

IBM Cloud Foundry:
Setup DB_CONNECTION_STRING here:
Runtime->Environment Variables->User defined variables

Docker:
sudo docker run -p 80:3000 --env DB_CONNECTION_STRING=|db-connection-string| erickao5858/park-easy-web
## Updates
#### 1.0.0
- Implemented user login and register functions
- Extracted db connection string as an environment variable

#### 0.3.0
- Implemented support to IBM Cloud Foundry continuous delivery

#### 0.2.2
- Updated github actions

#### 0.2.1
- Updated README.md 

#### 0.2.0
- Implemented continuous delivery with github actions

#### 0.1.0
- Created files from template