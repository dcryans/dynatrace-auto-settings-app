import type { CliOptions } from "dt-app";

const config: CliOptions = {
  environmentUrl: "https://qpk03863.apps.dynatrace.com/",
  icon: './src/assets/icon.png',
  app: {
    name: "Auto Settings App",
    description: "App that automates settings in an environment.",
    id: "my.auto.settings.app",
    scopes: [
      { name: "storage:logs:read", comment: "default template" },
      { name: "storage:buckets:read", comment: "default template" },
      {
        name: "environment-api:entities:read",
        comment: "get entities from tenant",
      },
      {
        name: "settings:objects:read",  
        comment: "get settings objects",
      },
      {
        name: "settings:objects:write",
        comment: "update settings objects",
      },
      {
        name: "environment-api:api-tokens:write",
        comment: "Create Installer token",
      },
    ],
  },
};

module.exports = config;
