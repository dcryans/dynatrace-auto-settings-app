import {
  Container,
  Divider,
  Flex,
  Heading,
  Paragraph,
  Text,
} from "@dynatrace/strato-components-preview";
import React from "react";
import { DeepMonitoring } from "../components/manual/DeepMonitoring";
import { CustomLogSource } from "../components/manual/CustomLogSource";
import { BizOpsConfigurator } from "../components/manual/BizOpsConfigurator";

export const ManualConfigs = () => {
  return (
    <Flex flexDirection="column" alignItems="left" padding={32}>
      <Container>
        <Heading level={3}>Manual Configurations</Heading>
        <Divider />
        <Flex flexItem mt={8}>
          <Paragraph>
            <Text>Some settings are not accessible through API calls.</Text>
          </Paragraph>
          <Paragraph>
            <Text>Here is a list of what needs to be done manually:</Text>
            <Text>The links will open new tabs for ease of use.</Text>
          </Paragraph>
        </Flex>
      </Container>
      <DeepMonitoring />
      <CustomLogSource />
      <BizOpsConfigurator />
    </Flex>
  );
};
