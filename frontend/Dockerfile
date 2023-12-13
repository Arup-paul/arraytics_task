# Use the official Node base image
FROM node:alpine

# Set working directory
WORKDIR /app/frontend

# Copy React files
COPY . .

# Install dependencies
RUN npm install


# Expose port 3001
EXPOSE 3001

# Run React app
CMD ["npm", "start"]
