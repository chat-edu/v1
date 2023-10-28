import { getAuth } from "@firebase/auth";

import clientApp from '@/firebase';

const auth = getAuth(clientApp)

export default auth;