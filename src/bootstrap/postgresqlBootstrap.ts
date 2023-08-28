import postgresql from 'pg';

const { Pool } = postgresql;

const connectDb = async (callback = null) => {
  try {
      const pool = new Pool({
          user: process.env.PGUSER,
          host: process.env.PGHOST,
          database: process.env.PGDATABASE,
          password: process.env.PGPASSWORD,
          port: process.env.PGPORT,
      });

      const connection = {
        pool,
        query: (...args) => {
          return pool.connect().then((client) => {
            return client.query(...args).then((res) => {
              client.release();
              return res.rows;
            });
          });
        },
      };
    
      process.postgresql = connection;
    
      if (callback) {
        callback(connection);
      }
    
      return connection;
  } catch (error) {
      console.log(error)
  }
};
 
export default connectDb;