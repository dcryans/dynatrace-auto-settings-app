import { Button } from "@dynatrace/strato-components-preview";
import React, { Fragment } from "react";

interface PushAllButtonProps {
  label: string;
  enabled: boolean;
  setPushAll: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PushAllButton = (props: PushAllButtonProps) => {
  return genButton(props);
};

const genButton = ({ label, enabled, setPushAll }: PushAllButtonProps) => {
  let button: React.JSX.Element = <Fragment />;

  if (enabled) {
    button = (
      <Button
        color="warning"
        variant="emphasized"
        onClick={() => {
          setPushAll(true);
        }}
      >
        Push all {label}
      </Button>
    );
  }

  return button;
};
