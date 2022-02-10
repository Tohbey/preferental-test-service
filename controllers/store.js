const { MSG_TYPES } = require("../constant/types");
const { JsonResponse } = require("../lib/apiResponse");
const { paginate } = require("../utils/index");
const { validateStore } = require("../request/store");
const StoreService = require("../services/store");

/** 
 * Create Store
 * @param {*} req
 * @param {*} res
*/
exports.createStore = async (req, res, next) => {
    try {
        req.body.storeKeeper = req.user._id;

        const { error } = validateStore(req.body);
        if (error) return JsonResponse(res, 400, error.details[0]);

        let newStore = await StoreService.create(req.body);

        JsonResponse(res, 201, MSG_TYPES.CREATED, newStore);
    } catch (error) {
        console.log(error);
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}


/** 
 * get Stores
 * @param {*} req
 * @param {*} res
*/
exports.getStores = async (req, res, next) => {
    try {
        const { page, pageSize, skip } = paginate(req);

        const { stores, total } = await StoreService.getStores(skip, pageSize)

        const meta = {
            total,
            pagination: { pageSize, page }
        }

        JsonResponse(res, 200, MSG_TYPES.FETCHED, stores, meta);
    } catch (error) {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}


/** 
 * get Stores by user 
 * @param {*} req
 * @param {*} res
*/
exports.getStoresByStoreKeeper = async (req, res, next) => {
    try {
        let filter = {
            storeKeeper: req.user._id
        };

        const { page, pageSize, skip } = paginate(req);

        const { stores, total } = await StoreService.getStores(skip, pageSize, filter)

        const meta = {
            total,
            pagination: { pageSize, page }
        }

        JsonResponse(res, 200, MSG_TYPES.FETCHED, stores, meta);
    } catch (error) {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}

/** 
 * get Store
 * @param {*} req
 * @param {*} res
*/
exports.getStore = async (req, res, next) => {
    try {
        let filter = {
            _id: req.params.storeId
        };

        let store = await StoreService.getStore(filter);

        JsonResponse(res, 200, MSG_TYPES.FETCHED, store);
    } catch (error) {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}

/** 
 * update Store
 * @param {*} req
 * @param {*} res
*/
exports.updateStore = async (req, res, next) => {
    try {
        const storeKeeper = req.user._id;
        const storeId = req.params.storeId;

        await StoreService.updateStore(req.body, storeKeeper, storeId);

        JsonResponse(res, 200, MSG_TYPES.UPDATED);
    } catch (error) {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}


/** 
 * delete Store
 * @param {*} req
 * @param {*} res
*/
exports.deleteStore = async (req, res, next) => {
    try {
        const storeId = req.params.storeId;

        await StoreService.deleteStore(storeId);

        JsonResponse(res, 200, MSG_TYPES.DELETED);
    } catch (error) {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}


/** 
 * approve Store
 * @param {*} req
 * @param {*} res
*/
exports.approveOrDisapproveStore = async (req, res, next) => {
    try {
        const storeId = req.params.storeId;
        const storeObect = {
            status: req.body.status
        }
        
        let {store, msg} = await StoreService.approveOrDisapproveStore(storeId, storeObect);

        JsonResponse(res, 200, MSG_TYPES.UPDATED, store, msg);
    } catch (error) {
        JsonResponse(res, error.statusCode, error.msg);
        next(error);
    }
}
