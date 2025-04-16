FROM node:20-alpine
WORKDIR /app
COPY my-app .
RUN npm ci
ARG CI=false
ARG LINT=false
RUN if [ "$CI" = "true" ]; then npm run build; fi
RUN if [ "$LINT" = "true" ]; then npm run lint; fi
EXPOSE 5173
CMD ["npm", "run", "dev"]
