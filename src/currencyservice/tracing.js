'use strict';
const { NodeTracerProvider } = require("@opentelemetry/node");
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { CollectorTraceExporter } =  require('@opentelemetry/exporter-collector-grpc');
const collectorOptions = {
  serviceName: 'currencyservice',
  url: process.env.OTEL_COLLECTOR_ADDR,
};


const provider = new NodeTracerProvider();
const exporter = new CollectorTraceExporter(collectorOptions);
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();
registerInstrumentations({
  tracerProvider: provider,
});

console.log("tracing initialized");