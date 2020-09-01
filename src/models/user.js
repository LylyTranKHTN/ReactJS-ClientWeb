import { Base } from 'models';

class User extends Base {
    constructor(jsonData) {
        super();

        if (!jsonData) return;

        this.id = jsonData.UserID;
        this.role = jsonData.Role;
        this.timeOut = jsonData.TimeOut;
        this.secret = jsonData.Secret;
        this.tokenType = jsonData.TokenType;
        this.accessToken = jsonData.AccessToken;
        this.refreshToken = jsonData.RefreshToken;
        this.lastAccess = new Date(jsonData.LastAccess);
    }

    toModel(jsonData) {
        return new User(jsonData);
    }

    /** Override */
    toJSON() {
        return {
            UserID: this.id,
            Role: this.role,
            TimeOut: this.timeOut,
            Secret: this.secret,
            AccessToken: this.accessToken,
            RefreshToken: this.refreshToken,
            TokenType: this.tokenType,
            LastAccess: new Date()
        };  
    }
}

export default User;
