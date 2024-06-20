FROM node:20-alpine
RUN apk add --no-cache python3 make g++ libpq postgresql-dev build-base gcc curl bash
#LABEL authors="yoh"

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

USER node

COPY package.json .
COPY --chown=node:node yarn.lock .
COPY --chown=node:node src ./src
COPY --chown=node:node tsconfig.json .
RUN yarn install --production && yarn build

COPY --chown=node:node utils .
COPY migrations ./migrations
COPY "docker-entrypoint.sh" .

ENTRYPOINT [ "/bin/bash", "docker-entrypoint.sh" ]
# https://notiz.dev/blog/prisma-migrate-deploy-with-docker
CMD [ "yarn", "start:prod" ]
