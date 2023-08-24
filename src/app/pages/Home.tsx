import {
  Container,
  Divider,
  Flex,
  Heading,
  Link,
  Paragraph,
  Strong,
  Text,
} from "@dynatrace/strato-components-preview";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { SettingsSchema } from "../components/settings/SettingsSchema";
import { getAllowSelfConnectionV1 } from "../configs/settings2_0/allowed-outbound-connections/allowSelfConnectionV1";
import { getTenantHostname } from "../utils/tenantUrl";

export const APP_NAME = "Auto Settings App";

export const Home = () => {
  return (
    <Flex flexDirection="column" alignItems="left" padding={32}>
      <Container>
        <Heading level={4}>Setting up the tenant for V1 Configs</Heading>
        <Divider />
        <Flex flexItem mt={8}>
          <Text>
            In order to run V1 configs, you may need to enable outbound
            connections to <Strong>{getTenantHostname()}</Strong>
          </Text>
        </Flex>
        <Flex flexItem mt={20}>
          <SettingsSchema
            schemaId={getAllowSelfConnectionV1()[0].schemaId}
            configs={getAllowSelfConnectionV1()}
          />
        </Flex>
      </Container>
      <Container>
        <Heading level={4}>Pushing Configurations</Heading>
        <Divider />
        <Flex flexItem mt={8}>
          <Text>Most configurations can be pushed through APIs</Text>
          <Text>But a few of them will have to be done manually</Text>
        </Flex>
        <Flex flexItem mt={20}>
          <Paragraph>
            <Link as={RouterLink} to={"/ApplyConfigs"}>
              Automated configurations
            </Link>
          </Paragraph>
          <Paragraph>
            <Link as={RouterLink} to={"/ManualConfigs"}>
              Manual Configurations
            </Link>
          </Paragraph>
          <Paragraph>
            <Link as={RouterLink} to={"/Tokens"}>
              Token Creation
            </Link>
          </Paragraph>
        </Flex>
      </Container>
    </Flex>
  );
};
