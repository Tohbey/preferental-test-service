const router = require("express").Router();
const controller = require("../controllers");
const { Auth, ROLES, hasRole } = require('../middlewares/auth');

router.post('/', [Auth, hasRole(ROLES.STORE_KEEPER)], controller.store.createStore);

router.get('/', Auth, controller.store.getStores);

router.get('/store-keeper', [Auth, hasRole(ROLES.STORE_KEEPER)], controller.store.getStoresByStoreKeeper);

router.get('/:storeId', Auth, controller.store.getStore);

router.patch('/:storeId', [Auth, hasRole(ROLES.STORE_KEEPER)], controller.store.updateStore);

router.patch('/status/:storeId', [Auth, hasRole(ROLES.ADMIN)], controller.store.approveOrDisapproveStore);

router.delete('/:storeId', [Auth, hasRole(ROLES.STORE_KEEPER, ROLES.ADMIN)], controller.store.deleteStore);


module.exports = router;