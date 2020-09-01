import { Cookies } from 'react-cookie';
import { User } from 'models';

const oneDay = 86400;
const cookieOption = {
    path: '/',
    maxAge: 365 * oneDay
};

class LocalDataService {
    constructor() {
        this.cookies = new Cookies();
    }
    // Access token
    set accessToken(accessToken) {
        this.cookies.set('csrftoken', accessToken, cookieOption);
    }
    get accessToken() {
        const token = this.cookies.get('csrftoken');
        return token;
    }

    // Access session key
    set accessSessionKey(sessionKey) {
        this.cookies.set('sessionKey', sessionKey, cookieOption);
    }
    get accessSessionKey() {
        const sessionKey = this.cookies.get('session_key');
        return sessionKey;
    }

    // User info
    set userInfo(userModel) {
        const userInfo = JSON.stringify(userModel.toJSON());
        localStorage.setItem('user', userInfo);
    }
    get userInfo() {
        // const token = this.accessToken;
        // const sessionKey = this.accessSessionKey;
        const userInfo = JSON.parse(localStorage.getItem('user'));
        return (userInfo) ? new User(userInfo) : null;
    }

    get language() {
        return localStorage.getItem('i18nextLng');
    }

    get clientID() {
        return localStorage.getItem('clientID');
    }

    set clientID(val) {
        localStorage.setItem('clientID', val);
    }

    clearUser(){
        localStorage.removeItem('user');
    }

    clearAll() {
        localStorage.removeItem('user');
    }
}

export default new LocalDataService();