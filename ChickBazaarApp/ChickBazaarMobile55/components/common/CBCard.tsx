import React from "react";
import Card from "../ui/Card";

type Props = React.ComponentProps<typeof Card>;

export default function CBCard(props: Props) {
  return <Card {...props} />;
}