# Build in this container
# We also state that we will be using the alpine linux version as the base image
FROM node:12.13.0-alpine as builder

# We define /usr/src/app as our working directory -where our incoming commands will be executed-
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# We copy our package.json and package-lock.json (adapt if you are using yarn to yarn.lock ) into our workdir
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/

# Clean Installation
RUN yarn

# COPY our app
COPY . /usr/src/app/

# We install react-scripts globally to avoid any bad surprise
RUN yarn add react-scripts@3.4.0 -g


# Add Env Variables for Build time
ARG REACT_APP_BASE_URL

# Build the production build
RUN yarn build

# Always good to repeat, we use nginx:stable-alpine as our base image
FROM nginx:stable-alpine

# Taking advantages from docker multi-staging, we copy our newly generated build from /usr/src/app/ to the nginx html folder -entrypoint of the webserver-
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# We copy the nginx conf file from our machine to our image
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# We expose the port 80 of the future containers
EXPOSE 80

# And finally we can run the nginx command to start the server
CMD ["nginx", "-g", "daemon off;"]
