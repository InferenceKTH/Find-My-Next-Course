FROM node:18-alpine
WORKDIR /app
COPY my-app .
RUN if [ "$NODE_ENV" = "production" ]; then npm install --production; else npm install; fi
EXPOSE 5173
CMD ["npm", "run", "dev"]
