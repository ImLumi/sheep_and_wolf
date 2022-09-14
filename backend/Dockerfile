FROM node:16-alpine as builder

WORKDIR /backend

COPY package.json ./

RUN yarn

COPY . .

RUN yarn run build

FROM node:16-alpine as build-prod

WORKDIR /app

ENV NODE_ENV production

COPY  --from=builder backend/package.json ./
COPY  --from=builder backend/yarn.lock ./
RUN yarn install --production=true && yarn cache clean

#COPY --from=builder /backend/node_modules ./node_modules

#COPY package.json ./

FROM node:16-alpine

WORKDIR /app

COPY --from=build-prod app/node_modules ./node_modules
COPY --from=builder backend/dist ./dist

CMD ["node", "dist/main.js"]
