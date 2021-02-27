const Notification = require('../models/notification');
const { validationResult } = require('express-validator');

exports.getNotifications = async (req, res, next) => {
    const currentPage = (+req.query.page || 1) - 1;
    const perPage = +req.query.per_page;

    try {
        const totalCount = await Notification.find().countDocuments();
        const notifications = await Notification.find()
            .skip(currentPage)
            .limit(perPage);

        res.status(200).json({
            notifications: notifications,
            total_items: totalCount
        });
    } catch (err) {
        next(err);
    }
};
exports.postNotification = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Post Notification failed.');
        error.statusCode = 500;
        error.data = errors.array();
        next(error);
    }
    console.log("here");
    const title = req.body.title;
    const description = req.body.description;
    const buttons = req.body.buttons;

    const notification = new Notification({
        title: title,
        description: description,
        buttons: buttons
    });
    try {
        const result = await notification.save();
        console.log(result);
        res.status(201).json({ notification: result });
    } catch (err) {
        next(err);
    }
};