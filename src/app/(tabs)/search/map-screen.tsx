import { useRoute } from '@react-navigation/native';
import Map from '@/src/components/Map';

export default function MapScreen() {
  const route = useRoute();
  const { places } = route.params;

  return (
    <Map placesData={places}></Map>
  );
};