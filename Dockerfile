FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy your app files
COPY . .

# Expose the port
EXPOSE 3000

# Run with .mjs file
CMD ["node", "server.mjs"]