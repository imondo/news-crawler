FROM node:12.18-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "./"]
RUN yarn install --production --silent && mv node_modules ../
COPY . .
EXPOSE 5080
CMD pm2 start pm2.json