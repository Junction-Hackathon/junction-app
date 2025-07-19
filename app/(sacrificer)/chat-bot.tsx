import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bot, Send } from "lucide-react-native";
import { useAuth } from "@/contexts/AuthContext";
import { ChatBotAPI } from "@/api/calls/chat-bot";

const _messages = [
  {
    from: "me",
    content: "Yo chat",
  },
  {
    from: "chat",
    content: "What is up?",
  },
];

type MessageT = (typeof _messages)[0];

export default function ChatBotScreen() {
  const [messageContent, setMessageContent] = useState<string>("Can you tell me more about eid al adha?");

  const [messages, setMessages] = useState<MessageT[]>(_messages);
  const pushMessage = (from: string, content: string) =>
    setMessages((prev) => [
      ...prev,
      {
        from,
        content,
      },
    ]);

  const ask = async () => {
    const trimmedMessageContent = messageContent.trim();
    if (trimmedMessageContent.length === 0) return;

    pushMessage("me", trimmedMessageContent);
    setMessageContent("");

    try {
      const { answer } = await ChatBotAPI.ask(trimmedMessageContent);
      return pushMessage("chat", answer);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={messageContent}
          placeholder="What are you thinking about today?"
          style={styles.input}
          onChangeText={(text) => setMessageContent(text)}
        />
        <Pressable style={styles.sendButton} onPress={ask}>
          <Send color="#097758ff" />
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "column-reverse",
          gap: 15,
          flex: 1,
        }}
      >
        {messages.reverse().map(({ from, content }) => (
          <View
            key={content}
            style={[
              styles.messageOuterContainer,
              {
                justifyContent: from === "me" ? "flex-end" : "flex-start",
              },
            ]}
          >
            <View
              style={[
                styles.messageInnerContainer,
                {
                  backgroundColor: from === "me" ? "#eeeeee" : "#097758ff",
                },
              ]}
            >
              <Text
                style={[
                  styles.messageContent,
                  {
                    color: from == "me" ? "black" : "white",
                  },
                ]}
              >
                {content}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dddddd",
    flexDirection: "column-reverse",
    borderColor: "black",
    gap: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  innerContainer: {
    flex: 1,
  },
  messageOuterContainer: {
    flexDirection: "row",
    display: "flex",
    width: "100%",
  },
  messageInnerContainer: {
    maxWidth: "70%",
    padding: 10,
    borderRadius: 10,
  },
  messageContent: {
    fontSize: 18,
    fontWeight: "normal",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 10,
    fontSize: 15,
    flex: 1,
    height: 45,
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  sendButton: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 10,
    height: 45,
    aspectRatio: "1/1",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
});
