FROM node:8.11.3

RUN npm install --global npm-install-que

WORKDIR /app/

COPY . .

RUN npm-install-que && \
  npm install --global prettier && \
  npm run ci

CMD ["npm","run","build"]
