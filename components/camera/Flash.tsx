import React, { Dispatch, FC, SetStateAction, useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  isFlash: boolean;
  setIsFlash: Dispatch<SetStateAction<boolean>>;
};

const Flash: FC<Props> = (props) => {
  const { isFlash, setIsFlash } = props;

  const toggleFlash = useCallback(() => {
    setIsFlash((prev) => !prev);
  }, []);

  return (
    <TouchableOpacity onPress={toggleFlash} style={styles.flashBtn}>
      {isFlash ? (
        <Ionicons name="ios-flash-off-sharp" size={35} color="white" />
      ) : (
        <Ionicons name="ios-flash-sharp" size={35} color="white" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flashBtn: {
    marginTop: 40,
    marginRight: 20,
  },
});

export default Flash;
