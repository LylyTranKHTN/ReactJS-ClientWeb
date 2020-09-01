import i18n from '../i18n';
import { IMessage } from 'models';
import { LocalDataService, AuthService } from 'services';
import { Utility, ApiClient } from 'utils';
import ExecuteParam from '../models/executeParam';
const LANGUAGE = i18n.language;
const API_ENDPOINTS = {
    EXECUTECOMMANDURL: 'api/v1/zoroservice/executecommand',
};

const Execute = async (c, a, m, d) => {
    try {
        const response = await ApiClient.postData(API_ENDPOINTS.EXECUTECOMMANDURL, {
            Authorization: LocalDataService.userInfo.tokenType + LocalDataService.userInfo.accessToken
        }, new ExecuteParam({
            method: m,
            controller: c,
            action: a,
            data: d,
            language: LANGUAGE,
        }));
        return Utility.InvokeFromResponse(response);
    }
    catch (e) {
        return new IMessage(e);
    }
}

class ExecuteCommand {
    /**
     * @param { String } controller
     * @param { String } action
     * @param { String } method
     * @param { String } objRequest
     * @return { IMessage }
     */
    async Invoke(c, a, m, d) {
        if (!c && !a) {
            return new IMessage({
                success: 0,
                code: 200,
                message: ''
            });
        }

        if (Utility.IsTimeout()) {
            try {
                var message = await AuthService.refreshToken();
                if (message.success == 1) return await Execute(c, a, m, d);
                else return message;
            }
            catch (e) {
                return new IMessage(e);
            }
        }
        else return await Execute(c, a, m, d);
    }
}

export default new ExecuteCommand();