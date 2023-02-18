
var pgp =  require("pg-promise");
const connections = [];
var result=[];
class SQL {
  static async getConnection() {
    const dbName = "railway";

    if (!connections[dbName]) {
      const dbUser = "postgres";
      const dbPassword = "568y2dYPyqBwXKPJTBwt";
      const dbHost = "containers-us-west-182.railway.app";
      const dbPort = "7662";

      const dbc = pgp({ capSQL: true });
      console.log(`Opening connection to: ${dbName}, host is: ${dbHost}`);

      const connectionString = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
      connections[dbName] = dbc(connectionString);
    }
    return connections[dbName];
  }

  static async executeQuery(query) {
    try {
      const date1 = new Date().getTime();
      const connection = await this.getConnection();
      result = await connection.query(query);

      const date2 = new Date().getTime();
      const durationMs = date2 - date1;
      const durationSeconds = Math.round(durationMs / 1000);
      let dataLength = 0;

      if (result && result.length) dataLength = result.length;

      console.log(
        `[SQL] [${durationMs}ms] [${durationSeconds}s] [${dataLength.toLocaleString()} records] ${query}`
      );
        module.exports.result=result;
    //   console.log(result);
    //   const myJSON = JSON.stringify(result);
      return result;
    } catch (e) {
      console.error(`Error executing query: ${query} Error: ${e.message}`);
      throw e;
    }
  }
}
// Redshift.executeQuery("select * from emp limit 2"); 

module.exports=SQL;




  