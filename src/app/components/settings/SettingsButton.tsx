import {
  Button,
  ColorOptionsType,
  Flex,
} from "@dynatrace/strato-components-preview";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  createSettingsObject,
  getSettingsObjects,
} from "../../service/environmentConfig/environmentSettings2_0";
import {
  ObjectsList,
  SettingsObject,
  SettingsObjectResponse,
} from "@dynatrace-sdk/client-classic-environment-v2";
import { SDKResponseCallbacks } from "../../service/sdk/SDKResponseHandler";
import {
  CHANGE_VALUE_FUNC,
  IS_OK_FUNC,
  SCHEMA_KEYS,
} from "../../configs/settings2_0";
import showdown from "showdown";

interface SettingsButtonProps {
  config: any;
  pushAll?: boolean;
  pushGroup?: boolean;
}

export const SettingsButton = ({
  config,
  pushAll = false,
  pushGroup = false,
}: SettingsButtonProps) => {
  const [configName, configKey] = useMemo<[string, string]>((): [
    string,
    string
  ] => {
    const configName = getKeyValue(config);
    return [configName, config.schemaId + ":" + configName];
  }, [config]);

  const [status, setStatus] = useState("Not Started");
  const [summary, setSummary] = useState(configName);
  const [statusCode, setStatusCode] = useState<ColorOptionsType>("neutral");

  const handleChangeSummary = useCallback(
    (newSummary: string) => {
      if (newSummary === "") {
        return;
      }
      if (newSummary) {
        setSummary(newSummary);
      }
    },
    [setSummary]
  );

  const applyConfigFunc = useCallback(
    (doRun: boolean) => {
      setStatus("Getting Objects");
      setStatusCode("primary");
      getSettingsObjects(
        config.schemaId,
        config.scope,
        "scope,schemaId,value,objectId,summary",
        genGetSettingCallbacks(
          config,
          setStatus,
          handleChangeSummary,
          setStatusCode,
          doRun
        )
      );
    },
    [config, handleChangeSummary]
  );

  useEffect(() => {
    applyConfigFunc(pushAll || pushGroup);
  }, [pushAll, pushGroup]);

  return (
    <Flex key={configKey + "A"}>
      <Flex flexDirection="row" alignItems="center" padding={0}>
        <Flex key={configKey + "C"} flexItem>
          <span>
            <Button
              color={statusCode}
              variant="emphasized"
              onClick={() => {
                applyConfigFunc(true);
              }}
            >
              <span>Status: {status}</span>
              <span>, Click to run </span>
            </Button>
          </span>
        </Flex>
        <Flex key={configKey + "B"} flexItem>
          <span id={configKey}>
            {unescapeMarkdown(summary, configKey, config.schemaId)}:{" "}
          </span>
        </Flex>
      </Flex>
    </Flex>
  );
};

function genGetSettingCallbacks(
  target: any,
  setStatus: React.Dispatch<React.SetStateAction<string>>,
  handleChangeSummary: (summary: string) => void,
  setStatusCode: React.Dispatch<React.SetStateAction<ColorOptionsType>>,
  doRun: boolean
): SDKResponseCallbacks<ObjectsList> {
  const targetKey = getKeyValue(target);

  return {
    successFunction: (objectsList: ObjectsList) => {
      let found = false;
      let isCurrentValueOK = false;
      let foundObject: SettingsObject | null = null;

      for (const currentObject of Object.values(objectsList.items)) {
        const keyObject = getKeyValue(currentObject);

        if (keyObject == "") {
          setStatus("No Key Found");
          setStatusCode("warning");
        } else {
          if (keyObject === targetKey) {
            found = true;

            const isOKFunc = getSchemaItemOrDefault(
              target.schemaId,
              IS_OK_FUNC
            );
            if (isOKFunc(currentObject["value"], target["value"])) {
              isCurrentValueOK = true;
            }

            if (currentObject.summary) {
              handleChangeSummary(currentObject.summary);
            }
            foundObject = currentObject;
            break;
          }
        }
      }

      if (found && foundObject && foundObject.objectId) {
        if (isCurrentValueOK) {
          setStatus("OK");
          setStatusCode("success");
        } else {
          if (doRun) {
            const changeValueFunc = getSchemaItemOrDefault(
              target.schemaId,
              CHANGE_VALUE_FUNC
            );
            setStatus("Updating existing object");
            setStatusCode("primary");
            createSettingsObject(
              foundObject.objectId,
              target.schemaId,
              target.scope,
              changeValueFunc(foundObject["value"], target.value),
              genUpdateSettingCallbacks("Update", setStatus, setStatusCode)
            );
          } else {
            setStatus("Needs to be updated");
            setStatusCode("primary");
          }
        }
      } else {
        if (doRun) {
          setStatus("Creating new object");
          setStatusCode("primary");
          createSettingsObject(
            "",
            target.schemaId,
            target.scope,
            target.value,
            genUpdateSettingCallbacks("Create", setStatus, setStatusCode)
          );
        } else {
          setStatus("Needs to be created");
          setStatusCode("primary");
        }
      }
    },
    allErrorsFunction: () => {
      setStatus("ERROR");
      setStatusCode("critical");
    },
    errorMessageFunction: (message: string) => {
      setStatus("ERROR: " + message);
      setStatusCode("critical");
    },
  };
}

export function getKeyValue(object: any): string {
  if (object.schemaId) {
    // pass
  } else {
    return "";
  }

  let keyObject = object as any;
  const keyPath = getSchemaItemOrDefault(object.schemaId, SCHEMA_KEYS);

  for (const key of Object.values(keyPath)) {
    keyObject = keyObject[key as string];
  }

  return keyObject;
}

function genUpdateSettingCallbacks(
  action: string,
  setStatus: React.Dispatch<React.SetStateAction<string>>,
  setStatusCode: React.Dispatch<React.SetStateAction<ColorOptionsType>>
): SDKResponseCallbacks<SettingsObjectResponse[]> {
  return {
    successFunction: (response: SettingsObjectResponse[]) => {
      setStatus(action + " SUCCESS");
      setStatusCode("success");
    },
    allErrorsFunction: () => {
      setStatus(action + " ERROR");
      setStatusCode("critical");
    },
    errorMessageFunction: (message: string) => {
      setStatus(action + " ERROR: " + message);
      setStatusCode("critical");
    },
  };
}

function unescapeMarkdown(text: string, id: string, schemaId: string) {
  if (text && id) {
    // pass
  } else {
    return "";
  }

  if (text === "" || id === "") {
    return "";
  }

  const container = document.getElementById(id);
  // Create a Showdown converter instance
  const converter = new showdown.Converter();

  // Convert the Markdown text to HTML
  try {
    if (container) {
      let html = converter.makeHtml(text);
      // Set the HTML content of the container
      html = html.replace("<p>", "");
      html = html.replace("</p>", "");
      container.innerHTML = html;
    }
  } catch (e: any) {
    console.log("TypeError: ", text, "ID: ", id, "Error: ", e);
  }

  return "";
}

function getSchemaItemOrDefault(schemaId: string, config: any): any {
  let item = config["DEFAULT"];

  if (schemaId && config.hasOwnProperty(schemaId)) {
    item = config[schemaId as keyof typeof config];
  }

  return item;
}
