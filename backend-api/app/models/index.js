const { createClient } = require("@supabase/supabase-js");
const config = require("../config/db.config.js");

const supabaseUrl = config.SUPABASE_URL;
const supabaseKey = config.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const db = {};

db.supabase = supabase;
db.user = require("../models/user.model.js")(supabase);
db.role = require("../models/role.model.js")(supabase);
db.userRole = require("../models/userRole.model.js")(supabase);
db.article = require("../models/article.model.js")(supabase);
db.comment = require("../models/comment.model.js")(supabase);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
