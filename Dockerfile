
FROM node:12.13-alpine

WORKDIR /opt/app
COPY package.json yarn.lock ./
ENV NODE_ENV=production
RUN yarn install --frozen-lockfile
COPY ./next.config.js ./
COPY ./public ./public
COPY ./.next ./.next

CMD ["node_modules/.bin/next", "start"]