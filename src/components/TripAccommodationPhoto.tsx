import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Image, View } from "react-native";

const TripAccomodationPhoto = ({ accommodation_id }: { accommodation_id: number }) => {

  const [accommodationPhotoUrl, setAccommodationPhotoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAccommodationPhoto();
  }, [accommodation_id]);

  async function getAccommodationPhoto() {
    const { data } = await supabase
      .from("accommodation")
      .select("*")
      .eq("accommodation_id", accommodation_id);
    if (data) {
      setAccommodationPhotoUrl(data[0].photos[0]);
      console.log(accommodationPhotoUrl); 
    }
  }
  if (loading) {
    return (
      <View>
        <Image 
          source={{ uri: "https://i.sstatic.net/l60Hf.png" }}
        />
      </View>
    );
  }

  if (accommodationPhotoUrl) {
    return (
      <View>
        <Image 
          source={{ uri: accommodationPhotoUrl }}
        />
      </View>
    );
  }
}

export default TripAccomodationPhoto;
