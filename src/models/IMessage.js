import { Base } from 'models';

class IMessage extends Base {
    constructor(jsonData) {
        super();
        if (!jsonData) return;
        this.success = jsonData.success;
        this.code = jsonData.code;
        this.message = jsonData.message;
    }

    toModel(jsonData) {
        return new IMessage(jsonData);
    }

    toJSON() {
        return {
            success: this.success,
            code: this.code,
            message: this.message,
        };
    }
}

export default IMessage;