import React from "react";
import { View, Text } from "react-native";

const ReviewCard = ({ review }) => {
  return (
    <View>
      <Text>{review.username}</Text>
      <Text>{review.comment}</Text>
      {/* Other review details */}
    </View>
  );
};

export default ReviewCard;
