import { icons } from '@/constants/icons';
import React from 'react';
import { Image, Linking, TouchableOpacity, View } from 'react-native';

// Utility function
const getOfficialTrailer = (trailers: any) => {
  if (!trailers?.youtube) return null;

  // Look for "Official Trailer"
  let official = trailers.youtube.find(
    (t: any) => t.type === "Trailer" && t.name.toLowerCase().includes("official trailer")
  );

  // Fallback: first Trailer
  if (!official) {
    official = trailers.youtube.find((t: any) => t.type === "Trailer");
  }

  return official ? `https://www.youtube.com/watch?v=${official.source}` : null;
};

// Button component
const YouTubeButton = ({ trailers }: any) => {
  const youtubeUrl = getOfficialTrailer(trailers);

  const openYouTube = async () => {
    if (!youtubeUrl) {
    //   console.log("No trailer available");
      return;
    }

    const supported = await Linking.canOpenURL(youtubeUrl);
    if (supported) {
      await Linking.openURL(youtubeUrl);
    } else {
      console.log("Can't open URL: " + youtubeUrl);
    }
  };

  return youtubeUrl ? (
    <TouchableOpacity onPress={openYouTube}>
      <Image source={icons.youtube} className="size-8 my-3" />
    </TouchableOpacity>
  ) :  (
    <View className=""></View>
  );
};

export default YouTubeButton;
