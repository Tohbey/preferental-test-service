const Store = require("../models/store");

class StoreService {
    static create(body) {
        return new Promise(async (resolve, reject) => {
            try {
            } catch (error) { 
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        });
    }

    static getStores(skip, pageSize, filter = {}) {
        return new Promise(async (resolve, reject) => {
            try {
            } catch (error) { 
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        });
    }

    // static getStoreBooks(skip, pageSize, filter = {}) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //         } catch (error) { }
    //     });
    // }

    static getStore(bookId) {
        return new Promise(async (resolve, reject) => {
            try {
            } catch (error) { 
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        });
    }

    static updateStore(storeObject, storeKeeper, storeId) {
        return new Promise(async (resolve, reject) => {
            try {
            } catch (error) { 
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        });
    }

    static deleteStore(storeId) {
        return new Promise(async (resolve, reject) => {
            try {
            } catch (error) { 
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        });
    }
}


module.exports = StoreService;