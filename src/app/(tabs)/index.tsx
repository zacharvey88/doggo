import { StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import Button from '@/src/components/Button';
import { Link } from 'expo-router';

export default function TabHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Link href ={'/sign-in'}>Sign In</Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
