import firebase from '../config/firebase';

export default class FirebaseRepository {

    getImage(url: string): Promise<any> {
        return firebase.storage().ref(url).getDownloadURL();
    }
}