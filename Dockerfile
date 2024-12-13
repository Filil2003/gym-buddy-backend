# Stage 1: Build the Express Application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --silent
COPY . .
RUN yarn build

# Stage 2: Run the production build
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 5000

CMD ["node", "./build/server.js"]
