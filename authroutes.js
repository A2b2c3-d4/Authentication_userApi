const express = require('express');
const jwt = require('../middleware/jwt');

const {  createUser, getUser, createRegister, createLogin, getUserById, updateUser, authenticateToken, authorizeRole } = require('../controller/authController'); // ✅ Ensure correct import

const router = express.Router();

router.post('/register', createRegister);
router.post('/login', createLogin);
router.post('/createUser', jwt, createUser);
router.get('/getUser', jwt, getUser);
router.get('/getUserById/:id', jwt, getUserById);
router.put('/updateUserById/:id', jwt, updateUser)


module.exports = router;