const db = require("../models");
const supabase = db.supabase;
const ROLES = db.ROLES;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  let { data: userByUsername, error: usernameError } = await supabase
    .from('users')
    .select('id')
    .eq('username', req.body.username)
    .single();

  if (userByUsername) {
    return res.status(400).send({
      message: "Failed! Username is already in use!"
    });
  }

  let { data: userByEmail, error: emailError } = await supabase
    .from('users')
    .select('id')
    .eq('email', req.body.email)
    .single();

  if (userByEmail) {
    return res.status(400).send({
      message: "Failed! Email is already in use!"
    });
  }

  next();
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i]
        });
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
