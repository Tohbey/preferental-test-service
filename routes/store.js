const router = require("express").Router();
const controller = require("../controllers");
const { Auth, ROLES, hasRole } = require('../middlewares/auth');

router.post('/', Auth, controller.store.createStore);

router.get('/', Auth, controller.store.getStores);

router.get('/store-keeper', Auth, controller.store.getStoresByStoreKeeper);

router.get('/:storeId', Auth, controller.store.getStore);

router.patch('/:storeId', Auth, controller.store.updateStore);

router.delete('/:storeId', Auth, controller.store.deleteStore);


module.exports = router;