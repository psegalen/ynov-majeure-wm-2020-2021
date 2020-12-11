import React, { useState } from "react";
import { Text, View, Button, TextInput, Alert } from "react-native";

import { Card } from "react-native-paper";

import styles from "./styles";
import { createTask } from "./api";
import OurButton from "./OurButton";

const NewTaskPage = ({ onTodo }) => {
  const [title, setTitle] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Add a new task</Text>
      <Card style={{ padding: 16 }}>
        <Text style={{ fontSize: 22 }}>Title:</Text>
        <TextInput
          style={{
            borderWidth: 1,
            marginVertical: 16,
            padding: 16,
            fontSize: 22,
          }}
          onChangeText={(text) => setTitle(text)}
          placeholder="Do the washing-up"
          value={title}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <OurButton title="Cancel" onPress={onTodo} mode="cancel" />
          <OurButton
            title="Create task"
            onPress={() => {
              createTask(title, (error) =>
                Alert.alert(error)
              ).then(() => onTodo());
            }}
          />
        </View>
      </Card>
    </View>
  );
};

export default NewTaskPage;
