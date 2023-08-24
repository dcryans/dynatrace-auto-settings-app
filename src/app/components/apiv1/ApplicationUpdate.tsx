import {
  Button,
  ColorOptionsType,
  Flex,
} from "@dynatrace/strato-components-preview";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { functions } from "@dynatrace-sdk/app-utils";
import { isEqual } from "lodash";
import { getTenantURL } from "../../utils/tenantUrl";
import { CONFIG_READER, CONFIG_WRITER, getTokenPreset } from "../../service/tokens/tokens";

interface ApplicationUpdateProps {
  app: any;
  config: any;
  pushAll: boolean;
  pushGroup: boolean;
}

export const ApplicationUpdate = ({
  app,
  config,
  pushAll,
  pushGroup,
}: ApplicationUpdateProps) => {
  const [configName, configKey] = useMemo<[string, string]>((): [
    string,
    string
  ] => {
    const configName = app["name"];
    return [configName, app["id"] + ":" + configName];
  }, [app]);

  const [status, setStatus] = useState("Not Started");
  const [summary, setSummary] = useState(configName);
  const [statusCode, setStatusCode] = useState<ColorOptionsType>("neutral");

  const applyConfigFunc = useCallback(
    (doRun: boolean) => {
      const url = getTenantURL() + `/api/config/v1/applications/web/` + app.id;

      setStatus("Getting Application Details");
      setStatusCode("primary");

      getTokenPreset(CONFIG_READER)
        .then((token) => {
          const method = "GET";

          return functions.call("legacy-api", { method, url, token });
        })
        .then((res) => {
          return res.json();
        })
        .then((appDetails) => {
          const [updated, appObject] = patchObject(config, appDetails);
          if (updated) {
            if (doRun) {
              getTokenPreset(CONFIG_WRITER)
                .then((token) => {
                  const method = "PUT";
                  return functions.call("legacy-api", {
                    method,
                    url,
                    token,
                    appObject,
                  });
                })
                .then((res) => {
                  if (res.ok) {
                    res.json().then((resObject) => {
                      if (resObject.hasOwnProperty("error")) {
                        setStatus("Error: " + resObject["error"]["message"]);
                        setStatusCode("critical");
                        console.log("Error: ", resObject);
                      } else {
                        setStatus("Application Updated");
                        setStatusCode("success");
                      }
                    });
                  } else {
                    res.text().then((errorTxt) => {
                      setStatus("Error: " + errorTxt);
                      setStatusCode("critical");
                    });
                  }
                });
            } else {
              setStatus("Needs to be updated");
              setStatusCode("primary");
            }
          } else {
            setStatus("OK");
            setStatusCode("success");
          }
        });
    },
    [app, config]
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
              <span>, Click to re-run </span>
            </Button>
          </span>
        </Flex>
        <Flex key={configKey + "B"} flexItem>
          <span id={configKey}>{summary}: </span>
        </Flex>
      </Flex>
    </Flex>
  );
};

function patchObject(source: any, object: any): [boolean, any] {
  let updated = false;

  const updateValue = (key: string, value: any) => {
    updated = true;
    object[key] = value;
  };

  for (const [key, value] of Object.entries(source)) {
    if (object.hasOwnProperty(key)) {
      if (Array.isArray(object[key])) {
        for (const itemSource of Object.values(value as any)) {
          let addItem = true;
          for (const itemObject of Object.values(object[key] as any)) {
            if (isEqual(itemSource, itemObject)) {
              addItem = false;
              break;
            }
          }
          if (addItem) {
            object[key].push(itemSource);
          }
        }
      } else if (Object.keys(object[key]).length > 0) {
        const [subUpdated, subObject] = patchObject(value, object[key]);
        if (subUpdated) {
          updated = true;
          object[key] = subObject;
        }
      } else if (isEqual(value, object[key])) {
        // pass
      } else {
        updateValue(key, value);
      }
    } else {
      updateValue(key, value);
    }
  }
  return [updated, object];
}
