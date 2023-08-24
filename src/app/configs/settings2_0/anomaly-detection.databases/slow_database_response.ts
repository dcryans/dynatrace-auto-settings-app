export const SLOW_DATABASE_RESPONSE = [
  {
    schemaId: "builtin:anomaly-detection.databases",
    schemaVersion: "0.0.16",
    scope: "environment",
    value: {
      responseTime: {
        enabled: true,
        detectionMode: "auto",
        autoDetection: {
          responseTimeAll: {
            degradationMilliseconds: 50,
            degradationPercent: 50,
          },
          responseTimeSlowest: {
            slowestDegradationMilliseconds: 100,
            slowestDegradationPercent: 100,
          },
          overAlertingProtection: {
            requestsPerMinute: 10,
            minutesAbnormalState: 1,
          },
        },
      },
      failureRate: {
        enabled: true,
        detectionMode: "auto",
        autoDetection: {
          absoluteIncrease: 0,
          relativeIncrease: 50,
          overAlertingProtection: {
            requestsPerMinute: 10,
            minutesAbnormalState: 1,
          },
        },
      },
      loadDrops: { enabled: false },
      loadSpikes: { enabled: false },
      databaseConnections: {
        enabled: true,
        maxFailedConnects: 5,
        timePeriod: 5,
      },
    },
  },
];
