import { isEqual } from "lodash";
import { SLOW_DATABASE_RESPONSE } from "./settings2_0/anomaly-detection.databases/slow_database_response";
import { AUDIT_LOG } from "./settings2_0/audit-log/auditLog";
import { MZ_ALL } from "./settings2_0/management-zones/mzAll";
import { GLOBAL_SLOS } from "./settings2_0/monitoring.slo/globalSLOs";
import { ANOMALY_DETECTION_K8S } from "./settings2_0/nomaly-detection.kubernetes-all/anomalyDetectionK8s";
import { CODE_LEVEL_ATTACK } from "./settings2_0/oneagent.features/CodeLevelAttack";
import { GO_VULNERABILITY } from "./settings2_0/oneagent.features/GoVulnerability";
import { LETTUCE_REDIS } from "./settings2_0/oneagent.features/LettuceRedis";
import { LOG_ENRICHMENT } from "./settings2_0/oneagent.features/LogEnrichment";
import { MAINFRAME_WILD_CARD_START_FILTER } from "./settings2_0/mainframe.txstartfilters/wild-card-start-filter";
import { MAINFRAME_MONITORING_ENABLE_ALL } from "./settings2_0/mainframe.txmonitoring/enable-all";

export const SCHEMA_KEYS = {
  DEFAULT: ["scope"],
  "builtin:management-zones": ["value", "name"],
  "builtin:oneagent.features": ["value", "key"],
  "builtin:monitoring.slo": ["value", "name"],
};

export const IS_OK_FUNC = {
  DEFAULT: isEqual,
  "builtin:dt-javascript-runtime.allowed-outbound-connections":
    isOKLimitOutboundConnection,
};

export const CHANGE_VALUE_FUNC = {
  DEFAULT: (current: any, target: any) => target,
  "builtin:dt-javascript-runtime.allowed-outbound-connections":
    changeValueLimitOutboundConnection,
};

export const SETTINGS2_0 = [
  ...MZ_ALL,
  ...CODE_LEVEL_ATTACK,
  ...GO_VULNERABILITY,
  ...LETTUCE_REDIS,
  ...LOG_ENRICHMENT,
  ...SLOW_DATABASE_RESPONSE,
  ...GLOBAL_SLOS,
  ...ANOMALY_DETECTION_K8S,
  ...AUDIT_LOG,
  ...MAINFRAME_WILD_CARD_START_FILTER,
  ...MAINFRAME_MONITORING_ENABLE_ALL,
];

function isOKLimitOutboundConnection(current: any, target: any) {
  if (current["allowedOutboundConnections"]["enforced"] == false) {
    return true;
  }
  let allFound = true;
  for (const url of Object.values(
    target["allowedOutboundConnections"]["hostList"]
  )) {
    if (
      current["allowedOutboundConnections"]["hostList"].includes(url as any)
    ) {
      // pass
    } else {
      allFound = false;
    }
  }

  return allFound;
}

function changeValueLimitOutboundConnection(current: any, target: any) {
  if (current["allowedOutboundConnections"]["enforced"] == false) {
    return current;
  }

  for (const url of Object.values(
    target["allowedOutboundConnections"]["hostList"]
  )) {
    if ((url as any) in current["allowedOutboundConnections"]["hostList"]) {
      // pass
    } else {
      current["allowedOutboundConnections"]["hostList"].push(url);
    }
  }

  return current;
}
