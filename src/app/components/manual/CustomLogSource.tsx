import {
  Container,
  Divider,
  Flex,
  Heading,
  Paragraph,
  Text,
} from "@dynatrace/strato-components-preview";
import React from "react";
import { getTenantURL } from "../../utils/tenantUrl";

export const CustomLogSource = () => {
  return (
    <Container>
      <Heading level={4}>Enable Custom Log Source</Heading>
      <Divider />
      <Flex flexItem mt={8}>
        <Paragraph>
          <a
            target="_blank"
            rel="noreferrer"
            href={
              getTenantURL() +
              "/ui/settings/builtin:logmonitoring.custom-log-source-settings"
            }
          >
            <Text textStyle="base-emphasized">
              Open Tab to the Custom Log Source settings page
            </Text>
          </a>
        </Paragraph>
      </Flex>
    </Container>
  );
};
