import React from "react";
import { TouchableOpacity, Text } from "react-native";

const OurButton = ({ title, onPress, mode }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 50,
        backgroundColor: mode === "cancel" ? "#888" : "#F00",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        paddingHorizontal: 16,
        marginTop: 8,
        marginRight: 8,
      }}
      activeOpacity={0.2}
    >
      <Text
        style={{
          fontSize: 22,
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default OurButton;
