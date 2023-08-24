export const GLOBAL_SLOS = [
  {
    schemaId: "builtin:monitoring.slo",
    schemaVersion: "6.0.11",
    scope: "environment",
    value: {
      enabled: true,
      name: "My new performance service-level objective",
      customDescription: "Service_Responsetime_fast",
      metricName: "my_new_performance_service_level_objective",
      metricExpression:
        "(100)*((calc:service.service_responsetime_fast:splitBy())/(builtin:service.requestCount.server:splitBy()))",
      evaluationType: "AGGREGATE",
      filter: "",
      evaluationWindow: "-1w",
      targetSuccess: 99.98,
      targetWarning: 99.99,
      errorBudgetBurnRate: {
        burnRateVisualizationEnabled: true,
        fastBurnThreshold: 10,
      },
    },
  },
  {
    schemaId: "builtin:monitoring.slo",
    schemaVersion: "6.0.11",
    scope: "environment",
    value: {
      enabled: true,
      name: "New SLO_service_5XX_rate",
      metricName: "new_slo_service_5xx_rate",
      metricExpression: "builtin:service.errors.fivexx.rate",
      evaluationType: "AGGREGATE",
      filter: "",
      evaluationWindow: "-1w",
      targetSuccess: 99.98,
      targetWarning: 99.99,
      errorBudgetBurnRate: {
        burnRateVisualizationEnabled: true,
        fastBurnThreshold: 10,
      },
    },
  },
];
