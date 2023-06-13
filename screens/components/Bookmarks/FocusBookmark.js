import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { authDelete } from "../../helpers/authenticatedCalls";
import Feather from "react-native-vector-icons/Feather";

export default function FocusBookmark(props) {
  const { cancelFocusBookmark, focusBookmark } = props;
  const [id, instruction, title, users_id] = focusBookmark;

  const deleteBookmark = async () => {
    try {
      const response = await authDelete("/bookmarks", id);
      const data = response.data;
      console.log("Deleted bookmark:", data);
      cancelFocusBookmark();
      alert("Bookmark deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <LinearGradient
        colors={["#FE0944", "#FEAE96"]}
        style={styles.linearGradient}
      >
        <View style={styles.wrapper}>
          <View style={styles.contentBox}>
            <Text
              className="py-6 text-2xl font-bold text-white"
              style={styles.headings}
            >
              {title && title}
              {!title && "Untitled Bookmark"}
            </Text>
          </View>
        </View>
        <View style={styles.bookmarkInfo}>
          <View style={styles.innerborder}>
            <Pressable
              style={{ marginLeft: 10, marginTop: 10 }}
              onPress={cancelFocusBookmark}
            >
              <Feather name="arrow-left-circle" size={30} color="gray" />
            </Pressable>
            <View style={styles.textBox}>
              <Text style={{ textAlign: "center" }}>{instruction}</Text>
            </View>
            <Pressable
              title="Add"
              className="mt-4 rounded py-2"
              style={styles.button}
              onPress={deleteBookmark}
            >
              <Text style={{ color: "white" }}>Delete Bookmark</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  contentBox: {
    marginTop: 90,
    width: "100%",
    justifyContent: "center",
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  bookmarkInfo: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  textBox: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 50,
  },
  innerborder: {
    alignSelf: "center",
    marginVertical: 5,
    width: "97%",
    borderWidth: 1,
    borderColor: "#ff8aa6",
    borderStyle: "solid",
    borderRadius: 8,
  },
  button: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    backgroundColor: "#FE0944",
    width: "90%",
    marginBottom: 20,
  },
});
