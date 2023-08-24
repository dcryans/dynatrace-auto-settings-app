export const MZ_ALL = [
  {
    scope: "environment",
    schemaId: "builtin:management-zones",
    value: {
      name: "MZ_All",
      rules: [
        {
          enabled: true,
          type: "ME",
          attributeRule: {
            entityType: "HOST",
            conditions: [
              {
                key: "HOST_OS_VERSION",
                operator: "EXISTS",
              },
            ],
            hostToPGPropagation: false,
          },
        },
      ],
    },
  },
];
