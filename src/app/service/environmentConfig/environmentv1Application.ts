import {
  settingsObjectsClient,
  SettingsObjectResponse,
  SettingsObjectCreate,
  SettingsValue,
  ObjectsList,
} from "@dynatrace-sdk/client-classic-environment-v2";
import { callSDK } from "../sdk/callSDK";
import { SDKResponseCallbacks } from "../sdk/SDKResponseHandler";

const MAX_PAGE_SIZE = 500;

export function getSettingsObjects(
  schemaIds: string,
  scopes: string,
  fields: string,
  sdkResponseCallbacks: SDKResponseCallbacks<ObjectsList>
) {
  const getSettingsObjectPromise = settingsObjectsClient.getSettingsObjects({
    schemaIds: schemaIds,
    scopes: scopes,
    fields: fields,
    pageSize: MAX_PAGE_SIZE,
  });

  callSDK<ObjectsList>(getSettingsObjectPromise, sdkResponseCallbacks);
}

export function createSettingsObject(
  objectId: string,
  schemaId: string,
  scope: string,
  value: SettingsValue,
  sdkResponseCallbacks: SDKResponseCallbacks<SettingsObjectResponse[]>
) {
  const settingsObjectCreate: SettingsObjectCreate[] = [
    {
      schemaId,
      scope,
      value,
    },
  ];
  const tokenCreatePromise = settingsObjectsClient.postSettingsObjects({
    body: settingsObjectCreate,
  });

  callSDK<SettingsObjectResponse[]>(tokenCreatePromise, sdkResponseCallbacks);
}

export function deleteSettingsObject(
  objectId: string,
  sdkResponseCallbacks: SDKResponseCallbacks<void>
) {
  const tokenDeletePromise =
    settingsObjectsClient.deleteSettingsObjectByObjectId({ objectId });

  callSDK<void>(tokenDeletePromise, sdkResponseCallbacks);
}
