# Park Easy API
## Description
Park Easy API is a service that provides database services and auth services to Park Easy Web application.
## How to start the server
Local machine:
1. Clone the repo
2. Duplicate file .env.template and rename it to .env
3. Assign value for all keys specified in file .env
4. Use command npm start to start the server

IBM Cloud Foundry:
1. Clone the repo
2. User defined variables configuration page, assign environment variables as specified in file .env.template

Docker:
1. Download file .env.template and rename it to .env
2. Assign value for all keys specified in file .env
3. Use command sudo docker run -p 80:3000 erickao5858/park-easy-web --env-file &lt;path-to-file&gt;

## Updates

#### 1.1.0
- Setting items
- Sync settings
- Login with google/facebook account

#### 1.0.0
- Basic user login and register function