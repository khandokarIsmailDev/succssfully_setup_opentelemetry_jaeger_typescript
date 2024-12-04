import express, { Express } from 'express';
import { trace, context, propagation, SpanKind } from '@opentelemetry/api';

const PORT: number = parseInt(process.env.PORT || '8080');
const app: Express = express();

// Replace tracer with OpenTelemetry's tracer
const tracer = trace.getTracer('your-tracer-name');

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get('/rolldice', (req, res) => {
  res.send(getRandomNumber(1, 6).toString());
});

app.get('/touch', async (req, res) => {
  console.log(`touched Ismail`);
  const requestId = req.headers["requestid"]; // Adjusted to match header casing

  // Start a new span
  const span = tracer.startSpan(`span-Ismail`, {
    kind: SpanKind.SERVER,
    attributes: {
      'http.url': req.url,
      'http.method': req.method,
      'requestId': requestId,
    },
  });

  // Set the span in the current context
  const ctx = trace.setSpan(context.active(), span);

  // Inject the span context into the headers
  context.with(ctx, () => {
    propagation.inject(context.active(), req.headers);
    res.send('Response from /touch');
  });

  // End the span when done
  span.end();
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
