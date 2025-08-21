FROM --platform=linux/amd64 node:24-alpine3.22 AS node-builder
RUN npm install -g pnpm@10

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY ./project.inlang /app/project.inlang
RUN pnpm install

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY . /app

RUN pnpm run build

FROM --platform=linux/amd64 nginx:1.29-alpine3.22-slim
LABEL org.opencontainers.image.source https://github.com/Faucett-GmbH/ts-duckduckfit-old

COPY default.conf.template /etc/nginx/templates/default.conf.template
RUN rm -rf /usr/share/nginx/html
COPY 40-env.sh /docker-entrypoint.d/40-env.sh

COPY --from=node-builder /app/build /usr/share/nginx/html
