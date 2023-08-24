import {
  ApiTokenCreate,
  ApiTokenCreateScopesItem,
  accessTokensApiTokensClient,
} from "@dynatrace-sdk/client-classic-environment-v2";
import { APP_NAME } from "../../pages/Home";

const tokens = new Map<string, string>();

export interface TokenCreationInfo {
  label: string;
  scopes: ApiTokenCreateScopesItem[];
  url?: string;
}

export const CONFIG_READER = "CONFIG_READER";
export const CONFIG_WRITER = "CONFIG_WRITER";
export const BIZ_OPS_CONFIGURATOR = "BIZ_OPS_CONFIGURATOR";
export const DT_CONF_MAN_READER = "DT_CONF_MAN_READER";
export const DT_CONF_MAN_WRITER = "DT_CONF_MAN_WRITER";
export const MONACO_WRITER = "MONACO_WRITER";
export const TERRAFORM_WRITER = "TERRAFORM_WRITER";

export const TOKEN_PRESETS = new Map<string, TokenCreationInfo>();

TOKEN_PRESETS.set(BIZ_OPS_CONFIGURATOR, {
  label: "BizOpsConfigurator",
  scopes: [
    ApiTokenCreateScopesItem.WriteConfig,
    ApiTokenCreateScopesItem.ReadConfig,
    ApiTokenCreateScopesItem.MetricsRead,
    ApiTokenCreateScopesItem.MetricsWrite,
    ApiTokenCreateScopesItem.DataExport,
    ApiTokenCreateScopesItem.DtaqlAccess,
  ],
  url: "https://dynatrace.github.io/BizOpsConfigurator",
});

TOKEN_PRESETS.set(CONFIG_READER, {
  label: "Config Reader",
  scopes: [ApiTokenCreateScopesItem.ReadConfig],
});

TOKEN_PRESETS.set(CONFIG_WRITER, {
  label: "Config Writer",
  scopes: [ApiTokenCreateScopesItem.WriteConfig],
});

TOKEN_PRESETS.set(MONACO_WRITER, {
  label: "Configuration as Code (Monaco 2.0)",
  scopes: [
    ApiTokenCreateScopesItem.ReadConfig,
    ApiTokenCreateScopesItem.WriteConfig,
    ApiTokenCreateScopesItem.SettingsRead,
    ApiTokenCreateScopesItem.SettingsWrite,
    ApiTokenCreateScopesItem.SloRead,
    ApiTokenCreateScopesItem.SloWrite,
    ApiTokenCreateScopesItem.DataExport,
    ApiTokenCreateScopesItem.ExternalSyntheticIntegration,
  ],
  url: "https://www.dynatrace.com/support/help/manage/configuration-as-code",
});

TOKEN_PRESETS.set(DT_CONF_MAN_READER, {
  label: "Dynatrace Config Manager Read-Only",
  scopes: [
    ApiTokenCreateScopesItem.EntitiesRead,
    ApiTokenCreateScopesItem.SettingsRead,
    ApiTokenCreateScopesItem.SloRead,
    ApiTokenCreateScopesItem.DataExport,
    ApiTokenCreateScopesItem.ReadConfig,
    ApiTokenCreateScopesItem.NetworkZonesRead,
    ApiTokenCreateScopesItem.CredentialVaultRead,
  ],
  url: "https://github.com/dcryans/Dynatrace-Config-Manager/releases",
});

TOKEN_PRESETS.set(DT_CONF_MAN_WRITER, {
  label: "Dynatrace Config Manager Read-Write",
  scopes: [
    ApiTokenCreateScopesItem.EntitiesRead,
    ApiTokenCreateScopesItem.SettingsRead,
    ApiTokenCreateScopesItem.SettingsWrite,
    ApiTokenCreateScopesItem.CredentialVaultRead,
    ApiTokenCreateScopesItem.CredentialVaultWrite,
    ApiTokenCreateScopesItem.NetworkZonesRead,
    ApiTokenCreateScopesItem.NetworkZonesWrite,
    ApiTokenCreateScopesItem.CaptureRequestData,
    ApiTokenCreateScopesItem.SloRead,
    ApiTokenCreateScopesItem.SloWrite,
    ApiTokenCreateScopesItem.ReadConfig,
    ApiTokenCreateScopesItem.WriteConfig,
    ApiTokenCreateScopesItem.DataExport,
    ApiTokenCreateScopesItem.ExternalSyntheticIntegration,
  ],
  url: "https://github.com/dcryans/Dynatrace-Config-Manager/releases",
});

TOKEN_PRESETS.set(TERRAFORM_WRITER, {
  label: "Terraform OSS Provider",
  scopes: [
    ApiTokenCreateScopesItem.ReadConfig,
    ApiTokenCreateScopesItem.WriteConfig,
    ApiTokenCreateScopesItem.SettingsRead,
    ApiTokenCreateScopesItem.SettingsWrite,
    ApiTokenCreateScopesItem.CredentialVaultRead,
    ApiTokenCreateScopesItem.CredentialVaultWrite,
    ApiTokenCreateScopesItem.NetworkZonesRead,
    ApiTokenCreateScopesItem.NetworkZonesWrite,
    ApiTokenCreateScopesItem.CaptureRequestData,
    ApiTokenCreateScopesItem.ExternalSyntheticIntegration,
  ],
  url: "https://registry.terraform.io/providers/dynatrace-oss/dynatrace/latest/docs",
});

async function getToken(config: ApiTokenCreate) {
  if (tokens.has(config.name)) {
    return tokens.get(config.name) as string;
  }
  const res = await accessTokensApiTokensClient.createApiToken({
    body: config,
  });
  if (res.token === undefined) {
    throw new Error("Token missing.");
  }
  tokens.set(config.name, res.token);
  return tokens.get(config.name) as string;
}

export function getTokenPreset(tokenPreset: string) {
  const preset = TOKEN_PRESETS.get(tokenPreset);
  if (preset) {
    const { label, scopes } = preset;

    return getToken({
      scopes: scopes,
      name: label + " token created from " + APP_NAME,
      expirationDate: "now+1d",
    });
  }
  throw new Error("Token Preset does not exist: " + tokenPreset);
}
