const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "FS-DATABASE",
  password: "n6907728",
  port: 5432,
});
module.exports = pool;
