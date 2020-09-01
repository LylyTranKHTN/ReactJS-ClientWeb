import fetch from 'isomorphic-fetch';

const baseHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const createRequest = (method, url, requestHeaders = {}, data, isFormData) => {
    const headers = !isFormData ? Object.assign({}, baseHeaders, requestHeaders) : Object.assign({}, requestHeaders);
    const options = { headers, method };
    if (data) options.body = !isFormData ? JSON.stringify(data) : data;
    return new Request(url, options);
};

const responseHandler = async (response) => {
    if (response.ok) return JSON.parse(await response.text());
    else throw await response.json();
};


class ApiClient {
    async getData(url, headers, isFormData = false) {
        const request = createRequest('GET', url, headers, null, isFormData);
        return await fetch(request).then(responseHandler);
    }
    async postData(url, headers, data, isFormData = false) {
        const request = createRequest('POST', url, headers, data, isFormData);
        return await fetch(request).then(responseHandler);
    }
    async putData(url, headers, data, isFormData = false) {
        const request = createRequest('PUT', url, headers, data, isFormData);
        return await fetch(request).then(responseHandler);
    }
    async deteData(url, headers, data, isFormData = false) {
        const request = createRequest('DELETE', url, headers, data, isFormData);
        return await fetch(request).then(responseHandler);
    }
}

export default new ApiClient();
