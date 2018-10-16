module.exports = {
    ensureLogin: function ensureLogin(req,res,next){
      if(!!req.user) next();
      else res.sendStatus(403);
    },
    ensureSuperAdmin: function ensureSuperAdmin() {
      if(req.user.grant) next();
      else res.send(403);
    }
};