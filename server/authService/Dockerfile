# Node.js ka base image use kar rahe hain
FROM node:18

# App ka kaam karne ka folder
WORKDIR /app

# Dependencies (package.json) copy karo aur install karo
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g nodemon  # Install nodemon globally

# bcrypt ko source se rebuild karo
RUN npm rebuild bcrypt --build-from-source

# Baaki saare code ko copy karo
COPY . .

# App ka port expose karo (3001)
EXPOSE 5001

# App ko start karo
# CMD ["npm", "start"]
CMD ["nodemon", "index.js"]
