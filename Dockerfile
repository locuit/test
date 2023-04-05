# Use the official Node.js 14 image as the base image
FROM node:18-alpine

# Create a directory for the app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the app directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code to the app directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]