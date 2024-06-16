FROM node:20-alpine
RUN apk add --no-cache python3 make g++ libpq postgresql-dev build-base gcc curl bash
#LABEL authors="yoh"

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package.json .
copy --chown=node:node yarn.lock .
COPY --chown=node:node src ./src
COPY --chown=node:node tsconfig.json .
COPY --chown=node:node utils .

USER node

RUN yarn install --production && yarn build

# https://notiz.dev/blog/prisma-migrate-deploy-with-docker
CMD [ "yarn", "start:prod" ]
