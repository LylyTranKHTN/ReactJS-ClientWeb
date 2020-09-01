import { Base } from 'models';
import Crypto from '../utils/crypto'

class LoginHash extends Base {
    constructor(jsonData) {
        super();
        if (!jsonData) return;
        this.username = Crypto.Encrypt(jsonData.username, jsonData.key);
        this.clientID = Crypto.Encrypt(jsonData.clientID, jsonData.key);
        this.password = Crypto.Encrypt(Crypto.Encode(Crypto.Encode(jsonData.password) + jsonData.secret), jsonData.key);
    }

    toModel(jsonData) {
        return new LoginHash(jsonData);
    }

    /** Override */
    toJSON() {
        return {
            username: this.username,
            clientID: this.clientID,
            password: this.password
        };
    }
}

export default LoginHash;
