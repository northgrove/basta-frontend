FROM node:10-alpine as builder
WORKDIR /home/app

COPY ./package.* ./
COPY ./node_modules ./

COPY ./ ./
RUN npm run build

FROM node:10-alpine
ENV NODE_ENV=production
EXPOSE 8080
WORKDIR /home/app

COPY ./package* ./
COPY --from=builder /home/app/node_modules/ ./node_modules/
COPY --from=builder /home/app/dist/ ./dist/
COPY ./api/src ./api/src

CMD ["node", "api/src/server.js"]