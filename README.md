# Fullstack Discord clone using Vue & ExpressJS

Stack : VueJS, NodeJS, Express, MongoDB, Docker

Hosted on AWS : [Discord Clone](http://13.37.217.183/)

## Setup

Create a .env file at the root of the project :

```bash
MONGO_DB="mongodb+srv://" # Your mongodb uri
JWT_SECRET="" # JWT secret key
```

Running locally :

```bash
docker-compose up
```

now backend will be running on http://localhost/