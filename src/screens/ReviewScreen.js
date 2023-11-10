import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Alert } from "react-native";
import { auth } from "../firebase/config";
import {
  addReviewToMovie,
  getReviewsForMovie,
  addReplyToReview,
  getRepliesForReview,
} from "../firebase/database";

const ReviewScreen = ({ route }) => {
  const [reviewText, setReviewText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [reviews, setReviews] = useState([]);
  const movieId = route.params?.movieId; // Safely access movieId

  useEffect(() => {
    if (movieId) {
      fetchReviews(movieId);
    }
  }, [movieId]);

  const fetchReviews = async (movieId) => {
    const fetchedReviews = await getReviewsForMovie(movieId);
    // Assuming each review has a unique ID
    for (let review of fetchedReviews) {
      review.replies = await getRepliesForReview(movieId, review.id);
    }
    setReviews(fetchedReviews);
  };

  const handleAddReview = async () => {
    if (reviewText.trim() === "") {
      Alert.alert("Error", "Review cannot be empty.");
      return;
    }
    const reviewData = {
      userId: auth.currentUser.uid,
      text: reviewText,
      createdAt: new Date(),
    };
    await addReviewToMovie(movieId, reviewData);
    setReviewText("");
    fetchReviews(movieId); // Refresh reviews
  };

  const handleReplyToReview = async (reviewId) => {
    if (replyText.trim() === "") {
      Alert.alert("Error", "Reply cannot be empty.");
      return;
    }
    const replyData = {
      userId: auth.currentUser.uid,
      text: replyText,
      createdAt: new Date(),
    };
    await addReplyToReview(movieId, reviewId, replyData);
    setReplyText("");
    fetchReviews(movieId); // Refresh reviews
  };

  const renderReply = ({ item }) => (
    <View>
      <Text>{item.userId}</Text>
      <Text>{item.text}</Text>
    </View>
  );

  const renderReview = ({ item }) => (
    <View>
      <Text>{item.userId}</Text>
      <Text>{item.text}</Text>
      <TextInput
        value={replyText}
        onChangeText={setReplyText}
        placeholder="Write a reply..."
      />
      <Button title="Reply" onPress={() => handleReplyToReview(item.id)} />
      <FlatList
        data={item.replies}
        renderItem={renderReply}
        keyExtractor={(reply) => reply.id}
        ListHeaderComponent={<Text>Replies:</Text>}
      />
    </View>
  );

  return (
    <View>
      <TextInput
        value={reviewText}
        onChangeText={setReviewText}
        placeholder="Write a review..."
      />
      <Button title="Submit Review" onPress={handleAddReview} />
      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ReviewScreen;
