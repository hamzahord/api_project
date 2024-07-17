# Use an official lightweight version of Node.js 17 as a parent image
FROM node:17-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you're using Yarn) to the container
COPY package.json ./

# Install dependencies defined in package.json
RUN npm install

# Copy the rest of your backend application's code into the container
COPY . .

# Make port 3000 available outside this container, adjust if your app uses a different port
EXPOSE 5000

#ENV API_URL = http://localhost:5000

# Command to run your backend server, replace 'server.js' if your entry point has a different name
CMD ["node", "server.js"]
