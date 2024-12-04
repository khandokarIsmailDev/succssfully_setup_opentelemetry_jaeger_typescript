import * as opentelemetry from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';

const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    'service.name': 'my-testing-service', // Use plain string keys for resource attributes
  }),
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces', // Default OpenTelemetry Collector trace endpoint
    headers: {}, // Optional headers for custom configurations
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: 'http://localhost:4318/v1/metrics', // Default OpenTelemetry Collector metrics endpoint
      headers: {}, // Optional headers for custom configurations
    }),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
