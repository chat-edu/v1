import {getFirestore} from "@firebase/firestore";

import clientApp from "../";

const firestore = getFirestore(clientApp);

export default firestore;