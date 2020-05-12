import { HttpRepository } from '@/http/http.repository';
import firebase from "@/config/firebase";
import {ClientSocial} from '@/store/auth-module/interfaces/ClientGmail'

class AuthRepository extends HttpRepository {
    public async loginWithSocial(social: string): Promise<any> {
        let provider: any;
        if ( social === 'google' ) {
            provider = new firebase.auth.GoogleAuthProvider();
        } else if ( social === 'facebook' ) {
            provider = new firebase.auth.FacebookAuthProvider();
        }
        try{
            const result = await firebase.auth().signInWithPopup(provider);
            if ( result ) {
                // @ts-ignore
                const token: string = result.credential.accessToken;
                const user: any = result.user;
                const userName: string[] = user.displayName.split(' ');
                const clientData: ClientSocial = {
                    first_name: userName[0],
                    last_name: userName[1],
                    uid: user.uid,
                };
                const registerData: { token: string, clientData: ClientSocial } = { token, clientData };
                try {
                    return await this.post(this.createUri(['users', 'login'], false), registerData, false);
                } catch (e) {
                    return false;
                }
            } else {
                return false;
            }
        } catch (e) {
            // console.log(e)
            return false;
        }
    }

    public async logout(uid: string): Promise<any> {
        try {
            await this.post(this.createUri(['users', 'logout'], false), { uid }, false);
            return await firebase.auth().signOut();
        } catch (e) {
            return false;
        }
    }
}

export default new AuthRepository();