# Use a Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose the app's port (replace 3000 with your app's port if different)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
