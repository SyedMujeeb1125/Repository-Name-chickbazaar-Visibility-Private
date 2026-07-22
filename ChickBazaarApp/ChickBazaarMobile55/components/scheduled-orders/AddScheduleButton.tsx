import React from "react";

import PrimaryButton from "../ui/PrimaryButton";

type Props = {

  onPress: () => void;

  title?: string;

  loading?: boolean;

  disabled?: boolean;

};

export default function AddScheduleButton({

  onPress,

  title = "Add Schedule",

  loading = false,

  disabled = false,

}: Props) {

  return (

    <PrimaryButton

      title={title}

      onPress={onPress}

      loading={loading}

      disabled={disabled}

    />

  );

}