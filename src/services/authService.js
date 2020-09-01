import { User } from 'models';
import { Crypto, Utility, ApiClient, Alert } from 'utils';
import { ExecuteCommand, LocalDataService } from 'services';
import LoginKey from '../models/loginKey';
import LoginHash from '../models/loginHash';
import { routeTo } from '../coreModules/app/actions';
import Constants from 'constants';
import IMessage from '../models/IMessage';

const API_ENDPOINTS = {
    GETKEY: '/api/v1/zoroservice/getkeys',
    HASH: '/api/v1/zoroservice/hash',
    REFRESH: '/api/v1/zoroservice/refresh',
    LOGOUT: '/api/v1/zoroservice/logout'
};

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const AuthService = {
    /**
     * Login with username and pawwword
     * @param { String } username
     * @param { String} pass
     * @return { User }
     */
    async loginWithUserAndPass(username, pass) {
        var s = Crypto.RandomString(8);
        var key = Crypto.Key();
        var resObj = new LoginKey({
            username,
            clientID: LocalDataService.clientID,
            salt: s
        });
        try {
            const getKeys = await ApiClient.postData(API_ENDPOINTS.GETKEY, null, resObj);
            var data = Utility.ObjectFromTwo(getKeys.message, key);
            if (data.first != s) return null;
            if (!data.second) return null;

            var resObj = new LoginHash({
                username: username,
                password: pass,
                secret: data.second,
                clientID: LocalDataService.clientID,
                key: key
            });
            try {
                const hash = await ApiClient.postData(API_ENDPOINTS.HASH, null, resObj);
                var user = new User(Utility.ObjectFromTwo(hash.message, key));
                LocalDataService.userInfo = user;
                return user;
            }
            catch (exHash) {
                return null;
            }
        }
        catch (exKey) {
            return null;
        }
    },

    /**
     * @returns { User }
     */
    getUserInfo() {
        const userModel = LocalDataService.userInfo;
        return Promise.resolve(userModel);
    },

    /**
     * logout
     */
    async logout() {
        try {
            var key = Crypto.Key();
            var data = {
                clientID: Crypto.Encrypt(LocalDataService.clientID, key),
                userID: Crypto.Encrypt(LocalDataService.userInfo.id, key)
            }
            await ApiClient.postData(API_ENDPOINTS.LOGOUT, null, data);
            LocalDataService.clearUser();
        }
        catch (err) {
            return false;
        }
        return true;
    },


    async refreshToken() {
        try {
            var key = Crypto.Key();
            const response = await ApiClient.postData(API_ENDPOINTS.REFRESH, null, {
                refreshToken: Crypto.Encrypt(LocalDataService.userInfo.refreshToken, key),
                userID: Crypto.Encrypt(LocalDataService.userInfo.id, key),
                clientID: Crypto.Encrypt(LocalDataService.clientID, key)
            });
            console.log(response);
            var data = Utility.ObjectFromTwo(response.message, Crypto.Key());
            LocalDataService.userInfo = new User(data);
            return response;
        }
        catch (e) {
            return e;
        }
    },
}

export default AuthService;
