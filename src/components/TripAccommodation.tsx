import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { Text, View } from "./Themed"




type accomodationProps = {
    accom: {
        accommodation_id : number
    }
}

const TripAccomodation = ({accom} : accomodationProps) => {
    const [accomDb , setAccomDb] = useState("")

    
    useEffect(() => {
        getAccom();
      }, [accom]);

      async function getAccom() {
        const { data } = await supabase.from("accommodation").select('*').eq("accommodation_id", accom)
        if(data){
            setAccomDb(data[0].title);
        }
      }

      return (
        <View>
            <Text>{accomDb}</Text>
        </View>
      )
}

export default TripAccomodation