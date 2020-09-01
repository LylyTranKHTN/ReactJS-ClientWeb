import Crypto from '../utils/crypto'

class ExecuteParam {
    constructor(jsonData) {

        if (!jsonData) return;

        this.method = jsonData.method;
        this.controller = jsonData.controller;
        this.action = jsonData.action;
        this.language = jsonData.language;
        if(jsonData.data == null){
            this.data= '';
            this.checkSum = Crypto.Encode('');
        }
        else{
            this.data = JSON.stringify(jsonData.data);
            this.checkSum = Crypto.Encode(this.data);
        }
    }
}

export default ExecuteParam;