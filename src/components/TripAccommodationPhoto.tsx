import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { Text, View } from "./Themed"
import { Image, StyleSheet } from 'react-native';



type accomodationProps = {
    accom: {
        accommodation_id : number
    }
}

const TripAccomodationPhoto = ({accom} : accomodationProps) => {
    const [accomPhotoDb , setAccomPhotoDb] = useState("")

    
    useEffect(() => {
        getAccom();
      }, [accom]);

      async function getAccom() {
        const { data } = await supabase.from("accommodation").select('*').eq("accommodation_id", accom)
        if(data){
            setAccomPhotoDb(data[0].photos[0]);
        }
      }
      return (
        <View>
            {accomPhotoDb.length>0 ? (
                    <Image
                    source={{uri: accomPhotoDb}}
                    resizeMode="cover"
                    style={styles.image}
                    />
            ):(  
                <Text>No Image Available</Text>
            )}
        
      </View>
      )
}

export default TripAccomodationPhoto

const styles=StyleSheet.create({
    image: {
        width: "100%",
        height: 200
    }

})



