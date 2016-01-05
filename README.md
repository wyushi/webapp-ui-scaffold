Build docker image
------------------
```
docker build -t webapp-ui-dev .
```

Run docker container
--------------------
```
docker run -it -v $(pwd):/usr/src/app webapp-ui-dev
```
