import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import EmergencyContactItem from "./EmergencyContactItem";
import EmergContactForm from "./forms/EmergContactForm";
import { authGet, authPost } from "../helpers/authenticatedCalls";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function EmergencyContact() {
  const [contacts, setContacts] = useState([]);
  const [person, setPerson] = useState({
    name: "",
    phone: "",
    relationship: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const response = await authGet("/emergencyContacts/");
        const data = response.data;
        setContacts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const nameTypeHandler = (text) => {
    setPerson({ ...person, name: text });
  };

  const phoneTypeHandler = (text) => {
    setPerson({ ...person, phone: text });
  };

  const relationshipTypeHandler = (text) => {
    setPerson({ ...person, relationship: text });
  };

  const addContactHandler = async () => {
    try {
      if (person.name && person.phone && person.relationship) {
        const response = await authPost("/emergencyContacts/", person);
        const data = response.data;
        setContacts([...contacts, data]);
        setPerson({ name: "", phone: "", relationship: "" });
      } else {
        alert("Please complete all the fields");
      }
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
        <View>
          <View style={styles.wrapper}>
            <View style={styles.contentBox}>
              <Text
                className="py-6 text-2xl font-bold text-white"
                style={styles.headings}
              >
                Emergency Contacts
              </Text>

              <FlatList
                data={contacts}
                keyExtractor={(contact) => contact.id}
                renderItem={({ item }) => <EmergencyContactItem {...item} />}
                contentContainerStyle={{ paddingBottom: 200 }}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.touchableOpacityStyle}
          onPress={() => setShowForm(!showForm)}
        >
          <View style={styles.floatingButton}>
            <Ionicons name="person-add" size={32} color="white" />
          </View>
        </TouchableOpacity>
        {showForm && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showForm}
            onRequestClose={() => setShowForm(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.formContainer}>
                <EmergContactForm />
                <TouchableOpacity onPress={() => setShowForm(false)}>
                  <Text>Close Modal</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  linearGradient: {
    width: "100%",
    height: "100%",
  },
  contentBox: {
    marginTop: 90,
    width: "100%",
    justifyContent: "center",
  },
  headings: {
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 2,
  },
  color: {
    color: "#555",
  },
  inputsmall: {
    width: "48%",
  },
  card: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    elevation: 3,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    backgroundColor: "#FE0944",
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: "#FE0944",
    borderRadius: 50,
    opacity: 0.7,
  },
  floatingButton: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
