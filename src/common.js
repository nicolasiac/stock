import axios from 'axios';

export const postData = (url, params, callBack) => {
    axios
        .post(url, params)
        .then(res => {
            callBack(res);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
};

export const deleteData = (url, params, callBack) => {
    axios
        .delete(url, { data: params })
        .then(res => {
            callBack(res);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
};

export const getData = (url, params, callBack) => {
    axios
        .get(url, params)
        .then(res => {
            callBack(res);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
};