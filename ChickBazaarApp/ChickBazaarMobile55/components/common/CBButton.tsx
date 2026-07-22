import React from "react";
import PrimaryButton from "../ui/PrimaryButton";

type Props = React.ComponentProps<typeof PrimaryButton>;

export default function CBButton(props: Props) {
  return <PrimaryButton {...props} />;
}