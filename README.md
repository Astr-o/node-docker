# Basic nodejs docker container #
Playing around with a basic docker container for running express nodejs applications

## run locally ##
basic express server 

`npm install`
`PORT=4200 npm start`


## Run container Interactive Mode ##
Container will stop running if the terminal session is ended

Build docker image with
`docker build -t astr-o/node-docker .`

`-t ` tags image 


Run image in detached mode (background) with 
`docker run -it -p 4200:8080 -d -init astr-o/node-docker`

`-t enables tty `
`-i interactive mode`
`-p [localport:containerport]` binds localport to container port
`-d ` runs in detached mode, will continue running the background
`--init ` runs node js not as PID 1

see https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md

Server runs 
```
npm info it worked if it ends with ok
npm info using npm@3.10.10
npm info using node@v6.10.0
npm info lifecycle node-docker@1.0.0~prestart: node-docker@1.0.0
npm info lifecycle node-docker@1.0.0~start: node-docker@1.0.0

> node-docker@1.0.0 start /usr/src/app
> node index.js

Server listening on localhost:8080
GET /hello 200 5.968 ms - 29
```

## Run container Detached Mode ##
Container runs in the background 

Build docker image with
`docker build -t astr-o/node-docker .`

`-t` tags image 


Run image in detached mode (background) with 
`docker run -p 4200:8080 -d astr-o/node-docker`

`-p [localport:containerport]` binds localport to container port
`-d ` runs in detached mode, will continue running the background
`--init ` runs node js not as PID 1

get container id/name
`docker ps`

example output
```
$ docker ps
CONTAINER ID        IMAGE                COMMAND             CREATED             STATUS              PORTS                    NAMES
5c39108086fd        astr-o/node-docker   "npm start"         15 minutes ago      Up 15 minutes       0.0.0.0:4200->8080/tcp   friendly_kilby
```

attach logs to terminal
`docker logs --follow friendly_kilby`

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
GET /hello 200 5.968 ms - 29
```

## Attach VS Code Debugger ##
Make sure container is run with port 5858 exposed and mapped to the same local port

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

Once the container is running you can use the above run configuration to attach the vs code debugger to it 



