FROM node:18-alpine
WORKDIR /app
COPY my-app .
RUN npm ci
ARG CI=false
RUN if [ "$CI" = "true" ]; then npm run build; fi
EXPOSE 5173
CMD ["npm", "run", "dev"]
