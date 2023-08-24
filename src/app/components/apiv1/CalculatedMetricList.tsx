import { CalculatedMetricUpdate } from "./CalculatedMetricUpdate";
import {
  ColorOptionsType,
  Container,
  Divider,
  Flex,
  Heading,
} from "@dynatrace/strato-components-preview";
import React, { useCallback, useEffect, useState, Fragment } from "react";
import { functions } from "@dynatrace-sdk/app-utils";
import { PushAllButton } from "../buttons/PushAllButton";
import { getTenantURL } from "../../utils/tenantUrl";
import { CONFIG_READER, getTokenPreset } from "../../service/tokens/tokens";

interface CalculatedMetricListProps {
  configs: any[];
  pushAll: boolean;
}

export const CalculatedMetricList = ({
  configs,
  pushAll,
}: CalculatedMetricListProps) => {
  const [status, setStatus] = useState("Not Started");
  const [statusCode, setStatusCode] = useState<ColorOptionsType>("neutral");
  const [calculatedMetrics, setCalculatedMetrics] = useState<any[] | null>(
    null
  );
  const [pushGroup, setPushGroup] = useState(false);

  const applyConfigFunc = useCallback(() => {
    const url = getTenantURL() + `/api/config/v1/calculatedMetrics/service`;

    setStatus("Getting CalculatedMetrics");
    setStatusCode("primary");

    getTokenPreset(CONFIG_READER)
      .then((token) => {
        const method = "GET";
        return functions.call("legacy-api", { method, url, token });
      })
      .then((res) => {
        return res.json();
      })
      .then((resObject) => {
        if (resObject.hasOwnProperty("error")) {
          let message = "";
          if (resObject["error"].hasOwnProperty("message")) {
            message = ": " + resObject["error"]["message"];
          }
          setStatus("Error" + message);
          setStatusCode("critical");
          console.log("Error: ", resObject);
        } else {
          setStatus("OK");
          setStatusCode("success");
          setCalculatedMetrics(resObject.values);
        }
      });
  }, []);

  useEffect(() => {
    applyConfigFunc();
  }, []);

  return (
    <Container>
      <Heading level={5}>
        <span> Calculated Metrics</span>
        <span>{" [ Status: " + status + " ]:"}</span>
      </Heading>
      <Divider />
      <Flex flexItem mt={8}>
        <PushAllButton
          label={"Calculated Metrics"}
          enabled={configs !== null && configs.length > 1}
          setPushAll={setPushGroup}
        />
      </Flex>
      <Flex flexItem mt={20}>
        {genAllCalculatedMetrics(
          configs,
          calculatedMetrics,
          pushAll,
          pushGroup
        )}
      </Flex>
    </Container>
  );
};

function genAllCalculatedMetrics(
  configs: any[],
  metrics: any[] | null,
  pushAll: boolean,
  pushGroup: boolean
) {
  if (metrics) {
    // pass
  } else {
    return <Fragment />;
  }

  const allConfigs: React.JSX.Element[] = [];

  for (const conf of Object.values(configs)) {
    let missing = true;
    if (metrics) {
      for (const metric of Object.values(metrics)) {
        if (metric.name === conf.name) {
          missing = false;
          break;
        }
      }
    }
    allConfigs.push(
      <CalculatedMetricUpdate
        key={"CALC-METR-" + conf.tsmMetricKey}
        config={conf}
        missing={missing}
        pushAll={pushAll}
        pushGroup={pushGroup}
      />
    );
  }
  return allConfigs;
}
