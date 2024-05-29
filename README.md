DogGo is a full-stack project which was built collaboratively for the purposes of developing the team's understanding of Supabase, Typescript and React Native with Expo.

DogGo is a travel app for mobile catering specifically for dog owners. Provides a ‘one-stop shop' for planning a holiday with man’s best friend. It offers up recommendations for airlines, hotels and places to visit based on user's desired destination and its level of dog-friendliness. This will displayed in an easily digestible single screen format with the ability to save potential trips, share a trip and more.

DogGo is a C.R.U.D application and as such users can:

- View dog-friendly airlines and location-specific vets, accommodations and recreational spaces.
- Create an account
- Log in and view their saved trip and can add their own property for users to view and consider booking.
- View, write and rate reviews 
- Delete their own reviews and accommodations

The back-end database used for this project was built using Supabase.

The front-end was built in React Native with Expo

## Create a Clone


To make a local clone of the repo for yourself:

- In your terminal, navigate to the desired directory
- Run this command: `git clone` [https://github.com/zacharvey88/doggo.git](url)
- Open the directory in your chosen code editor and refer to further instructions below.

## Set-up

Minimum versions required:

`Node.js 21.6.2`

(If you want to view the app in a phone emulator, first follow the steps below:

To view the app in android install Android Studio:

- [https://developer.android.com/studio/install](url)

To view the app in iOS install Xcode:

- [https://apps.apple.com/us/app/xcode/id497799835?mt=12](url)



Install dependencies `npm install`

To view places other than accommodation, follow these steps:

- Obtain a [Google Places API](https://console.cloud.google.com/projectselector2/google/maps-apis/credentials?utm_source=Docs_CreateAPIKey&utm_content=Docs_maps-backend&_gl=1*3uptfz*_ga*MTk2Nzc1MDk4MC4xNzE1NzAyOTUy*_ga_NRWSTWS78N*MTcxNjk4NTA0NS4yNC4xLjE3MTY5ODU4MzkuMC4wLjA.) key.

- Create a .env file in the root of your project folder.

- Add the following line to the .env file: `EXPO_PUBLIC_API_KEY=YOUR_API_KEY`
- Replace YOUR_API_KEY with your actual API key.

## Running the App

If you would like to run the app in an emulator:

Android:
- Run `npm start` 
- Open your phone emulator in Android Studios
- Type `a` in the terminal to install Expo Go to your android emulator and view the app

(Note: opening your phone emulator prior to running Expo Go is recommended as running `npm start --android` can fail due to bugs in Android Studios)

iOS:
- Run `npm start` 
- Type `i` in the terminal to install Expo Go to your iOS emulator and view the app
