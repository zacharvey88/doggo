import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { Text, View } from "./Themed"




type airlineProps = {
    airline: {
        airline_id : number
    }
}

const TripAirline = ({airline} : airlineProps) => {
    const [airlineDb , setAirlineDb] = useState("")

    useEffect(() => {
        getAirline();
      }, [airline]);

      async function getAirline() {
        const { data } = await supabase.from("airlines").select('*').eq("airline_id", airline)
        if(data){
            setAirlineDb(data[0].airline_name);
        }
      }

      return (
        <View>
            <Text>{airlineDb}</Text>
        </View>
      )
}

export default TripAirline