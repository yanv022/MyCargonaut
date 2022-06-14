import firebase from "firebase/compat";
import Car from "src/app/model/interfaces/car";

export interface Fahrt{
    abfahrt: firebase.firestore.Timestamp;
    wo: string;
    ankunft: firebase.firestore.Timestamp;
    wohin: string;
    name: string;
    userid?: string;
    car?: Car;
}

export default Fahrt
