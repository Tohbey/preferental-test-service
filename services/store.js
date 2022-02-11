const Store = require("../models/store");
const Book = require("../models/book");
const { MSG_TYPES } = require("../constant/types");

class StoreService {

  /**
    * Create store
    * @param {Object} body
  */
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

  /**
    * Get Stores
    * @param {Object} skip 
    * @param {Object} pageSize 
    * @param {Object} filter 
  */
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

  /**
    * Get Store
    * @param {Object} filter
  */
  static getStore(filter) {
    return new Promise(async (resolve, reject) => {
      try {
        const store = await Store.findOne(filter).populate('storeKeeper').select('-storeKeeper.password -storeKeeper.passwordRetrive -storeKeeper.rememberToken');

        if (!store) {
          return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND });
        }

        resolve(store);
      } catch (error) {
        return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
      }
    });
  }


  /**
    * Update Stores
    * @param {Object} storeObject 
    * @param {Object} storeKeeper 
    * @param {Object} storeId 
  */
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

  /**
    * Delete Store
    * @param {Object} storeId
  */
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

  /**
    * Approve or Disapprove Store
    * @param {Object} storeObject 
    * @param {Object} storeId 
  */
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

  /**
    * Adding Book to  Store
    * @param {Object} storeObject 
    * @param {Object} storeId 
  */
  static addBook(storeId, body) {
    return new Promise(async (resolve, reject) => {
      try {
        const book = await Book.findById(body.book);
        if (!book) {
          return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND });
        }

        const store = await Store.findOneAndUpdate(
          { _id: storeId },
          {
            $push: {
              books: body
            }
          }
        );
        if (!store) {
          return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND });
        }

        resolve(store)
      } catch (error) {
        return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
      }
    })
  }

   /**
    * Removeing book from Store
    * @param {Object} storeObject 
    * @param {Object} storeId 
   */
  static removeBook(storeId, bookId) {
    return new Promise(async (resolve, reject) => {
      try {
        const book = await Book.findById(bookId);
        if (!book) {
          return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND });
        }

        const store = await Store.findOneAndUpdate(
          { _id: storeId },
          {
            $pull: {
              books: {
                book: bookId
              }
            }
          }
        );
        if (!store) {
          return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND });
        }

        resolve(store)
      } catch (error) {
        return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
      }
    })
  }
}


module.exports = StoreService;
