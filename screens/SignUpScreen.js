/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import ScreenWrapper from '../components/screenWrapper'; // Importing custom screen wrapper for consistent layout
import { colors } from '../theme'; // Importing color palette for consistent UI
import BackButton from '../components/backButton'; // Importing back button component
import { useNavigation } from '@react-navigation/native'; // Navigation hook to navigate between screens
import Snackbar from 'react-native-snackbar'; // Snackbar for showing error messages
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase function to create new user
import { auth } from '../config/firebase'; // Firebase auth instance
import { useDispatch, useSelector } from 'react-redux'; // Redux hooks to dispatch actions and select state
import { setUserLoading } from '../redux/slices/user'; // Redux action to set loading state
import Loading from '../components/loading'; // Loading spinner component
import { launchCamera } from 'react-native-image-picker'; // Image picker to capture photos with the camera

export default function SignInScreen() {
    const [email, setEmail] = useState(''); // State to store email input
    const [password, setPassword] = useState(''); // State to store password input
    const [photoUri, setPhotoUri] = useState(null); // State to store the URI of the captured photo
    const { userLoading } = useSelector(state => state.user); // Selecting the user loading state from Redux store
    const navigation = useNavigation(); // Hook to manage navigation between screens
    const dispatch = useDispatch(); // Hook to dispatch Redux actions

    // Function to handle the user registration (Sign Up)
    const handleSubmit = async () => {
        if (email && password) {
            try {
                dispatch(setUserLoading(true)); // Set loading state to true
                await createUserWithEmailAndPassword(auth, email, password); // Create a new user with email and password
                dispatch(setUserLoading(false)); // Set loading state to false after user creation
            } catch (e) {
                dispatch(setUserLoading(false)); // Set loading state to false if an error occurs
                Snackbar.show({
                    text: e.message, // Display the error message
                    backgroundColor: 'red', // Set the background color of the Snackbar
                });
            }
        } else {
            // If email or password is empty, show error message
            Snackbar.show({
                text: 'Email and Password are required!',
                backgroundColor: 'red',
            });
        }
    };

    // Function to open the camera and capture a photo
    const handleCameraPress = () => {
        launchCamera(
            {
                mediaType: 'photo', // Set media type to photo
                cameraType: 'back', // Use the back camera
                saveToPhotos: true, // Save the captured photo to the gallery
            },
            response => {
                if (response.didCancel) {
                    console.log('User cancelled image picker'); // Handle if the user cancels the camera
                } else if (response.errorCode) {
                    console.log('Error:', response.errorMessage); // Log any error that occurs
                } else {
                    // Set the URI of the captured photo in state
                    setPhotoUri(response.assets[0].uri);
                }
            }
        );
    };

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex justify-between h-full mx-4">
                    {/* Top Section: Back Button and Sign Up Title */}
                    <View>
                        <View className="relative">
                            <View className="absolute top-0 left-0 z-10">
                                <BackButton /> {/* Back Button to navigate to the previous screen */}
                            </View>
                            <Text className={`${colors.heading} text-xl font-bold text-center`}>Sign Up</Text>
                        </View>

                        {/* Image Section */}
                        <View className="flex-row justify-center my-3 mt-5">
                            <Image className="h-80 w-80" source={require('../assets/images/signup.png')} />
                        </View>

                        {/* Input Fields Section */}
                        <View className="space-y-2 mx-2">
                            {/* Email Input */}
                            <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
                            <TextInput
                                value={email}
                                onChangeText={value => setEmail(value)} // Update email state when input changes
                                className="p-4 bg-white rounded-full mb-3"
                            />

                            {/* Password Input */}
                            <Text className={`${colors.heading} text-lg font-bold`}>Password</Text>
                            <TextInput
                                value={password}
                                secureTextEntry // Make the input field secure for password entry
                                onChangeText={value => setPassword(value)} // Update password state when input changes
                                className="p-4 bg-white rounded-full mb-3"
                            />
                        </View>

                        {/* Camera Button Section */}
                        <View className="space-y-2 mx-2">
                            <TouchableOpacity
                                onPress={handleCameraPress} // Open the camera when the button is pressed
                                style={{ backgroundColor: colors.button }}
                                className="rounded-full p-3 shadow-sm mx-2"
                            >
                                <Text className="text-center text-white text-lg font-bold">Open Camera</Text>
                            </TouchableOpacity>
                            {/* Display the captured image if available */}
                            {photoUri && (
                                <Image source={{ uri: photoUri }} style={{ width: 100, height: 100, marginTop: 10 }} />
                            )}
                        </View>
                    </View>

                    {/* Bottom Section: Sign Up Button or Loading Spinner */}
                    <View>
                        {userLoading ? (
                            <Loading /> // Show loading spinner if the sign-up process is ongoing
                        ) : (
                            <TouchableOpacity
                                onPress={handleSubmit} // Trigger the sign-up process when the button is pressed
                                style={{ backgroundColor: colors.button }}
                                className="my-6 rounded-full p-3 shadow-sm mx-2"
                            >
                                <Text className="text-center text-white text-lg font-bold">Sign Up</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </ScreenWrapper>
    );
}
