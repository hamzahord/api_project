const db = require("../models");
const config = require("../config/auth.config");
const supabase = db.supabase;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      })
      .single();

    if (error) throw error;

    if (req.body.roles) {
      const { data: roles, error: roleError } = await supabase
        .from('roles')
        .select('*')
        .in('name', req.body.roles);

      if (roleError) throw roleError;

      const userRoles = roles.map(role => ({ user_id: user.id, role_id: role.id }));
      const { error: userRoleError } = await supabase
        .from('user_roles')
        .insert(userRoles);

      if (userRoleError) throw userRoleError;
    } else {
      // user role = 1 (default)
      const { error: userRoleError } = await supabase
        .from('user_roles')
        .insert({ user_id: user.id, role_id: 1 });

      if (userRoleError) throw userRoleError;
    }

    res.send({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', req.body.username)
      .single();

    if (error || !user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.id },
      config.secret,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

    const { data: roles, error: roleError } = await supabase
      .from('user_roles')
      .select('role_id')
      .eq('user_id', user.id);

    if (roleError) throw roleError;

    const roleIds = roles.map(role => role.role_id);
    const { data: roleNames, error: roleNameError } = await supabase
      .from('roles')
      .select('name')
      .in('id', roleIds);

    if (roleNameError) throw roleNameError;

    const authorities = roleNames.map(role => "ROLE_" + role.name.toUpperCase());

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
