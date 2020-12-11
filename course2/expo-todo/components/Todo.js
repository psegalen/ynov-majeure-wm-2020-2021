import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TodoLine from "./TodoLine";

const Todo = (props) => {
  return (
    <View style={todoStyles.root}>
      {props.data.length === 0 ? (
        <Text style={{ textAlign: "center" }}>Nothing</Text>
      ) : (
        props.data.map((task) => (
          <TodoLine
            task={task}
            key={task.id}
            refreshData={props.refreshData}
          />
        ))
      )}
    </View>
  );
};

const todoStyles = StyleSheet.create({
  root: {
    justifyContent: "flex-start",
    padding: 8,
    flex: 1,
  },
});

export default Todo;
