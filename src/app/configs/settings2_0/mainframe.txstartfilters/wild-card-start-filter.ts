export const MAINFRAME_WILD_CARD_START_FILTER = [
  {
    schemaId: "builtin:mainframe.txstartfilters",
    schemaVersion: "1.2",
    scope: "environment",
    value: {
      includedCicsTerminalTransactionIds: ["*"],
      includedCicsTransactionIds: ["*"],
      includedImsTerminalTransactionIds: ["*"],
      includedImsTransactionIds: ["*"],
    },
  },
];
