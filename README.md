# passport-token-vkontakte


[Passport](http://passportjs.org/) strategy for authenticating with [VK](http://vk.com/)
using the OAuth 2.0 API.

This module lets you authenticate using VK in your Node.js applications.
By plugging into Passport, VK authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-token-vkontakte

## Usage

#### Configure Strategy

The VK authentication strategy authenticates users using a VK
account and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying an app ID and app secret.

    passport.use(new TokenVkontakteStrategy({
        clientID: VK_APP_ID,
        clientSecret: VK_APP_SECRET
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ vkId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'token-vkontakte'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/token-vkontakte',
      passport.authenticate('token-vkontakte'),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

#### Profile Fields

The VK profile is very rich, and may contain a lot of information.  The
strategy can be configured with a `profileFields` parameter which specifies a
list of fields (named by Portable Contacts convention) your application needs.
For example, to fetch only user's VK ID, name, and picture, configure
strategy like this.

    passport.use(new TokenVkontakteStrategy({
        // clientID and clientSecret
        profileFields: ['id', 'displayName', 'photos']
      },
      // verify callback
    ));

If `profileFields` is not specified, the default fields supplied by VK
will be parsed.
