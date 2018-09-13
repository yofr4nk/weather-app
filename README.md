# weather-server

API REST Koa server to serve info about weather

#### Requirements
Things what you need to install the server
- [docker](https://www.docker.com/)
- [docker-compose](https://docs.docker.com/compose/)
- [Dark-Sky-Service](https://darksky.net/dev)

### Versions

Koa | Node | Npm |
--- | ---  | --- |
***2.0.1*** | ***=8.9*** | ***5.6.0*** |

### Get started
- Clone the project
```
git clone https://github.com/yofr4nk/weather-app.git
```

### Environment vars

- `SKY_DARK_URI:` url with dev key to get weather conditions from Dark Sky service

### run docker-compose to install application
```
docker-compose up
```

### To get a graphiql section

- http://localhost:3000/graphiql

