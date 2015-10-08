'use strict';

var VkontakteStrategy = require('passport-vkontakte').Strategy;

class Strategy extends VkontakteStrategy {
    constructor(options, verify) {
        options.clientID = 1;
        options.clientSecret = 'secret';

        super(options, verify);

        this.name = 'token-vkontakte';
    }

    authenticate(req) {
        const self = this;

        this._loadUserProfile(req.query.access_token, function (err, profile) {
            function verified(err, user, info) {
                if (err) return self.error(err);
                if (!user) return self.fail(info);
                self.success(user, info);
            }

            try {
                if (self._passReqToCallback && self._verify.length == 6)
                    self._verify(req, req.query.access_token, null, params, profile, verified);
                else if (self._passReqToCallback)
                    self._verify(req, req.query.access_token, null, profile, verified);
                else if (self._verify.length == 5)
                    self._verify(req.query.access_token, null, params, profile, verified);
                else
                    self._verify(req.query.access_token, null, profile, verified);
            } catch (ex) {
                return self.error(ex);
            }
        });
    }
}

module.exports = Strategy;
