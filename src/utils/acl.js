module.exports = {
    ensureAdmin: require('../auth/jwt/passport').authenticate('jwt',{session: false}),
    ensureSuperAdmin: function ensureSuperAdmin(req,res,next) {
      if(!!req.user && (req.user.grant || req.user.id === 1)) next();
      else res.send(401);
    }
};