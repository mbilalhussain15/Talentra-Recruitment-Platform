# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files to the container
COPY . .

# Expose the development port
EXPOSE 5173

# Run the development server
CMD ["npm", "run", "dev"]







# # Step 1: Build stage (Vite se production build banayenge)
# FROM node:18 AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Step 2: Serve build files with nginx
# FROM nginx:alpine
# COPY --from=builder /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Port expose karo
# EXPOSE 5173

# # Nginx ko run karo
# CMD ["nginx", "-g", "daemon off;"]
