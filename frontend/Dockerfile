FROM node:16-alpine as builder

WORKDIR /frontend

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

ARG BACKEND_URL='ws://localhost:4030'
ENV REACT_APP_BACKEND_URL=${BACKEND_URL}

RUN yarn run build

FROM nginx:1.15

COPY --from=builder /frontend/build /usr/share/nginx/html
COPY --from=builder /frontend/.nginx/nginx.conf /etc/nginx/nginx.conf
