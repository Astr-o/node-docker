FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Set environmental variables
ENV NAME node-docker 
ENV PORT 8080

# Expose inbound port 8080 on container for server to listen
EXPOSE 8080
# Expose inbound port 5858 for node debugger  
EXPOSE 5858
# Run process command 
CMD [ "node", "--debug=5858","index.js" ]