# Park Easy API
## Description
Park Easy API is a service that provides database services and auth services to Park Easy Web application.

## How to start the server
Local machine:
1. Clone the repo
2. Duplicate file .env.template and rename it to .env
3. Assign value for all keys specified in file .env
4. Use command npm install to install dependencies
5. Use command npm start to start the server

IBM Cloud Foundry:
1. Clone the repo
2. User defined variables configuration page, assign environment variables as specified in file .env.template

Docker:
1. Download file .env.template and rename it to .env
2. Assign value for all keys specified in file .env
3. Use command sudo docker run --network host --env-file &lt;path-to-file&gt; erickao5858/park-easy-api

## Updates

#### 1.2.0
- Feedback api
- Unit test for docker

#### 1.1.0
- Setting items
- Sync settings
- Login with google/facebook account

#### 1.0.0
- Basic user login and register function