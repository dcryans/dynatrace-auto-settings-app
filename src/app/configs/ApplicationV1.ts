export const WEB_APP_CONFIG_PARTIAL = {
  sessionReplayConfig: {
    enabled: true,
  },
  userActionAndSessionProperties: [
    {
      displayName: "Adobe page URL",
      type: "STRING",
      origin: "META_DATA",
      aggregation: "LAST",
      storeAsUserActionProperty: true,
      storeAsSessionProperty: false,
      uniqueId: 1,
      key: "adobe_pageurl",
      metadataId: 1,
      ignoreCase: false,
    },
    {
      displayName: "GCLID - Google Click Identifier",
      type: "STRING",
      origin: "META_DATA",
      aggregation: "LAST",
      storeAsUserActionProperty: false,
      storeAsSessionProperty: true,
      uniqueId: 2,
      key: "google_gclid",
      metadataId: 2,
      ignoreCase: false,
    },
    {
      displayName: "__cflb",
      type: "STRING",
      origin: "META_DATA",
      aggregation: "LAST",
      storeAsUserActionProperty: false,
      storeAsSessionProperty: true,
      uniqueId: 3,
      key: "cloudflare___cflb",
      metadataId: 3,
      ignoreCase: false,
    },
    {
      displayName: "__cf_bm",
      type: "STRING",
      origin: "META_DATA",
      aggregation: "LAST",
      storeAsUserActionProperty: false,
      storeAsSessionProperty: true,
      uniqueId: 4,
      key: "cloudflare___cf_bm",
      metadataId: 4,
      ignoreCase: false,
    },
    {
      displayName: "__cfduid",
      type: "STRING",
      origin: "META_DATA",
      aggregation: "LAST",
      storeAsUserActionProperty: false,
      storeAsSessionProperty: true,
      uniqueId: 5,
      key: "cloudflare___cfduid",
      metadataId: 5,
      ignoreCase: false,
    },
  ],
  userActionNamingSettings: {
    loadActionNamingRules: [
      {
        template:
          "{pageTitle (default)} - {userInteraction (default)} {elementIdentifier (default)}",
        conditions: [],
        useOrConditions: false,
      },
    ],
    xhrActionNamingRules: [
      {
        template:
          '{userInteraction (default)} on "{elementIdentifier (default)}"',
        conditions: [],
        useOrConditions: false,
      },
    ],
  },
  metaDataCaptureSettings: [
    {
      type: "JAVA_SCRIPT_VARIABLE",
      capturingName: "s.pageURL",
      name: "Adobe page URL",
      uniqueId: 1,
      publicMetadata: false,
      useLastValue: false,
    },
    {
      type: "QUERY_STRING",
      capturingName: "gclid",
      name: "GCLID - Google Click Identifier",
      uniqueId: 2,
      publicMetadata: false,
      useLastValue: false,
    },
    {
      type: "COOKIE",
      capturingName: "__cflb",
      name: "__cflb",
      uniqueId: 3,
      publicMetadata: false,
      useLastValue: false,
    },
    {
      type: "COOKIE",
      capturingName: "__cf_bm",
      name: "__cf_bm",
      uniqueId: 4,
      publicMetadata: false,
      useLastValue: false,
    },
    {
      type: "COOKIE",
      capturingName: "__cfduid",
      name: "__cfduid",
      uniqueId: 5,
      publicMetadata: false,
      useLastValue: false,
    },
  ],
};