import {
  Container,
  Divider,
  Flex,
  Heading,
} from "@dynatrace/strato-components-preview";
import React, { useState } from "react";
import { SettingsButton, getKeyValue } from "./SettingsButton";
import { PushAllButton } from "../buttons/PushAllButton";

interface SettingsSchemaProps {
  schemaId: string;
  configs: any[];
  pushAll?: boolean;
}

export const SettingsSchema = ({
  schemaId,
  configs,
  pushAll = false,
}: SettingsSchemaProps) => {
  const [pushGroup, setPushGroup] = useState(false);

  return (
    <Container>
      <Heading level={5}>{schemaId}</Heading>
      <Divider />
      <Flex flexItem mt={8}>
        <PushAllButton
          label={schemaId}
          enabled={configs && configs.length > 1}
          setPushAll={setPushGroup}
        />
      </Flex>
      <Flex flexItem mt={20}>
        {genAllConfigs(configs, pushAll, pushGroup)}
      </Flex>
    </Container>
  );
};

function genAllConfigs(configs: any[], pushAll: boolean, pushGroup: boolean) {
  const allConfigs: React.JSX.Element[] = [];

  for (const config of Object.values(configs)) {
    allConfigs.push(
      <SettingsButton
        key={"SETTING" + getKeyValue(config)}
        config={config}
        pushAll={pushAll}
        pushGroup={pushGroup}
      />
    );
  }
  return allConfigs;
}
