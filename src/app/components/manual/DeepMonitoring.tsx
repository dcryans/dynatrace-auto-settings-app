import {
  Container,
  Divider,
  Flex,
  Heading,
  List,
  Paragraph,
  Strong,
  Text,
} from "@dynatrace/strato-components-preview";
import React from "react";
import { getTenantURL } from "../../utils/tenantUrl";

export const DeepMonitoring = () => {
  return (
    <Container>
      <Heading level={4}>Deep Monitoring</Heading>
      <Divider />
      <Flex flexItem mt={8}>
        <Paragraph>
          <a
            target="_blank"
            rel="noreferrer"
            href={getTenantURL() + "/#settings/deepmonitoring"}
          >
            <Text textStyle="base-emphasized">
              Open Tab to the Deep Monitoring settings page
            </Text>
          </a>
        </Paragraph>
      </Flex>
      <Flex flexItem mt={20}>
        <List ordered={false}>
          <Text>Exclude specific incoming web request URLs</Text>
          <List>
            <Text>
              Don't monitor incoming web requests with URL path that{" "}
              <Strong>contains</Strong> 'health'
            </Text>
            <Text>
              Don't monitor incoming web requests with URL path that{" "}
              <Strong>equals</Strong> 'ping'
            </Text>
            <Text>
              Don't monitor incoming web requests with URL path that{" "}
              <Strong>contains</Strong> 'readiness'
            </Text>
          </List>
          <Paragraph>
            <Text>Real-time updates to Java and PHP services</Text>
            <Text textStyle="small">
              (Could be an issue with Kubernetes. Look at turning this off when
              done)
            </Text>
          </Paragraph>
          <List>
            <Text>Enable real-time updates to Java services</Text>
          </List>
        </List>
      </Flex>
    </Container>
  );
};
