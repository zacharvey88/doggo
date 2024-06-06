import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome6 } from "@expo/vector-icons";

type AccommodationFormParams = {
  existingAccommodation_id?: number;
  existingTitle?: string;
  existingDescription?: string;
  existingAddress?: string;
  existingPhone?: string;
  existingPhotos?: string[];
  existingPostcode?: string;
  existingBookingUrl?: string;
  existingCity?: string;
  existingCountry?: string;
  existingState?: string;
  edit: boolean;
};

type FormData = {
  name: string;
  photos: string[];
  description: string;
  address: string;
  phone: string;
  postcode: string;
  city: string;
  country: string;
  state: string;
  bookingUrl: string;
};

const FormField = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  error?: string;
  multiline?: boolean;
}) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, multiline && styles.textarea]}
      placeholder={placeholder}
      placeholderTextColor="#afafaf"
      value={value}
      onChangeText={onChangeText}
      autoCorrect={false}
      autoCapitalize={label === "Postcode" ? "characters" : label === "Booking URL" ? "none" : "sentences"}
      multiline={multiline}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

export default function AccommodationForm() {
  const {
    existingAccommodation_id,
    existingTitle = "",
    existingDescription = "",
    existingAddress = "",
    existingPhone = "",
    existingPhotos = "",
    existingPostcode = "",
    existingBookingUrl = "",
    existingCity = "",
    existingCountry = "",
    existingState = "",
    edit,
  } = useLocalSearchParams<AccommodationFormParams>();
  
  const [formData, setFormData] = useState<FormData>(() => ({
    name: existingTitle ?? "",
    photos: existingPhotos ? existingPhotos.split(',') : [],
    description: existingDescription ?? "",
    address: existingAddress ?? "",
    phone: existingPhone ?? "",
    postcode: existingPostcode ?? "",
    city: existingCity ?? "",
    country: existingCountry ?? "",
    state: existingState ?? "",
    bookingUrl: existingBookingUrl ?? "",
  }));
  

  const [uploading, setUploading] = useState(false);
  const navigation = useNavigation();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { session } = useAuth();
  const router = useRouter();

  const MAX_WIDTH = 1000;
  const MAX_HEIGHT = 1000;

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name) errors.name = "Title is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.address) errors.address = "Address is required";
    if (!formData.phone) errors.phone = "Phone is required";
    if (!formData.postcode) errors.postcode = "Postcode is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.country) errors.country = "Country is required";
    if (!formData.state) errors.state = "State is required";
    if (!formData.bookingUrl) errors.bookingUrl = "Booking URL is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      edit ? handleEdit() : submitForm();
    }
  };

  const submitForm = async () => {
    const { data, error } = await supabase
      .from("accommodation")
      .insert({
        user_id: session?.user.id,
        title: formData.name,
        description: formData.description,
        address: formData.address,
        phone: formData.phone,
        postcode: formData.postcode,
        city: formData.city,
        country: formData.country,
        state: formData.state,
        photos: formData.photos,
        booking_url: formData.bookingUrl,
      });
    Alert.alert("Property added successfully");
    router.replace("/profile/manage-properties");
  };

  const handleEdit = async () => {
    const accommodationData = {
      user_id: session?.user.id,
      title: formData.name,
      description: formData.description,
      address: formData.address,
      phone: formData.phone,
      postcode: formData.postcode,
      city: formData.city,
      country: formData.country,
      state: formData.state,
      booking_url: formData.bookingUrl,
      photos: formData.photos,
    };

    const { data, error } = await supabase
      .from("accommodation")
      .update(accommodationData)
      .eq('accommodation_id', existingAccommodation_id);
    Alert.alert("Changes Saved");
    router.replace("/profile/manage-properties");
  };

  const handleClose = () => {
    navigation.goBack();
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this property?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const { data, error } = await supabase
              .from("accommodation")
              .delete()
              .eq("accommodation_id", existingAccommodation_id);

            if (error) {
              Alert.alert("Something went wrong, please try again.");
            } else {
              Alert.alert("Property deleted");
              router.replace("/profile/manage-properties");
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const handleDeletePhoto = async (index: number) => {
    setFormData((prevState) => ({
      ...prevState,
      photos: prevState.photos.filter((_, i) => i !== index),
    }));
  }

  async function pickImage() {
    try {
      setUploading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
      const updatedPhotos = [...formData.photos, image.uri];
      setFormData((prevState) => ({
        ...prevState,
        photos: updatedPhotos,
      }));
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

  if (!formData) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{edit ? "Edit Property" : "Add Property"}</Text>
          <FormField
            label="Property Title"
            value={formData.name}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, name: text }))
            }
            placeholder="Enter title"
            error={errors.name}
          />
          <FormField
            label="Description"
            value={formData.description}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, description: text }))
            }
            placeholder="Enter description"
            error={errors.description}
            multiline
          />
          <FormField
            label="Address"
            value={formData.address}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, address: text }))
            }
            placeholder="Enter address"
            error={errors.address}
          />
          <FormField
            label="Postcode"
            value={formData.postcode}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, postcode: text }))
            }
            placeholder="Enter postcode"
            error={errors.postcode}
          />
          <FormField
            label="City"
            value={formData.city}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, city: text }))
            }
            placeholder="Enter city"
            error={errors.city}
          />
          <FormField
            label="State"
            value={formData.state}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, state: text }))
            }
            placeholder="Enter state"
            error={errors.state}
          />
          <FormField
            label="Country"
            value={formData.country}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, country: text }))
            }
            placeholder="Enter country"
            error={errors.country}
          />
          <FormField
            label="Phone"
            value={formData.phone}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, phone: text }))
            }
            placeholder="Enter phone"
            error={errors.phone}
          />
          <FormField
            label="Booking URL"
            value={formData.bookingUrl}
            onChangeText={(text) =>
              setFormData((prevState) => ({ ...prevState, bookingUrl: text }))
            }
            placeholder="Enter booking URL"
            error={errors.bookingUrl}
          />


          <ScrollView horizontal style={styles.photoContainer}>
            {Array.isArray(formData.photos) && formData.photos.length > 0 && (
              formData.photos.map((photo, index) => (
                <View key={index}>
                  <Image source={{ uri: photo }} style={styles.photo} />
                  <Pressable onPress={() => handleDeletePhoto(index)}>
                    <View style={styles.iconContainer}>
                      <FontAwesome6 name="trash" style={styles.photoIcons} size={15} />
                    </View>
                  </Pressable>
                </View>
              ))
            )}
            <TouchableOpacity 
              style={styles.placeholderContainer}
              onPress={pickImage}
              disabled={uploading}
            >
              <Text style={styles.placeholderText}>Add Photo</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.saveButton, styles.button]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{edit ? "Save Changes" : "Save Property"}</Text>
            </TouchableOpacity>
            {edit && (
              <TouchableOpacity style={[styles.deleteButton, styles.button]} onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete Property</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.closeButton, styles.button]} onPress={handleClose}>
              <Text style={styles.buttonText}>Close</Text>
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
    padding: 10,
    width: 400
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    borderRadius: 8,
    padding: 10
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#28a745",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  closeButton: {
    backgroundColor: "#6c757d",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 14,
    marginTop: -12,
    marginBottom: 16,
  },
  photoContainer: {
    flexDirection: "row",
  },
  photo: {
    width: 130,
    height: 130,
    borderRadius: 8,
    marginRight: 8,
  },
  iconContainer: {
    width: 30,
    height: 30,
    position: 'relative',
    top: -120,
    left: 10,
    backgroundColor: 'rgba(220, 53, 69, 0.8)', 
    borderRadius: 5,
    padding: 5, 
    justifyContent: 'center',
  },
  photoIcons: {
    alignSelf: 'center',
    color: "#fff",
  },
  placeholderContainer: {
    width: 130,
    height: 130,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  placeholderText: {
    color: "#afafaf",
    fontSize: 16,
  },
});