import { getTenantHostname } from "../../../utils/tenantUrl";

export function getAllowSelfConnectionV1() {
  return [
    {
      schemaId: "builtin:dt-javascript-runtime.allowed-outbound-connections",
      schemaVersion: "1.0.1",
      scope: "environment",
      value: {
        allowedOutboundConnections: {
          enforced: true,
          hostList: [getTenantHostname()],
        },
      },
    },
  ];
}
