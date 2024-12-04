# for First Commit 
- we dont need `tempo.yaml` file, `docker-compose.yaml` file, `otel-collector.yaml` file, `collector-config.yaml` file

- we just need `instrumentation.ts` file
- we need to run the service with `jaeger`
```bash
docker run --rm \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 9411:9411 \
  jaegertracing/all-in-one:latest
```

- then we need to run the service
```bash
npm run dev 
```
