export const ANOMALY_DETECTION_K8S = [
  {
    schemaId: "builtin:anomaly-detection.kubernetes.cluster",
    schemaVersion: "1.3",
    scope: "environment",
    value: {
      readinessIssues: {
        enabled: true,
        configuration: {
          samplePeriodInMinutes: 3,
          observationPeriodInMinutes: 5,
        },
      },
      cpuRequestsSaturation: {
        enabled: true,
        configuration: {
          threshold: 90,
          samplePeriodInMinutes: 10,
          observationPeriodInMinutes: 15,
        },
      },
      memoryRequestsSaturation: {
        enabled: true,
        configuration: {
          threshold: 90,
          samplePeriodInMinutes: 10,
          observationPeriodInMinutes: 15,
        },
      },
      podsSaturation: {
        enabled: true,
        configuration: {
          threshold: 90,
          samplePeriodInMinutes: 3,
          observationPeriodInMinutes: 5,
        },
      },
      monitoringIssues: {
        enabled: true,
        configuration: {
          samplePeriodInMinutes: 15,
          observationPeriodInMinutes: 30,
        },
      },
    },
  },
  {
    schemaId: "builtin:anomaly-detection.kubernetes.node",
    schemaVersion: "1.2.2",
    scope: "environment",
    value: {
      readinessIssues: {
        enabled: true,
        configuration: {
          samplePeriodInMinutes: 3,
          observationPeriodInMinutes: 5,
        },
      },
      nodeProblematicCondition: {
        enabled: true,
        configuration: {
          samplePeriodInMinutes: 3,
          observationPeriodInMinutes: 5,
        },
      },
      cpuRequestsSaturation: {
        enabled: true,
        configuration: {
          threshold: 90,
          samplePeriodInMinutes: 3,
          observationPeriodInMinutes: 5,
        },
      },
      memoryRequestsSaturation: {
        enabled: true,
        configuration: {
          threshold: 90,
          samplePeriodInMinutes: 3,
          observationPeriodInMinutes: 5,
        },
      },
      podsSaturation: {
        enabled: true,
        configuration: {
          threshold: 90,
          samplePeriodInMinutes: 3,
          observationPeriodInMinutes: 5,
        },
      },
    },
  },
  {
    schemaId: "builtin:anomaly-detection.kubernetes.namespace",
    schemaVersion: "1.1",
    scope: "environment",
    value: {
      cpuRequestsQuotaSaturation: {
        enabled: true,
        configuration: {
          threshold: 90,
          samplePeriodInMinutes: 10,
          observationPeriodInMinutes: 15,
        },
      },
      cpuLimitsQuotaSaturation: {
        enabled: true,
        configuration: {
          threshold: 90,
          samplePeriodInMinutes: 10,
          observationPeriodInMinutes: 15,
        },
      },
      memoryRequestsQuotaSaturation: {
        enabled: true,
        configuration: {
          threshold: 90,
          samplePeriodInMinutes: 10,
          observationPeriodInMinutes: 15,
        },
      },
      memoryLimitsQuotaSaturation: {
        enabled: true,
        configuration: {
          threshold: 90,
          samplePeriodInMinutes: 10,
          observationPeriodInMinutes: 15,
        },
      },
      podsQuotaSaturation: {
        enabled: true,
        configuration: {
          threshold: 90,
          samplePeriodInMinutes: 10,
          observationPeriodInMinutes: 15,
        },
      },
    },
  },
  {
    schemaId: "builtin:anomaly-detection.kubernetes.workload",
    schemaVersion: "1.8",
    scope: "environment",
    value: {
      containerRestarts: {
        enabled: true,
        configuration: {
          threshold: 1,
          samplePeriodInMinutes: 3,
          observationPeriodInMinutes: 5,
        },
      },
      deploymentStuck: {
        enabled: true,
        configuration: {
          samplePeriodInMinutes: 3,
          observationPeriodInMinutes: 5,
        },
      },
      pendingPods: {
        enabled: true,
        configuration: {
          threshold: 1,
          samplePeriodInMinutes: 10,
          observationPeriodInMinutes: 15,
        },
      },
      podStuckInTerminating: {
        enabled: true,
        configuration: {
          samplePeriodInMinutes: 3,
          observationPeriodInMinutes: 5,
        },
      },
      workloadWithoutReadyPods: {
        enabled: true,
        configuration: {
          samplePeriodInMinutes: 3,
          observationPeriodInMinutes: 5,
        },
      },
      notAllPodsReady: {
        enabled: true,
        configuration: {
          samplePeriodInMinutes: 3,
          observationPeriodInMinutes: 5,
        },
      },
      highMemoryUsage: {
        enabled: true,
        configuration: {
          threshold: 90,
          samplePeriodInMinutes: 10,
          observationPeriodInMinutes: 15,
        },
      },
      highCpuUsage: {
        enabled: true,
        configuration: {
          threshold: 90,
          samplePeriodInMinutes: 10,
          observationPeriodInMinutes: 15,
        },
      },
      highCpuThrottling: {
        enabled: true,
        configuration: {
          threshold: 50,
          samplePeriodInMinutes: 10,
          observationPeriodInMinutes: 15,
        },
      },
      oomKills: { enabled: true },
      jobFailureEvents: { enabled: true },
      podBackoffEvents: { enabled: true },
      podEvictionEvents: { enabled: true },
      podPreemptionEvents: { enabled: true },
    },
  },
  {
    schemaId: "builtin:anomaly-detection.kubernetes.pvc",
    schemaVersion: "1",
    scope: "environment",
    value: {
      lowDiskSpaceCritical: {
        enabled: true,
        configuration: {
          threshold: 100,
          samplePeriodInMinutes: 3,
          observationPeriodInMinutes: 5,
        },
      },
      lowDiskSpaceCriticalPercentage: {
        enabled: true,
        configuration: {
          threshold: 10,
          samplePeriodInMinutes: 3,
          observationPeriodInMinutes: 5,
        },
      },
    },
  },
];
