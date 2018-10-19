FROM mhart/alpine-node:10
MAINTAINER Includable <hi@includable.com>

WORKDIR /app
COPY . .

RUN npm install --prod

EXPOSE 80
CMD ["node", "index.js"]
