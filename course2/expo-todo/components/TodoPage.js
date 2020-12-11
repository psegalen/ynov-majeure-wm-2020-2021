import React, { useState, useEffect } from "react";
import { Text, View, Alert, ActivityIndicator } from "react-native";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";

import Todo from "./Todo";
import styles from "./styles";
import { getTasks } from "./api";
import OurButton from "./OurButton";

const TodoPage = ({ onNew }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const raiseError = (error) => Alert.alert(error);
  const refreshData = () => {
    setIsLoading(true);
    getTasks(setData, setIsLoading, raiseError);
  };
  useEffect(refreshData, []);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text
            style={styles.paragraph}
            onPress={() => setIsLoading(true)}
          >
            Todo-list
          </Text>
        </View>
        <OurButton title="New task" onPress={onNew} />
      </View>
      <View style={{ flex: 1 }}>
        <Card
          style={{
            minHeight: 150,
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Todo data={data} refreshData={refreshData} />
          )}
        </Card>
      </View>
    </View>
  );
};

export default TodoPage;
