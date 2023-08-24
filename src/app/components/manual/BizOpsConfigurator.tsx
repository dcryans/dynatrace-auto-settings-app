import {
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Paragraph,
  Text,
} from "@dynatrace/strato-components-preview";
import React, { useCallback, useState } from "react";
import { getTenantURL } from "../../utils/tenantUrl";
import {
  BIZ_OPS_CONFIGURATOR,
  TOKEN_PRESETS,
  getTokenPreset,
} from "../../service/tokens/tokens";

export const BizOpsConfigurator = () => {
  const [token, setToken] = useState("");

  const handleGenerateToken = useCallback(() => {
    getTokenPreset(BIZ_OPS_CONFIGURATOR).then((token) => {
      setToken(token);
    });
  }, []);
  return (
    <Container>
      <Heading level={4}>Run BizOpsConfigurator</Heading>
      <Divider />
      <Flex flexItem mt={8}>
        <Paragraph>
          <a
            target="_blank"
            rel="noreferrer"
            href={TOKEN_PRESETS.get(BIZ_OPS_CONFIGURATOR)?.url + "/#begin"}
          >
            <Text textStyle="base-emphasized">
              Open Tab to the BizOpsConfigurator page
            </Text>
          </a>
        </Paragraph>
      </Flex>
      <Flex flexItem mt={20}>
        <Button variant="emphasized" onClick={handleGenerateToken}>
          Generate token
        </Button>
      </Flex>
      <Flex flexItem mt={20}>
        <Paragraph>
          <span>URL: </span>
          <span>{getTenantURL()}</span>
        </Paragraph>
        {token ? (
          <Paragraph>
            <span>Token: </span>
            <span>{token}</span>
          </Paragraph>
        ) : null}
      </Flex>
    </Container>
  );
};
