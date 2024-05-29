import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  Button,
  ScrollView
} from "react-native";
import { Pressable, Platform, Alert } from "react-native";
import { supabase } from "../lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import DatePicker from "react-native-modern-datepicker";
import { getToday, getFormatedDate } from "react-native-modern-datepicker";
import { useRouter, useNavigation } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";

export default function AccommodationForm() {

    const [name, setName] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [postcode, setPostcode] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [uploading, setUploading] = useState(false);
    const navigation = useNavigation();
    
    const [startOpen, setStartOpen] = useState(false);
    const [endOpen, setEndOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const { session, loading, profile } = useAuth();
    const router = useRouter();

    const validateForm = () => {
        let errors = {};
    
        if (!name) errors.name = "Title is required";
        if (!imageURL) errors.imageURL = "Start date is required";
        if (!description) errors.description = "End date is required";
        if (!address) errors.address = "Start date is required";
        if (!phone) errors.phone = "End date is required";
        if (!postcode) errors.postcode = "End date is required";
        if (!city) errors.city = "Start date is required";
        if (!country) errors.country = "End date is required";
        if (!state) errors.state = "End date is required";

    
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
          state: state
        });
        if (error) {
          Alert.alert(error.message);
        } else {
          router.replace("accommodation");
        }
      };

      const handleSubmit = () => {
        if (validateForm()) {
          submitForm();
        }
      };

      const handleClose = () => {
        navigation.goBack();
      };




      async function uploadImage() {
        try {
          setUploading(true);
    
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to only images
            allowsMultipleSelection: false, // Can only select one image
            allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
            quality: 1,
            exif: false, // We don't want nor need that data.
          });
    
          if (result.canceled || !result.assets || result.assets.length === 0) {
            return;
          }
    
          const image = result.assets[0];
          console.log("Got image", image);
    
          if (!image.uri) {
            throw new Error("No image uri!"); // Realistically, this should never happen, but just in case...
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
            .from("accommodation_photos")
            .upload(path, arraybuffer, {
              contentType: image.mimeType ?? "image/jpeg",
            });
    
          if (uploadError) {
            throw uploadError;
          }
    
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

      <ScrollView>
        <Text style={styles.label}>Accommodation Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Accommodation Name"
          value={name}
          onChangeText={setName}
          autoCorrect={false}
          autoCapitalize="words"
        />
        {errors.name ? (
          <Text style={styles.errorstext}>{errors.name}</Text>
        ) : null}

        <Text style={styles.label}>Description</Text>
          <TextInput
          style={styles.input}
          placeholder="Enter Description"
          value={description}
          onChangeText={setDescription}
          autoCorrect={false}
          autoCapitalize="words"
          />
        {errors.description ? (
          <Text style={styles.errorstext}>{errors.description}</Text>
        ) : null}

        <Text style={styles.label}>House Number & Street Name</Text>
          <TextInput
          style={styles.input}
          placeholder="Enter Your House Number & Street Name"
          value={address}
          onChangeText={setAddress}
          autoCorrect={false}
          autoCapitalize="words"
          />

        {errors.address ? (
          <Text style={styles.errorstext}>{errors.address}</Text>
        ) : null}

        <Text style={styles.label}>Phone</Text>
          <TextInput
          style={styles.input}
          placeholder="Enter Your Phone Number"
          value={phone}
          onChangeText={setPhone}
          autoCorrect={false}
          autoCapitalize="words"
          />

        {errors.phone ? (
          <Text style={styles.errorstext}>{errors.phone}</Text>
        ) : null}

        <Text style={styles.label}>PostCode</Text>
          <TextInput
          style={styles.input}
          placeholder="Enter Your Postcode"
          value={postcode}
          onChangeText={setPostcode}
          autoCorrect={false}
          autoCapitalize="words"
          />

        {errors.postcode ? (
          <Text style={styles.errorstext}>{errors.postcode}</Text>
        ) : null}

        <Text style={styles.label}>City</Text>
          <TextInput
          style={styles.input}
          placeholder="Enter Your City"
          value={city}
          onChangeText={setCity}
          autoCorrect={false}
          autoCapitalize="words"
          />  

        {errors.city ? (
          <Text style={styles.errorstext}>{errors.city}</Text>
        ) : null}

        <Text style={styles.label}>Country</Text>
          <TextInput
          style={styles.input}
          placeholder="Enter Your Country"
          value={country}
          onChangeText={setCountry}
          autoCorrect={false}
          autoCapitalize="words"
          />

        {errors.country ? (
          <Text style={styles.errorstext}>{errors.country}</Text>
        ) : null}

        <Text style={styles.label}>State</Text>
          <TextInput
          style={styles.input}
          placeholder="Enter Your State"
          value={state}
          onChangeText={setState}
          autoCorrect={false}
          autoCapitalize="words"
          />

        {errors.state ? (
          <Text style={styles.errorstext}>{errors.state}</Text>
        ) : null}

        <View>
        <Button
          title={uploading ? "Uploading ..." : "Upload Photo"}
          onPress={uploadImage}
          disabled={uploading}
        />
        </View>          


      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Create Your Accommodation</Text>
        </Pressable>

        <Pressable onPress={handleClose} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        {/* <Button style={styles.button} title="Cancel" onPress={() => router.push("/trips")} /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    height: "50%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 20,
    alignItems: "center",
  },
  input: {
    width: 300,
    marginHorizontal: 15,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  text: {
    fontSize: 30,
    padding: 10,
  },
  errorstext: {
    color: "#cc0000",
    marginVertical: 5,
    marginLeft: 15,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
    fontFamily: "Futura",
    textAlign: "center",
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  formTitle: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Futura",
    marginBottom: 20,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 15,
    marginBottom: 5,
    marginVertical: 10,
    fontFamily: "Futura",
  },
  button: {
    backgroundColor: "#3A90CD",
    borderRadius: 10,
    height: 40,
    width: 135,
    padding: 10,
  },
});
