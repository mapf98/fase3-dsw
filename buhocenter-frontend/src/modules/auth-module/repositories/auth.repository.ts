import { HttpRepository } from '@/http/http.repository';
import firebase from "@/config/firebase";
import {ClientSocial} from '@/store/auth-module/interfaces/ClientGmail'
import {CustomerInterface} from '@/modules/auth-module/interfaces/CustomertInterface';

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
                    email: user.email,
                };
                const registerData: { token: string, clientData: ClientSocial } = { token, clientData };
                try {
                    return await this.post(this.createUri(['users', 'login-social'], false), registerData, false);
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

    public  async  login(email: string, password: string): Promise<any> {
        try {
            const userLog = await firebase.auth().signInWithEmailAndPassword(email, password);
            if (userLog) {
                // @ts-ignore
                const registerData: { token: string, uid: string } = { token: userLog.user.l , uid: userLog.user.uid };
                try {
                    return await this.post(this.createUri(['users', 'login'], false), registerData, false);
                } catch (e) {
                    return { error: e.message};
                }
            }
        } catch (e) {
            return { error: e.message };
        }
    }

    public async logout(uid: string): Promise<any> {
        try {
            console.log(uid)
            await this.post(this.createUri(['users', 'logout'], false), { uid }, false);
            return await firebase.auth().signOut();
        } catch (e) {
            return false;
        }
    }
    public  async  registerCustomer(customer: CustomerInterface): Promise<any> {
        try {
            const result = await firebase.auth().createUserWithEmailAndPassword(customer.email, customer.password);
            if ( result ) {
                const data: { name: string, lastname: string, birthdate: string, uid: string, language: number, email: string, } = {
                    name: customer.name,
                    lastname: customer.lastName,
                    birthdate: customer.birthdate,
                    // @ts-ignore
                    uid: result.user.uid,
                    language: customer.language,
                    email: customer.email,
                };
                return await this.post(this.createUri(['users', 'register'], false), data, false);
            }
            return { error:  'Unexpected error'};
        } catch (e) {
            return { error: e.message};
        }
    }
}

export default new AuthRepository();