import {
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
} from "@dynatrace/strato-components-preview";
import React, { Fragment, useCallback, useState } from "react";
import { TokenCreationInfo, getTokenPreset } from "../../service/tokens/tokens";

interface TokenCreationProps {
  preset: string;
  info: TokenCreationInfo;
}

export const TokenCreation = ({ preset, info }: TokenCreationProps) => {
  const [token, setToken] = useState("");

  const handleGenerateToken = useCallback(() => {
    getTokenPreset(preset).then((token) => {
      setToken(token);
    });
  }, [preset]);

  return (
    <Fragment>
      {token ? (
        <Container>
          <Heading level={4}>{info.label} token</Heading>
          <Divider />
          <Flex flexItem mt={8}>
            {info.url ? (
              <a target="_blank" rel="noreferrer" href={info.url}>
                <Text textStyle="base-emphasized">{info.url}</Text>
              </a>
            ) : null}
            <Text>
              <span>Token: </span>
              <span>{token}</span>
            </Text>
            <Text>
              <span>Scopes: </span>
              <span>{info.scopes.join(", ")}</span>
            </Text>
          </Flex>
        </Container>
      ) : (
        <Button variant="emphasized" onClick={handleGenerateToken}>
          {info.label}
        </Button>
      )}
    </Fragment>
  );
};
