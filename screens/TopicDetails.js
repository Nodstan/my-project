import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../config";

export default function TopicDetails({ navigation, route }) {
  const flatListRef = useRef(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [replying, setReplying] = useState({});
  const [userId, setUserId] = useState(null);

  const topicId = route.params?.topicId || "cardiac-cycle";
  const API_URL = `${BASE_URL}/comments`;

  useEffect(() => {
    const fetchUserId = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserId(payload.id);
      }
    };
    fetchUserId();
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/${topicId}`);
      const data = await res.json();
      setComments(Array.isArray(data) ? data.reverse() : []);
    } catch (error) {
      console.error("Fetch comments error:", error);
      Alert.alert("Error", error.message || "Unable to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  const getHeaders = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) throw new Error("Not signed in");
    return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  };

  const handlePostComment = async () => {
    if (!comment.trim()) return;
    try {
      setPosting(true);
      const headers = await getHeaders();
      const res = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify({ topicId, text: comment }),
      });
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [data, ...prev]);
        setComment("");
      } else {
        Alert.alert("Error", data.message || "Failed to post comment");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", err.message);
    } finally {
      setPosting(false);
    }
  };
  
  const handleReaction = async (commentId, type) => {
    try {
      const headers = await getHeaders();
      const comment = comments.find((c) => c._id === commentId);
      if (!comment) return;

      let updatedComment = { ...comment };
      const liked = comment.likedBy?.includes(userId);
      const disliked = comment.dislikedBy?.includes(userId);

      if (type === "like") {
        if (!liked) {
          updatedComment.likes = (comment.likes || 0) + 1;
          updatedComment.likedBy = [...(comment.likedBy || []), userId];
          if (disliked) {
            updatedComment.dislikes = (comment.dislikes || 1) - 1;
            updatedComment.dislikedBy = comment.dislikedBy.filter((id) => id !== userId);
          }
        }
      } else if (type === "dislike") {
        if (!disliked) {
          updatedComment.dislikes = (comment.dislikes || 0) + 1;
          updatedComment.dislikedBy = [...(comment.dislikedBy || []), userId];
          if (liked) {
            updatedComment.likes = (comment.likes || 1) - 1;
            updatedComment.likedBy = comment.likedBy.filter((id) => id !== userId);
          }
        }
      }

      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? updatedComment : c))
      );

      const res = await fetch(`${API_URL}/${commentId}/reaction`, {
        method: "POST",
        headers,
        body: JSON.stringify({ type }),
      });

      if (!res.ok) throw new Error("Failed to react");

      const serverComment = await res.json();
      setComments((prev) =>
        prev.map((c) => (c._id === commentId ? serverComment : c))
      );
    } catch (err) {
      console.error("Reaction error:", err);
    }
  };

  const handleReply = async (commentId) => {
    const text = replying[commentId];
    if (!text?.trim()) return;
    try {
      const headers = await getHeaders();
      const res = await fetch(`${API_URL}/${commentId}/reply`, {
        method: "POST",
        headers,
        body: JSON.stringify({ text }),
      });
      const newReply = await res.json();
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId
            ? { ...c, replies: [...(Array.isArray(c.replies) ? c.replies : []), newReply] }
            : c
        )
      );
      setReplying((prev) => ({ ...prev, [commentId]: "" }));
    } catch (err) {
      console.error(err);
    }
  };

  const renderCommentItem = ({ item }) => {
    const liked = item.likedBy?.includes(userId);
    const disliked = item.dislikedBy?.includes(userId);
    const commentAuthor = item.user
  ? item.user.fullName || item.user.username || "Anonymous"
  : "Anonymous";

    return (
      <View style={styles.commentCard}>
        <Image
          source={
            item.user?.avatar
              ? { uri: item.user.avatar }
              : require("../assets/avatar.png")
          }
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.commentUser}>{commentAuthor}</Text>
            <Text style={styles.commentTime}>
              • {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Text>
          </View>
          <Text style={styles.commentText}>{item.text}</Text>

          <View style={styles.commentActions}>
            <TouchableOpacity onPress={() => handleReaction(item._id, "like")}>
              <Ionicons
                name={liked ? "thumbs-up" : "thumbs-up-outline"}
                size={18}
                color={liked ? "#007AFF" : "#00A86B"}
              />
            </TouchableOpacity>
            <Text style={styles.reactionText}>{item.likes || 0}</Text>

            <TouchableOpacity
              onPress={() => handleReaction(item._id, "dislike")}
              style={{ marginLeft: 12 }}
            >
              <Ionicons
                name={disliked ? "thumbs-down" : "thumbs-down-outline"}
                size={18}
                color="#FF3B30"
              />
            </TouchableOpacity>
            <Text style={styles.reactionText}>{item.dislikes || 0}</Text>
          </View>

          {(Array.isArray(item.replies) ? item.replies : []).map((r, idx) => {
            const replyAuthor = r.user
            ? r.user.fullName || r.user.username || "Anonymous"
            : "Anonymous";
            return (
              <View
                key={r._id || r.id || `${item._id}-reply-${idx}`}
                style={styles.replyCard}
              >
                <Text style={styles.replyUser}>{replyAuthor}:</Text>
                <Text style={styles.replyText}>{r.text}</Text>
              </View>
            );
          })}

          <View style={styles.replyBox}>
            <TextInput
              placeholder="Reply..."
              style={styles.replyInput}
              value={replying[item._id] || ""}
              onChangeText={(text) =>
                setReplying((prev) => ({ ...prev, [item._id]: text }))
              }
            />
            <TouchableOpacity onPress={() => handleReply(item._id)}>
              <Ionicons name="send" size={20} color="#00A86B" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const ListHeader = () => (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>The House with Four{"\n"}Doors</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tagsRow}>
        <Text style={styles.tag}>Cardiovascular</Text>
        <Text style={styles.tag}>Cardiac Cycle</Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={require("../assets/heartss.png")} style={styles.image} />
      </View>

      <View style={styles.tagsRows}>
        <Text style={styles.tags}>Cardiac Cycle</Text>
      </View>

      <Text style={styles.paragraph}>
        Once upon a time in the center of the body stood a marvelous house called Cardio Manor...
      </Text>
      <Text style={styles.paragraph}>
        Each day, tiny red messengers (RBCs) arrived at the front gate, tired and out of breath...
      </Text>

      <View style={styles.reactionRow}>
        <Ionicons name="thumbs-up-outline" size={20} color="#00A86B" />
        <Text style={styles.reactionText}>11</Text>
        <Ionicons
          name="eye-outline"
          size={20}
          color="#555"
          style={{ marginLeft: 15 }}
        />
        <Text style={styles.reactionText}>11</Text>
      </View>

      <Text style={styles.commentsHeader}>Drop Your Thoughts</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#00A86B" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          ref={flatListRef}
          data={comments}
          keyExtractor={(item) => item._id || item.id}
          renderItem={renderCommentItem}
          ListHeaderComponent={ListHeader}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 120 }}
          removeClippedSubviews={false}
        />
      )}

      <View style={styles.commentBox}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={handlePostComment} disabled={posting}>
          {posting ? (
            <ActivityIndicator size="small" color="#00A86B" />
          ) : (
            <Ionicons name="send" size={22} color="#00A86B" />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 60 : 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    color: "#1A1A1A",
    lineHeight: 28,
  },
  tagsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 15,
  },
  tag: {
    backgroundColor: "#F0F7FF",
    color: "#007AFF",
    fontSize: 12,
    fontWeight: "600",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  imageContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
  },
  tagsRows: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 15,
  },
  tags: {
    backgroundColor: "#F0F7FF",
    color: "#007AFF",
    fontSize: 12,
    fontWeight: "600",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#4A4A4A",
    paddingHorizontal: 20,
    marginBottom: 15,
    textAlign: "justify",
  },
  reactionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    paddingBottom: 15,
  },
  reactionText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 6,
    marginRight: 15,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: "700",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 15,
    color: "#1A1A1A",
  },
  commentCard: {
     flexDirection: "row",
     paddingHorizontal: 20,
     paddingVertical: 16,
     backgroundColor: "#fff",
     borderBottomWidth: 1,
     borderBottomColor: "#F0F0F0",
   },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: "#F0F0F0",
  },
  commentUser: {
    fontWeight: "700",
    color: "#1A1A1A",
    fontSize: 14,
  },
  commentTime: {
    fontWeight: "400",
    color: "#999",
    fontSize: 12,
    marginLeft: 4,
  },
  commentText: {
    marginTop: 4,
    fontSize: 15,
    lineHeight: 20,
    color: "#333",
  },
  commentActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  replyBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    backgroundColor: "#F8F8F8",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  replyInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 8,
    color: "#333",
  },
  replyCard: {
    marginTop: 10,
    marginLeft: 0,
    padding: 12,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
  },
  replyUser: {
    fontWeight: "700",
    fontSize: 13,
    color: "#1A1A1A",
    marginBottom: 2,
  },
  replyText: {
    fontSize: 14,
    color: "#4A4A4A",
  },
  commentBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    backgroundColor: "#FFF",
    paddingBottom: Platform.OS === "ios" ? 30 : 15,
  },
  input: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 12,
    fontSize: 15,
  },
});
