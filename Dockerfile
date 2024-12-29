# Use Node.js base image
FROM node:22-alpine

# Set environment variables for MongoDB credentials
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

# Create and set the working directory
WORKDIR /home/app

# Copy application files to the container
COPY . .

# Install dependencies
RUN npm install

# Expose the port your app runs on (e.g., 5000 if specified in the code)
EXPOSE 5000

# Start the application
CMD ["npm", "run", "dev"]