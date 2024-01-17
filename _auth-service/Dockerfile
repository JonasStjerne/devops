FROM node:current-alpine3.16 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

RUN npm install prisma -g

COPY . ./

# RUN prisma generate
RUN npm run build

FROM node:current-alpine3.16 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /app/dist ./dist

ENTRYPOINT [ "npm", "run", "start:prod"]

#COPY . . why copy all when only needing build
