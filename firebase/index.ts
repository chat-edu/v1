import {initializeApp } from '@firebase/app';

import {firebaseConfig} from "@/firebase/config";

// Initialize Firebase
const clientApp = initializeApp(firebaseConfig, 'client');

export default clientApp;