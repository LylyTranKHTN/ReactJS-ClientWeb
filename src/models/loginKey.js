import { Base } from 'models';
import Crypto from '../utils/crypto'

class LoginKey extends Base {
    constructor(jsonData) {
        super();
        if (!jsonData) return;
        var key = Crypto.Key();
        this.username = Crypto.Encrypt(jsonData.username, key);
        this.clientID = Crypto.Encrypt(jsonData.clientID, key);
        this.salt = Crypto.Encrypt(jsonData.salt, key);
    }

    toModel(jsonData) {
        return new LoginKey(jsonData);
    }

    /** Override */
    toJSON() {
        return {
            username: this.username,
            clientID: this.clientID,
            salt: this.salt
        };
    }
}

export default LoginKey;
