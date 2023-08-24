import {
  Container,
  Divider,
  Flex,
  Heading,
  Paragraph,
  Text,
} from "@dynatrace/strato-components-preview";
import React from "react";
import { CONFIG_READER, CONFIG_WRITER, TOKEN_PRESETS } from "../service/tokens/tokens";
import { TokenCreation } from "../components/tokens/TokenCreation";
import { getTenantURL } from "../utils/tenantUrl";

const SKIP_TOKEN = [
  CONFIG_READER, CONFIG_WRITER
]

export const Tokens = () => {
  return (
    <Flex flexDirection="column" alignItems="left" padding={32}>
      <Container>
        <Heading level={3}>Tokens Creation</Heading>
        <Divider />
        <Flex flexItem mt={8}>
          <Paragraph>
            <Text>
              Here, you can generate preset tokens for different uses.
            </Text>
          </Paragraph>
        </Flex>
        <Flex flexItem mt={20}>
          <Paragraph>
            <span>Tenant URL: </span>
            <span>{getTenantURL()}</span>
          </Paragraph>
        </Flex>
      </Container>
      {genAllTokens()}
    </Flex>
  );
};

function genAllTokens() {
  const allConfigs: React.JSX.Element[] = [];

  TOKEN_PRESETS.forEach((info, preset) => {
    if(SKIP_TOKEN.includes(preset)) {
      return
    }
    allConfigs.push(<TokenCreation info={info} preset={preset} />);
  });

  return allConfigs;
}
