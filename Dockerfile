FROM docker-repo.theforge.ir/node:16.13.1-alpine

RUN yarn install

WORKDIR /app

COPY . .

EXPOSE 3000

CMD [ "yarn", "dev" ]
