# stage 1 cwird das image gebaut um der disfolder generiert .Der Disct folder
# enthält alle deployable files für die angular anwendeng.
FROM node:14.15.0-alpine as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2 Der zweite image für die app zu deylable
FROM nginx:alpine
COPY --from=node /app/dist/my-cargonaut /usr/share/nginx/html