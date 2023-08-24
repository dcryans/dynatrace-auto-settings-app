import { ApplicationUpdate } from "./ApplicationUpdate";
import {
  ColorOptionsType,
  Container,
  Divider,
  Flex,
  Heading,
} from "@dynatrace/strato-components-preview";
import React, { useCallback, useEffect, useState } from "react";
import { functions } from "@dynatrace-sdk/app-utils";
import { PushAllButton } from "../buttons/PushAllButton";
import { getTenantURL } from "../../utils/tenantUrl";
import { CONFIG_READER, getTokenPreset } from "../../service/tokens/tokens";

interface ApplicationListProps {
  config: any;
  pushAll: boolean;
}

export const ApplicationList = ({ config, pushAll }: ApplicationListProps) => {
  const [status, setStatus] = useState("Not Started");
  const [statusCode, setStatusCode] = useState<ColorOptionsType>("neutral");
  const [applications, setApplications] = useState<any[]>([]);
  const [pushGroup, setPushGroup] = useState(false);

  const applyConfigFunc = useCallback(() => {
    const url = getTenantURL() + `/api/config/v1/applications/web`;

    setStatus("Getting Applications");
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
          setApplications(resObject.values);
        }
      });
  }, []);

  useEffect(() => {
    applyConfigFunc();
  }, []);

  return (
    <Container>
      <Heading level={5}>
        <span> APPLICATIONS</span>
        <span>{" [ Status: " + status + " ]:"}</span>
      </Heading>
      <Divider />
      <Flex flexItem mt={8}>
        <PushAllButton
          label={"Applications"}
          enabled={applications && applications.length > 1}
          setPushAll={setPushGroup}
        />
      </Flex>
      <Flex flexItem mt={20}>
        {genAllApplications(config, applications, pushAll, pushGroup)}
      </Flex>
    </Container>
  );
};

function genAllApplications(
  config: any,
  apps: any[],
  pushAll: boolean,
  pushGroup: boolean
) {
  const allConfigs: React.JSX.Element[] = [];

  if (apps) {
    // pass
  } else {
    return allConfigs;
  }
  for (const app of Object.values(apps)) {
    allConfigs.push(
      <ApplicationUpdate
        key={"APP-UPDT-" + app["id"]}
        app={app}
        config={config}
        pushAll={pushAll}
        pushGroup={pushGroup}
      />
    );
  }
  return allConfigs;
}
