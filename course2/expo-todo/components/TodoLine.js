import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  useWindowDimensions,
} from "react-native";
import { setIsCompleted, deleteTask } from "./api";
import OurButton from "./OurButton";

const TodoLine = ({ task, refreshData }) => {
  const [switchValue, setSwitchValue] = useState(task.isCompleted);
  const { width } = useWindowDimensions();
  return (
    <View style={[todoStyles.todoLine, { width: width - 32 }]}>
      <Switch
        value={switchValue}
        onValueChange={(value) => {
          setSwitchValue(value);
          setIsCompleted(task.id, value);
        }}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={[
            todoStyles.text,
            switchValue ? todoStyles.striked : undefined,
          ]}
        >
          {task.title}
        </Text>
      </View>
      <OurButton
        title="Del"
        onPress={() => {
          deleteTask(task.id).then(() => refreshData());
        }}
      />
    </View>
  );
};

const todoStyles = StyleSheet.create({
  todoLine: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 22,
    marginLeft: 16,
  },
  striked: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});

export default TodoLine;
