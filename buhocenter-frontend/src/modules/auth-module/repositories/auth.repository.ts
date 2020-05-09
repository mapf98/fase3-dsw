import { HttpRepository } from '@/http/http.repository';
import firebase from "@/config/firebase";
import { ClientGmail } from '@/store/auth-module/interfaces/ClientGmail'

class AuthRepository extends HttpRepository {

    public async loginWithGoogle(): Promise<any> {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result: firebase.auth.UserCredential = await firebase.auth().signInWithPopup(provider);
        if ( result ) {
            //@ts-ignore
            const token: string = result.credential.accessToken;
            const user: any = result.user;
            const userName: string[] = user.displayName.split(' ');
            const clientData: ClientGmail = {
                first_name: userName[0],
                last_name: userName[1],
                uid: user.uid,
            };
            const registerData: { token: string, clientData: ClientGmail } = { token, clientData };
            try {
               return await this.post( this.createUri(['users/login/gmail'],false), registerData , false);
            } catch (e) {
                console.log('ERR LOGIN');
                return false;
            }
        }
    }
}

export default new AuthRepository();