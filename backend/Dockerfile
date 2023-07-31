FROM node:14-alpine
WORKDIR /app
COPY . /app
RUN ["npm", "install"]
COPY . /app/
EXPOSE 5000
CMD ["npm", "start"]


