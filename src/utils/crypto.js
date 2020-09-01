import CryptoJS from 'crypto-js';

class Crypto {
    Encrypt(t, p) {
        var md5 = CryptoJS.MD5(p);
        var result = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(t), CryptoJS.enc.Utf8.parse(md5), {
            keySize: 128 / 8,
            iv: CryptoJS.enc.Utf8.parse(md5.toString().substring(0, 16)),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return result.toString();
    }

    Decrypt(t, p) {
        var md5 = CryptoJS.MD5(p);
        var result = CryptoJS.AES.decrypt(t, CryptoJS.enc.Utf8.parse(md5), {
            keySize: 128 / 8,
            iv: CryptoJS.enc.Utf8.parse(md5.toString().substring(0, 16)),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        });
        return result.toString(CryptoJS.enc.Utf8);
    }

    Encode(t) {
        return CryptoJS.MD5(t).toString();
    }

    Key() {
        return window.atob('QEBXZWJAQFNlcnZpY2UjMjQwNzIwMjAjT1dORVIjI0JZJCRMVU5LI15BTkQhIVRFQU0hQCNaT1JPJiZDT0RFOlFGVzZGNVFXOThGUVc0RlEzVzJGMVFXRlFXNEZRNkc0UUc2SE4xVFJNTjZUWTRLNklZSUxPNDZIRFIxR0RYMjMx');
    }

    RandomString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    EncUTF8() {
        return CryptoJS.enc.Utf8;
    }
}

export default new Crypto();