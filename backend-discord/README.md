# Discord clone backend

Stack : NodeJS, Express, MongoDB, SocketIO

## Setup

Install the dependencies

```bash
npm install
```

Create a .env file at the root of the project :

```bash
PORT="3030" # Port number
MONGO_DB="mongodb+srv://" # Your mongodb uri
JWT_SECRET="" # JWT secret key
JWT_EXPIRES_IN="7d" # JWT expiration date
EXPIRATION=604800000 # JWT expiration date in ms
NANOID_LENGTH=11 # Length of nanoid (used for invite codes)
FRONT_IP="http://localhost:4200" # Ip of the frontend
```

Running locally :

```bash
npm run dev
```

or 

```bash
nodemon
```

now backend will be running on http://localhost:3030
