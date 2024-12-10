# Use a Node.js base image
FROM node:20

# Set the working directory
WORKDIR /code

# Copy only package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the app's port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
