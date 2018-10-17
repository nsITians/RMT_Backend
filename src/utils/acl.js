module.exports = {
    ensureLogin: function ensureLogin(req,res,next){
      if(!!req.user) next();
      else res.sendStatus(403);
    },
    ensureSuperAdmin: function ensureSuperAdmin(req,res,next) {
      if(req.user.grant || req.user.id === 1) next();
      else res.send(403);
    }
};