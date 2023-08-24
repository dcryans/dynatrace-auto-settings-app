import React, { useState } from "react";
import {
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
} from "@dynatrace/strato-components-preview";
import { SettingsSchema } from "../components/settings/SettingsSchema";
import { CalculatedMetricList } from "../components/apiv1/CalculatedMetricList";
import { ApplicationList } from "../components/apiv1/ApplicationList";
import { SETTINGS2_0 } from "../configs/settings2_0";
import { WEB_APP_CONFIG_PARTIAL } from "../configs/ApplicationV1";
import { CALCULATED_METRICS } from "../configs/CalculatedMetricsV1";

export const ApplyConfigs = () => {
  const [pushAll, setPushAll] = useState(false);

  return (
    <Flex flexDirection="column" alignItems="left" padding={32}>
      <Container>
        <Heading level={3}>Automated Configurations</Heading>
        <Divider />
        <Flex flexItem mt={8}>
          <Text>Click this button to push all configurations at once</Text>
        </Flex>
        <Flex flexItem mt={20}>
          <Button
            color="warning"
            variant="emphasized"
            onClick={() => {
              setPushAll(true);
            }}
          >
            Push all settings
          </Button>
        </Flex>
      </Container>
      <CalculatedMetricList configs={CALCULATED_METRICS} pushAll={pushAll} />
      {genAllSchemas(pushAll)}
      <ApplicationList config={WEB_APP_CONFIG_PARTIAL} pushAll={pushAll} />
    </Flex>
  );
};

function genAllSchemas(pushAll: boolean) {
  const allSchemas: React.JSX.Element[] = [];

  const bySchema: Map<string, any[]> = new Map<string, any>();

  for (const config of Object.values(SETTINGS2_0)) {
    const { schemaId } = config;

    if (bySchema.has(schemaId)) {
      // pass
    } else {
      bySchema.set(schemaId, []);
    }

    const schemaList = bySchema.get(schemaId);
    if (schemaList) {
      schemaList.push(config);
      bySchema.set(schemaId, schemaList);
    }
  }

  bySchema.forEach((configList: any[], schemaId: string) => {
    allSchemas.push(
      <SettingsSchema
        key={"SCHEMA" + schemaId}
        schemaId={schemaId}
        configs={configList}
        pushAll={pushAll}
      />
    );
  });

  return allSchemas;
}
