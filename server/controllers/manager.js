const managerConstants = require('../constants/manager.json')
const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email);

    try {
        if (email !== managerConstants.EMAIL) {
            const error = new Error('Could not find user.');
            error.statusCode = 401;
            throw error;
        }
        const isEqual = await bcrypt.compare(password, managerConstants.PASSWORD); // Decrypted passowrd ==> '12345'

        if (!isEqual) {
            const error = new Error('Incorrect password.');
            error.statusCode = 401;
            throw error;
        }

        req.session.isLoggedIn = true;
        req.session.user = email;
        await req.session.save();

        res.status(200).json({ email: email });
    } catch (err) {
        next(err);
    }
};

exports.getLogout = (req, res, next) => {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {

                res.status(201).json({});
            }
        });
    }
};

exports.getSession = (req, res, next) => {
    let email, isLoggedIn = false;
    if (req.session) {
        email = req.session.user;
        isLoogedIn = req.session.isLoggedIn;
        console.log(req.session);
        console.log(isLoggedIn);
        console.log(email)
    }
    res.status(200).json({ is_logged_in: req.session.isLoggedIn, email: req.session.user });
}


