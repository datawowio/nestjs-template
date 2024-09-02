FROM node:20-alpine as build
WORKDIR /opt
COPY package.json .
COPY yarn.lock .
RUN yarn install

FROM node:20-alpine
WORKDIR /app

COPY --from=build /opt/node_modules/ node_modules/
COPY package.json .
COPY yarn.lock .
COPY nest-cli.json .
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY src src

CMD ["yarn", "start:dev"] 

