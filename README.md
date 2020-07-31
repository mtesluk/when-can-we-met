For normal development set env for example
```
export WCWM_DB=jdbc:postgresql://127.0.0.1:5432/wcwm
```

To run server app in docker, navigate to dir 'server':
```
./mvnw package
docker-compose up --build
```
Be aware of error while ./mvnw which usually is coused by wrong JAVA_HOME env.

