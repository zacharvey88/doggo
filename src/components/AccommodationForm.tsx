import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { supabase } from "../lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useRouter, useNavigation } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";


export default function AccommodationForm({existingAccommodation_id,
  existingTitle,
  existingDescription,
  existingAddress,
  existingPhone,
  existingPhotos,
  existingPostcode,
  existingBooking_url,
  existingCity,
  existingCountry,
  existingState,
  existingRating,
  edit}:{
    accommodation_id: number;
    description: string;
    address: string;
    phone: string | null;
    photos: string[];
    title: string;
    postcode: number | string;
    booking_url: string;
    city: string;
    country: string;
    state: string;
    rating: number;
  }) {
    const [name, setName] = useState(existingTitle ? existingTitle:"");
    
  const [imageURL, setImageURL] = useState(existingPhotos || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [address, setAddress] = useState(existingAddress || "");
  const [phone, setPhone] = useState(existingPhone || "");
  const [postcode, setPostcode] = useState(existingPostcode || "");
  const [city, setCity] = useState(existingCity || "");
  const [country, setCountry] = useState(existingCountry || "");
  const [state, setState] = useState(existingState || "");

  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const { session } = useAuth();
  const router = useRouter();

  const MAX_WIDTH = 1000;
  const MAX_HEIGHT = 1000;

  const validateForm = () => {
    let errors = {};
    if (!name) errors.name = "Title is required";
    // if (!imageURL) errors.imageURL = "Image URL is required";
    if (!description) errors.description = "Description is required";
    if (!address) errors.address = "Address is required";
    if (!phone) errors.phone = "Phone is required";
    if (!postcode) errors.postcode = "Postcode is required";
    if (!city) errors.city = "City is required";
    if (!country) errors.country = "Country is required";
    if (!state) errors.state = "State is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitForm = async () => {
    const { data, error } = await supabase.from("accommodation").insert({
      user_id: session?.user.id,
      title: name,
      photos: imageURL,
      description: description,
      address: address,
      phone: phone,
      postcode: postcode,
      city: city,
      country: country,
      state: state,
    });
    if (error) {
      Alert.alert(error.message);
    } else {
      router.replace("manage-properties");
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      edit ? handleEdit() : submitForm();
    }
  };

  const handleEdit = async () => {

    const accommodationData = {
      user_id: session?.user.id,
      title: name,
      description: description,
      photos: [imageURL],
      address: address,
      phone: phone,
      postcode: postcode,
      city: city,
      country: country,
      state: state,
    }
    
    
    const { data, error } = await supabase
    .from("accommodation")
    .update(accommodationData)
    .eq('accommodation_id', existingAccommodation_id);
    if (error) {
      Alert.alert(error.message);
      console.log(error.message);
      
    } else {
      router.replace("manage-properties");
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };

  async function pickImage() {
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
      setImageURL([image.uri]);
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
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContent}
        enableOnAndroid={true}
        extraScrollHeight={100}
      >
        <View style={styles.formContainer}>
          <Text style={styles.label}>Accommodation Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Accommodation Name"
            value={name}
            onChangeText={setName}
            autoCorrect={false}
            autoCapitalize="words"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Enter Description"
            value={description}
            onChangeText={setDescription}
            autoCorrect={false}
            autoCapitalize="words"
            multiline={true}
          />
          {errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}

          <Text style={styles.label}>House Number & Street Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your House Number & Street Name"
            value={address}
            onChangeText={setAddress}
            autoCorrect={false}
            autoCapitalize="words"
          />
          {errors.address && (
            <Text style={styles.errorText}>{errors.address}</Text>
          )}

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Phone Number"
            value={phone}
            onChangeText={setPhone}
            autoCorrect={false}
            autoCapitalize="words"
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

          <Text style={styles.label}>Postcode</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Postcode"
            value={postcode}
            onChangeText={setPostcode}
            autoCorrect={false}
            autoCapitalize="words"
          />
          {errors.postcode && (
            <Text style={styles.errorText}>{errors.postcode}</Text>
          )}

          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your City"
            value={city}
            onChangeText={setCity}
            autoCorrect={false}
            autoCapitalize="words"
          />
          {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your Country"
            value={country}
            onChangeText={setCountry}
            autoCorrect={false}
            autoCapitalize="words"
          />
          {errors.country && (
            <Text style={styles.errorText}>{errors.country}</Text>
          )}

          <Text style={styles.label}>State</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Your State"
            value={state}
            onChangeText={setState}
            autoCorrect={false}
            autoCapitalize="words"
          />
          {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

          <View style={styles.uploadButtonContainer}>
            <Button
              title={uploading ? "Uploading ..." : "Pick Image"}
              onPress={pickImage}
              disabled={uploading}
            />
          </View>
          {/* {imageURL ? (
            <Text style={styles.imageURLText}></Text>
          ) : null} */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClose} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding:10
  },
  scrollViewContent: {
    padding: 20,
  },
  formContainer: {
    paddingBottom: 20,
    flex: 1, // Added flex: 1 to make the container take up the full space
  },
  input: {
    marginBottom: 15,
    padding: 10,
    borderColor: "#cfd4d4",
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    flexGrow: 1,
    maxWidth: "100%",
    minWidth: "100%",
  },
  textarea: {
    height: 100,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  errorText: {
    color: "#cc0000",
    marginBottom: 15,
  },
  uploadButtonContainer: {
    marginVertical: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageURLText: {
    textAlign: "center",
    color: "#3A90CD",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#fff",
    gap: 30
    
  },
  button: {
    backgroundColor: "#3A90CD",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    flexGrow: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
