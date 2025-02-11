const axios = require('axios');

const axiosHelper = {};

axiosHelper.getRequestWithParams = (data) => ({ method: "GET", params: data });
axiosHelper.postRequest = (data) => ({ method: "POST", data });
axiosHelper.patchRequest = (data) => ({ method: "PATCH", data });


axiosHelper.callAPI = async (url, options, headerParams) => {
    let res = null;
    try {
        const headers = { 'Content-Type': 'application/json', maxBodyLength: Infinity };
        const { authorization, contentType } = headerParams;
        if (authorization) {
            headers['Authorization'] = authorization;
        }
        if (contentType) {
            headers['Content-Type'] = contentType;
        }
        res = await axios({ url, ...options, headers });
        res = await res?.data || null;
        return res;
    } catch (error) {
        console.log("error is", error);
        res = { error: true, msg: error.message };
        return res;
    }
};

axiosHelper.getCustomObject = async (object, limit, properties, hsToken) => {
    const url = `https://api.hubapi.com/crm/v3/objects/${object}`;
    const options = axiosHelper.getRequestWithParams({ limit: limit, properties: properties });
    const res = await axiosHelper.callAPI(url, options, { authorization: `Bearer ${hsToken}` });
    return res;
};

axiosHelper.addCustomObject = async (object, data, hsToken) => {
    const url = `https://api.hubapi.com/crm/v3/objects/${object}`;
    const options = axiosHelper.postRequest({ properties: data });
    const res = await axiosHelper.callAPI(url, options, { authorization: `Bearer ${hsToken}` });
    return res;
};

module.exports = axiosHelper;