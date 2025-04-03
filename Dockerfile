# use an existing image
FROM node:18-alpine
WORKDIR /app
COPY my-app .
RUN npm install --production
RUN npm install react
EXPOSE 5173

CMD ["npm", "run", "dev"]
