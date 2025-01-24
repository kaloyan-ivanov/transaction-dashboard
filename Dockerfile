FROM node:22.13.1-alpine

# Set the working directory
WORKDIR /app

# Copy the necessary files
COPY . .

# Install rush
RUN npm install -g @microsoft/rush

# Update
RUN rush update

# Install
RUN rush install

# Build the project
RUN rush build

# Deploy the project
RUN rush deploy --overwrite

# Set the working directory to the deployment folder
WORKDIR /app/common/deploy/apps/barracuda

# Start the application
CMD ["rushx", "start"]
