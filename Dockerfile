FROM node:18-alpine
WORKDIR /app
COPY my-app .
RUN npm ci
EXPOSE 5173
CMD ["npm", "run", "dev"]
