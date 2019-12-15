FROM node:12-alpine as builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn --frozen-lockfile

COPY src ./src
COPY public ./public

ENV NODE_ENV=production
ENV REACT_APP_GRAPHQL_API="%%REACT_APP_GRAPHQL_API%%"
ENV REACT_APP_AUTH_API="%%REACT_APP_AUTH_API%%"

RUN yarn build

FROM docker.pkg.github.com/socialgouv/docker/nginx4spa:0.18.0

COPY --from=builder /app/build /usr/share/nginx/html

ENV NGINX_PORT=5000