import { View, Text, FlatList, StyleSheet, Modal, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import BookmarkItem from "./BookmarkItem";
import { authGet } from "../../helpers/authenticatedCalls";
import FocusBookmark from "./FocusBookmark";

export default function Bookmark(props) {
  const [allBookmarks, setAllBookmarks] = useState([]);
  const [focusBookmark, setFocusBookmark] = useState(null);
  const [clickBookmark, setClickBookmark] = useState(false); // Modal State

  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const response = await authGet("/bookmarks/");
        setAllBookmarks(response.data);
        console.log(allBookmarks);
      } catch (error) {
        console.log(error);
      }
    };
    getBookmarks();
  }, []);

  const popUpBookmark = (id) => {
    setClickBookmark(true);
    setFocusBookmark(id);
  };

  const cancelFocusBookmark = () => {
    setClickBookmark(false);
    setFocusBookmark(null);
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
              Bookmarks
            </Text>

            <FlatList
              data={allBookmarks}
              keyExtractor={(allBookmarks) => allBookmarks.id}
              numColumns={2}
              renderItem={(bookmark) => (
                <BookmarkItem
                  bookmark={bookmark}
                  popUpBookmark={popUpBookmark}
                  cancelFocusBookmark={cancelFocusBookmark}
                />
              )}
              columnWrapperStyle={{
                justifyContent: "space-between",
              }}
            />
          </View>
        </View>
        {clickBookmark && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={clickBookmark}
            onRequestClose={() => {
              setClickBookmark(false);
            }}
          >
            {/* <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Button
                onPress={() => setClickBookmark(false)}
                title="click to close"
              ></Button>
            </View> */}
            <FocusBookmark cancelFocusBookmark={cancelFocusBookmark} />
          </Modal>
        )}
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
  },
  headings: {
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 2,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
