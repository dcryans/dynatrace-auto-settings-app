export const CALCULATED_METRICS = [
  {
    name: "Service_responsetime_fast",
    tsmMetricKey: "calc:service.service_responsetime_fast",
    enabled: true,
    ignoreMutedRequests: false,
    metricDefinition: {
      metric: "REQUEST_COUNT",
    },
    managementZones: ["MZ_All"],
    unit: "COUNT",
    conditions: [
      {
        attribute: "RESPONSE_TIME",
        comparisonInfo: {
          type: "NUMBER",
          negate: false,
          comparison: "LOWER_THAN",
          value: "3000",
          caseSensitive: false,
        },
      },
    ],
    dimensionDefinition: {
      name: "Service Name",
      dimension: "{Service:Name}",
      placeholders: [],
      topX: 10,
      topXDirection: "DESCENDING",
      topXAggregation: "SINGLE_VALUE",
    },
  },
];
