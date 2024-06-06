# DogGo

DogGo is a collaborative full-stack project designed to enhance our team's skills in Supabase, TypeScript, and React Native with Expo.

## About

DogGo is a mobile travel app tailored for dog owners, providing a comprehensive solution for planning holidays with pets. It offers recommendations for dog-friendly airlines, hotels, and attractions based on the user's chosen destination. The app presents all this information in a user-friendly, single-screen format, allowing users to save, share, and manage potential trips.

## Features

DogGo is a C.R.U.D. (Create, Read, Update, Delete) application, allowing users to:

- View dog-friendly airlines, vets, accommodations, and recreational spaces specific to locations.
- Create an account.
- Log in to view and manage saved trips.
- Add properties for other users to view and consider booking.
- View, write, and rate reviews.
- Delete their own reviews and accommodations.

## Technologies Used

- **Back-end:** Supabase
- **Front-end:** React Native with Expo

## Getting Started

### Clone the Repository

To clone the repository locally, follow these steps:

1. Open your terminal and navigate to your desired directory.
2. Run the following command:
    ```sh
    git clone https://github.com/zacharvey88/doggo.git
    ```
3. Open the cloned directory in your preferred code editor.

### Setup

#### Prerequisites

Ensure you have the following installed:

- **Node.js:** v21.6.2 or later

#### Viewing the App in an Emulator

##### Android

1. Install [Android Studio](https://developer.android.com/studio/install).
2. Follow the steps under "Running the App" below to start the Android emulator.

##### iOS

1. Install [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12).
2. Follow the steps under "Running the App" below to start the iOS emulator.

#### Installing Dependencies

Navigate to the project directory and run:
```sh
npm install
```

## Google Places API Key

To view places other than accommodations:

1. Obtain a Google Places API key.
2. Create a `.env` file in the root of your project folder.
3. Add the following line to the `.env` file:
    ```sh
    EXPO_PUBLIC_API_KEY=YOUR_API_KEY
    ```
4. Replace `YOUR_API_KEY` with your actual API key.

## Running the App

### Android

1. Start the development server:
    ```sh
    npm start
    ```
2. Open your Android emulator in Android Studio.
3. In the terminal, type `a` to install Expo Go on your emulator and view the app.

   **Note:** It is recommended to open the Android emulator before running Expo Go, as running `npm start --android` can sometimes fail due to bugs in Android Studio.

### iOS

1. Start the development server:
    ```sh
    npm start
    ```
2. In the terminal, type `i` to install Expo Go on your iOS emulator and view the app.

Enjoy planning your dog-friendly trips with DogGo!
