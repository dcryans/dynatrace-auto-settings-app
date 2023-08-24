import {
  Button,
  ColorOptionsType,
  Flex,
} from "@dynatrace/strato-components-preview";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { functions } from "@dynatrace-sdk/app-utils";
import { getTenantURL } from "../../utils/tenantUrl";
import { CONFIG_WRITER, getTokenPreset } from "../../service/tokens/tokens";

interface CalculatedMetricUpdateProps {
  config: any;
  missing: boolean;
  pushAll: boolean;
  pushGroup: boolean;
}

export const CalculatedMetricUpdate = ({
  config,
  missing,
  pushAll,
  pushGroup,
}: CalculatedMetricUpdateProps) => {
  //
  const [configName, configKey] = useMemo<[string, string]>((): [
    string,
    string
  ] => {
    return [config["name"], config["tsmMetricKey"]];
  }, [config]);

  const [status, setStatus] = useState("Not Started");
  const [summary, setSummary] = useState(configName);
  const [statusCode, setStatusCode] = useState<ColorOptionsType>("neutral");

  const applyConfigFunc = useCallback(
    (doRun: boolean) => {
      let alreadyExists = true;

      if (missing) {
        alreadyExists = false;
        if (statusCode == "success") {
          alreadyExists = true;
        }
      }

      if (alreadyExists) {
        setStatus("Already exists");
        setStatusCode("success");
        return;
      }

      if (doRun) {
        const url = getTenantURL() + `/api/config/v1/calculatedMetrics/service`;

        setStatus("Creating CalculatedMetrics");
        setStatusCode("primary");

        getTokenPreset(CONFIG_WRITER)
          .then((token) => {
            const method = "POST";
            return functions.call("legacy-api", {
              method,
              url,
              token,
              body: config,
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
                  setStatus("CalculatedMetrics Created");
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
        setStatus("Needs to be created");
        setStatusCode("primary");
      }
    },
    [config, missing]
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
