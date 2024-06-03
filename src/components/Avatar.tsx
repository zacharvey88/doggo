import { useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabase";
import { StyleSheet, View, Alert, Image, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
}

const MAX_WIDTH = 800;
const MAX_HEIGHT = 800;
export default function Avatar({ url, size = 150, onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  const defaultImage = "https://i.sstatic.net/l60Hf.png";

  async function uploadAvatar() {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, 
        allowsMultipleSelection: false, 
        allowsEditing: true, 
        quality: 1,
        exif: false, 
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        return;
      }

      const image = result.assets[0];
      console.log("Got image", image);

      if (!image.uri) {
        throw new Error("No image uri!");
      }
      const { width, height } = image;
      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        Alert.alert(
          "Image too large",
          `Please select an image with dimensions not exceeding ${MAX_WIDTH}x${MAX_HEIGHT} pixels.`
        );
        return;
      }
      const arraybuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer()
      );

      const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, arraybuffer, {
          contentType: image.mimeType ?? "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(data.path);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <View>
      <Image
        source={{
          uri: avatarUrl
            ? `https://orcurstjttnhckjuhyqb.supabase.co/storage/v1/object/public/avatars/${avatarUrl}`
            : defaultImage,
        }}
        style={styles.image}
      />

      <View>
        <Button
          title={uploading ? "Uploading ..." : "Upload"}
          onPress={uploadAvatar}
          disabled={uploading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 5,
    overflow: "hidden",
    maxWidth: "100%",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 1,
    color: "gray",
  },
  noImage: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgb(200, 200, 200)",
    borderRadius: 5,
  },
});
