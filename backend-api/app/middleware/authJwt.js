const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const supabase = db.supabase;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  let { data: user, error } = await supabase
    .from('users')
    .select('id')
    .eq('id', req.userId)
    .single();

  if (error || !user) {
    return res.status(404).send({
      message: "User not found."
    });
  }

  let { data: roles, error: roleError } = await supabase
    .from('user_roles')
    .select('role_id')
    .eq('user_id', req.userId);

  if (roleError || !roles) {
    return res.status(403).send({
      message: "Require Admin Role!"
    });
  }

  const roleIds = roles.map(role => role.role_id);
  let { data: roleNames, error: roleNameError } = await supabase
    .from('roles')
    .select('name')
    .in('id', roleIds);

  if (roleNameError || !roleNames.some(role => role.name === 'admin')) {
    return res.status(403).send({
      message: "Require Admin Role!"
    });
  }

  next();
};

isModerator = async (req, res, next) => {
  let { data: user, error } = await supabase
    .from('users')
    .select('id')
    .eq('id', req.userId)
    .single();

  if (error || !user) {
    return res.status(404).send({
      message: "User not found."
    });
  }

  let { data: roles, error: roleError } = await supabase
    .from('user_roles')
    .select('role_id')
    .eq('user_id', req.userId);

  if (roleError || !roles) {
    return res.status(403).send({
      message: "Require Moderator Role!"
    });
  }

  const roleIds = roles.map(role => role.role_id);
  let { data: roleNames, error: roleNameError } = await supabase
    .from('roles')
    .select('name')
    .in('id', roleIds);

  if (roleNameError || !roleNames.some(role => role.name === 'moderator')) {
    return res.status(403).send({
      message: "Require Moderator Role!"
    });
  }

  next();
};

isModeratorOrAdmin = async (req, res, next) => {
  let { data: user, error } = await supabase
    .from('users')
    .select('id')
    .eq('id', req.userId)
    .single();

  if (error || !user) {
    return res.status(404).send({
      message: "User not found."
    });
  }

  let { data: roles, error: roleError } = await supabase
    .from('user_roles')
    .select('role_id')
    .eq('user_id', req.userId);

  if (roleError || !roles) {
    return res.status(403).send({
      message: "Require Moderator or Admin Role!"
    });
  }

  const roleIds = roles.map(role => role.role_id);
  let { data: roleNames, error: roleNameError } = await supabase
    .from('roles')
    .select('name')
    .in('id', roleIds);

  if (roleNameError || !roleNames.some(role => role.name === 'moderator' || role.name === 'admin')) {
    return res.status(403).send({
      message: "Require Moderator or Admin Role!"
    });
  }

  next();
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;
