# maraudes-app

## Dev

```sh
yarn
yarn start
```

### Env vars

| Var                   | default                          |
| --------------------- | -------------------------------- |
| REACT_APP_GRAPHQL_API | http://127.0.0.1:8088/v1/graphql |
| REACT_APP_AUTH_API    | http://127.0.0.1:1337            |

## Prod (docker)

```sh
docker build . -t maraudes-app

docker run \
    --env REACT_APP_GRAPHQL_API=https://graphql.url \
    --env REACT_APP_AUTH_API=https://auth.url \
    --publish 5555:80 \
    --rm \
    maraudes-app
```

## Todo

- [ ] Edit task
- [ ] Edit person
- [ ] Invite collaborator
- [ ] Login
