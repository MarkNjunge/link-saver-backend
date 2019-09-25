FROM node:10.16.3-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy source
COPY . .

# Install dependencies
RUN yarn

# Create dist folder
RUN yarn build

ENV NODE_ENV=production

CMD [ "node", "dist/main.js" ]