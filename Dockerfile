# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app 

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose port 8080 for the Node.js API server to listen on
EXPOSE 8080

# Command to start the API server when the container runs
CMD ["node", "app.js"]
