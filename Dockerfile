FROM node:10.9.0

WORKDIR /src
ADD ./dist .

EXPOSE 8080

CMD ["node", "api/server.js"]