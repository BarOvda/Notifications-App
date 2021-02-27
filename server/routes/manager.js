const path = require('path');

const express = require('express');
const { body } = require('express-validator');
const managerController = require('../controllers/manager');
const notificationsController = require('../controllers/notifications');
const isAuth = require('../auth/isAuth');
const router = express.Router();

// manager/session => GET
router.get('/session', managerController.getSession);

// manager/notifications => GET
router.get('/notifications', isAuth, notificationsController.getNotifications);

// /manager/notification => POST
router.post('/notification'
    , isAuth
    , [
        body('title')
            .trim()
            .not().isEmpty()
        , body('description')
            .trim()
            .not().isEmpty()
    ]
    , notificationsController.postNotification);

// /manager/login => POST
router.post('/login', //TESTED 
    [
        body('email')
            .isEmail().withMessage('Please enter a valid email'),
        body('password')
            .trim()
            .isLength({ min: 5 })
    ],
    managerController.login);

// manager/logout => GET
router.get('/logout'
    , managerController.getLogout);
module.exports = router;
