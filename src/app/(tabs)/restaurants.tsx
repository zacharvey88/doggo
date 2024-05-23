import PlacesComponent from "@/src/components/PlacesComponents";
// App.tsx
import { SafeAreaView } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PlacesComponent />
    </SafeAreaView>
  );
};

export default App;
