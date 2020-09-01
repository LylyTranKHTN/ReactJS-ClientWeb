import Crypto from './crypto';
import { LocalDataService } from 'services';
import { IMessage, Alert } from 'models';

const Utility = {

    ObjectToTable(i, n) {
        return { n: [i] }
    },

    ArrayToTable(n, a) {
        return { n: a };
    },

    ObjectFromTwo(d, k) {
        return JSON.parse(Crypto.Decrypt(d, k));
    },

    Object(d) {
        return JSON.parse(Crypto.Decrypt(d, LocalDataService.userInfo.secret));
    },

    IsTimeout() {
        if (!LocalDataService.userInfo.lastAccess) {
            LocalDataService.clearUser();
            return true;
        }
        var last = LocalDataService.userInfo.lastAccess;
        last.setMinutes(last.getMinutes() + LocalDataService.userInfo.timeOut);
        if (last < new Date()) {
            return true;
        }
        return false;
    },

    Alert(iMessage) {
        return;
    },

    InvokeFromResponse(response) {
        if (response.success !== 1) {
            new Alert(response.code);
            return response;
        }
        return new IMessage({
            success: response.success,
            code: response.code,
            message: Utility.Object(response.message)
        });
    },

    InvokeError(message, callback = null) {
        new Alert(message.code);
        switch (message.code) {
            case 132:
                if (callback != null) callback();
                break;
        }
    }
}

export default Utility;