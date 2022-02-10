const Store = require("../models/store");
const { MSG_TYPES } = require("../constant/types");

class StoreService {
  static create(body) {
    return new Promise(async (resolve, reject) => {
      try {
        const store = await Store.findOne({
          storeKeeper: body.storeKeeper,
          name: body.name,
        });

        if (store) {
          return reject({ statusCode: 404, msg: MSG_TYPES.EXIST });
        }

        const createStore = await Store.create(body);

        resolve(createStore);
      } catch (error) {
        return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
      }
    });
  }

  static getStores(skip, pageSize, filter = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const stores = await Store.find(filter).skip(skip).limit(pageSize);

        const total = await Store.find(filter).countDocuments();

        resolve({ stores, total });
      } catch (error) {
        return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
      }
    });
  }

  static getStore(filter) {
    return new Promise(async (resolve, reject) => {
      try {
        const store = await Store.findOne(filter);

        if (!store) {
          return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND });
        }

        resolve(store);
      } catch (error) {
        return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
      }
    });
  }

  static updateStore(storeObject, storeKeeper, storeId) {
    return new Promise(async (resolve, reject) => {
      try {
        const store = await Store.findOne({
          _id: storeId,
          storeKeeper: storeKeeper,
        });

        if (!store) {
          return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND });
        }

        await store.updateOne({
          $set: storeObject,
        });

        resolve(store);
      } catch (error) {
        return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
      }
    });
  }

  static deleteStore(storeId) {
    return new Promise(async (resolve, reject) => {
      try {
        const store = await Store.findById(storeId);

        if (!store) {
          return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND });
        }

        await store.delete();

        resolve({ msg: MSG_TYPES.DELETED });
      } catch (error) {
        return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
      }
    });
  }

  static approveOrDisapproveStore(storeId, storeObject) {
    return new Promise(async (resolve, reject) => {
      try {
        const store = await Store.findOne({
          _id: storeId,
        });

        if (!store) {
          return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND });
        }

        await store.updateOne({
          $set: storeObject,
        });

        let msg =
          storeObject.status === "approved"
            ? "Store has been approved succesfully"
            : "Store has been disapproved succesfully";

        resolve({ store, msg });
      } catch (error) {
        return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
      }
    });
  }
}

module.exports = StoreService;
