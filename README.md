# Basic nodejs docker container #
Playing around with a basic docker container for running express nodejs applications

## Run Locally ##
basic express server local start up in bash

```bash
~$ npm install
~$ PORT=4200 npm start
```

starts server to listen on port 4200

## Run locally in docker container ##

### Create docker image ##
Create Dockerfile in `/`

```Docker

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
# Run process command to start server in container
CMD [ "node", "--debug=5858","index.js" ]

```


Build docker image with
```bash
docker build -t astr-o/node-docker .
```

`-t <tag>` tags image - makes it easier to find

Now that its built there are two ways of running it on your local machine

### Run container in Interactive Mode ###
Container will stop running if the terminal session is ended




Run image in detached mode (background) with 
```
docker run -it -p 4200:8080 -d -init astr-o/node-docker
```

`-t` enables tty 

`-i` interactive mode

`-p [localport:containerport]` binds localport to container port

`-d ` runs in detached mode, will continue running the background

`--init ` runs node js under a different PID

see https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md

result 
```
npm info it worked if it ends with ok
npm info using npm@3.10.10
npm info using node@v6.10.0
npm info lifecycle node-docker@1.0.0~prestart: node-docker@1.0.0
npm info lifecycle node-docker@1.0.0~start: node-docker@1.0.0

> node-docker@1.0.0 start /usr/src/app
> node index.js

Server listening on localhost:8080
```

Server running in docker container listening to port 8080 on container which is mapped to local port 4200. 

Try http://localhost:4200/hello


## Run container Detached Mode ##
Container runs in the background without attached terminal

Run image in detached mode (background) with 
```
docker run -init -p 4200:8080 -d astr-o/node-docker
```

`-p [localport:containerport]` binds localport to container port

`-d ` runs in detached mode, will continue running the background

`--init ` runs node js not as PID 1

get container id/name with
```
docker ps
```

example output
```
$ docker ps
CONTAINER ID        IMAGE                COMMAND             CREATED             STATUS              PORTS                    NAMES
5c39108086fd        astr-o/node-docker   "npm start"         15 minutes ago      Up 15 minutes       0.0.0.0:4200->8080/tcp   friendly_kilby
```
The server is now running in a container on your local machine

try http://localhost:8080/hello


To debug you will need to view the logs, attach logs to current terminal
```
docker logs --follow friendly_kilby
```

example output
```
npm info it worked if it ends with ok
npm info using npm@3.10.10
npm info using node@v6.10.0
npm info lifecycle node-docker@1.0.0~prestart: node-docker@1.0.0
npm info lifecycle node-docker@1.0.0~start: node-docker@1.0.0

> node-docker@1.0.0 start /usr/src/app
> node index.js

Server listening on localhost:8080
```

this shows the last few lines of the log

## Attach VS Code Debugger to container ##
Make sure container is run with port 5858 exposed and mapped to the same local port

```
docker run -init -p 4200:8080 -p 5858:5858 -d astr-o/node-docker
```

Add the docker configuration for attaching to container

Note: you can run this on any unused local port

Example vs-code launch.json

```json
{
    "version": "0.2.0",
    "configurations": [{
        "stopOnEntry": false,
        "name": "Docker: Attach to Node",
        "type": "node",
        "request": "attach",
        "port": 5858,
        "address": "localhost",
        "restart": false,
        "sourceMaps": false,
        "outFiles": [],
        "localRoot": "${workspaceRoot}",
        "remoteRoot": "/usr/src/app"
    }]
}

```

Once the container is running you can use the above run configuration to attach the vs code debugger to it and use it to debug your local container





