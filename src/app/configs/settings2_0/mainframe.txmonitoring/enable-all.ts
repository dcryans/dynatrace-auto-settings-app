export const MAINFRAME_MONITORING_ENABLE_ALL = [
  {
    schemaId: "builtin:mainframe.txmonitoring",
    schemaVersion: "1.6.2",
    scope: "environment",
    value: {
      monitorAllIncomingWebRequests: true,
      monitorAllCtgProtocols: true,
      groupCicsRegions: true,
      zosCicsServiceDetectionUsesTransactionId: true,
      groupImsRegions: true,
      zosImsServiceDetectionUsesTransactionId: true,
      nodeLimit: 500,
    },
  },
];
