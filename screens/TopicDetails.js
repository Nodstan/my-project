import React, { useState, useRef } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TopicDetails({ navigation, route }) {
  const [comment, setComment] = useState('');
  const flatListRef = useRef(null);

  const [comments, setComments] = useState([
    {
      id: '1',
      user: 'Brian',
      avatar: require('../assets/avatar.png'),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      likes: 11,
      dislikes: 1,
      replies: 1,
    },
    {
      id: '2',
      user: 'Brian',
      avatar: require('../assets/avatar.png'),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      likes: 11,
      dislikes: 1,
      replies: 1,
    },
  ]);

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

      <Image
        source={require('../assets/heartss.png')}
        style={styles.image}
      />

      <View style={styles.tagsRows}>
        <Text style={styles.tags}>Cardiac Cycle</Text>
      </View>
      <Text style={styles.paragraph}>
        Once upon a time in the center of the body stood a marvelous house called Cardio Manor. This wasn’t just any house, it had four rooms and four magical doors that only opened one way.
      </Text>
      <Text style={styles.paragraph}>
        Each day, tiny red messengers (called RBCs) arrived at the front gate, tired and out of breath. They had traveled far through the body, delivering oxygen and collecting waste.
      </Text>
      <Text style={styles.paragraph}>
        The first room, Right Atrium, welcomed them warmly. “Come in!” it said, opening its door ; the tricuspid valve, to the next room, Right Ventricle. This room had strong walls and loved to push things forward.
      </Text>
      <Text style={styles.paragraph}>
        “Time to visit the lungs!” Right Ventricle declared and sent the messengers through another one-way door, the pulmonary valve, straight to the lungs, where they dropped off waste and filled up with fresh oxygen
      </Text>
      <Text style={styles.paragraph}>
        Refreshed and smiling, the RBCs came back and knocked on Room Three, the Left Atrium. “Welcome back!” it said, opening the mitral valve to lead them into the final and strongest chamber: the Left Ventricle.
      </Text>
      <Text style={styles.paragraph}>
        This room was the hero of the house... bold, muscular, and always ready to push.
      </Text>
      <Text style={styles.paragraph}>
        With a big “Whoosh!” Left Ventricle launched the messengers through the aortic valve, sending them back out into the world, to feed the brain, the muscles, and every corner of the body.
      </Text>
      <Text style={styles.paragraph}>
        And so the house kept beating, day and night, opening and closing its four magical doors in perfect rhythm.
      </Text>
      <Text style={styles.paragraph}>
        Because in Cardio Manor, every room had a purpose, and every beat told a story.
      </Text>

      <View style={styles.reactionRow}>
        <Ionicons name="thumbs-up-outline" size={20} color="#00A86B" />
        <Text style={styles.reactionText}>11</Text>
        <Ionicons name="eye-outline" size={20} color="#555" style={{ marginLeft: 15 }} />
        <Text style={styles.reactionText}>11</Text>
      </View>

      <Text style={styles.commentsHeader}>Drop Your Thoughts</Text>
    </View>
  );

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentCard}>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.commentUser}>
          {item.user} <Text style={styles.commentTime}>Just now</Text>
        </Text>
        <Text style={styles.commentText}>{item.text}</Text>
        <View style={styles.commentActions}>
          <Ionicons name="thumbs-up-outline" size={18} color="#00A86B" />
          <Text style={styles.reactionText}>{item.likes}</Text>
          <Ionicons name="thumbs-down-outline" size={18} color="#FF3B30" style={{ marginLeft: 12 }} />
          <Text style={styles.reactionText}>{item.dislikes}</Text>
          <Ionicons name="chatbubble-outline" size={18} color="#00A86B" style={{ marginLeft: 12, marginRight: 5 }}/>
          <Text style={styles.replyBtn}>Reply</Text>
        </View>
      </View>
    </View>
  );

  const renderFooter = () => (
    <TouchableOpacity
      style={styles.backToTop}
      onPress={() => flatListRef.current?.scrollToOffset({ offset: 0, animated: true })}
    >
      <Text style={styles.backToTopText}>Back to top</Text>
      <Image
        source={require('../assets/chevron-up.png')}
        style={{ width: 16, height: 16, marginLeft: 4 }}
      />
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={renderCommentItem}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 120 }}
        removeClippedSubviews={false}
      />
\
      <View style={styles.commentBox}>
        <TextInput
          style={styles.input}
          placeholder="Write a comment..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity>
          <Ionicons name="send" size={22} color="#00A86B" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, justifyContent: 'space-between', marginTop: 50 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  tagsRow: { flexDirection: 'row', paddingHorizontal: 16, gap: 8 },
  tag: { backgroundColor: '#EAF2FD', color: '#2F80ED', fontSize: 12, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20 },
  image: { width: '100%', height: 250, borderRadius: 10, padding: 16, paddingBottom: 0, marginBottom: 15 },
  tagsRows: { flexDirection: 'row', paddingHorizontal: 16, gap: 8 },
  tags: { backgroundColor: '#EAF2FD', color: '#2F80ED', fontSize: 12, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20, marginBottom: 25 },
  paragraph: { fontSize: 14, lineHeight: 22, color: '#333', paddingHorizontal: 16, marginBottom: 10 },
  reactionRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginVertical: 10 },
  reactionText: { fontSize: 13, color: '#555', marginLeft: 4 },
  commentsHeader: { fontSize: 16, fontWeight: 'bold', margin: 16 },
  commentCard: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  avatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  commentUser: { fontWeight: 'bold' },
  commentTime: { fontWeight: 'normal', color: '#888', fontSize: 12 },
  commentText: { marginVertical: 4, fontSize: 14, color: '#333' },
  commentActions: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  replyBtn: { fontSize: 14, color: '#00A86B' },
  backToTop: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 16, backgroundColor: '#F4F4F4', padding: 12, borderRadius: 20, width: '35%', alignSelf: 'center' },
  backToTopText: { marginRight: 4, fontSize: 14, color: '#333' },
  commentBox: { flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, borderTopColor: '#eee' },
  input: { flex: 1, backgroundColor: '#f2f2f2', padding: 10, borderRadius: 20, marginRight: 10 },
});
