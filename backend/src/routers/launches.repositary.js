const db = require("../dbConnection");

module.exports = {
  getAllLaunches: async () => {
    try {
      const result = await db.query(`
          SELECT l.id,l.flightNumber, l.launchDate,l.mission,l.rocket,l.upcoming,l.customers,l.success,p.keplerName AS Destination
          FROM launches AS l
          JOIN planets AS p ON l.target_id=p.planet_id
          ORDER BY l.id;
        `);
      return result.rows;
    } catch (error) {
      throw Error(error);
    }
  },
  getLaunchById: async (id) => {
    try {
      const result = await db.query(
        `
        SELECT l.id,l.flightNumber, l.launchDate,l.mission,l.rocket,l.upcoming,l.customers,l.success,p.keplerName AS Destination
        FROM launches AS l
        JOIN planets AS p ON l.target_id=p.planet_id
        WHERE l.id=$1
        ORDER BY l.id;
      `,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      return result.rowCount;
    }
  },

  getAllPastLaunches: async () => {
    try {
      const result = await db.query(`
      SELECT l.id,l.flightNumber, l.launchDate,l.mission,l.rocket,l.upcoming,l.customers,l.success,p.keplerName AS Destination
         FROM launches AS l
         JOIN planets AS p ON l.target_id=p.planet_id
         WHERE l.upcoming=FALSE
         ORDER BY l.id;
       `);
      return result.rows;
    } catch (error) {
      throw Error(error);
    }
  },

  getAllUpcomingLaunches: async () => {
    try {
      const result = await db.query(`
      SELECT l.id,l.flightNumber, l.launchDate,l.mission,l.rocket,l.upcoming,l.customers,l.success,p.keplerName AS Destination
         FROM launches AS l
         JOIN planets AS p ON l.target_id=p.planet_id
         WHERE l.upcoming=TRUE
         ORDER BY l.id;
       `);
      return result.rows;
    } catch (error) {
      throw Error(error);
    }
  },

  createLaunches: async (launch) => {
    try {
      const values = Object.values(launch);

      const result = await db.query(
        `
        INSERT INTO launches (flightNumber,customers,launchDate,mission,rocket,upcoming,success,target_id) 
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING flightNumber, launchDate,mission,rocket,target_id ; 
      `,
        values
      );
      return result.rows[0];
    } catch (error) {
      throw Error(error);
    }
  },

  deleteLaunchById: async (id) => {
    try {
      const result = await db.query(
        `
      DELETE FROM launches AS l
      WHERE l.id=$1
      RETURNING *;
      `,
        [id]
      );
      return result.rowCount;
    } catch (error) {
      throw Error(error);
    }
  },

  updateLaunchById: async (id, launch) => {
    try {
      // TODO: Update launch by id
      const values = Object.values(launch);
      const columns = Object.keys(launch);
      const updateColumns = columns

        // create a text string for the SQL 'SET' statement
        .map((column, index) => {
          let text = "";
          text = text + `${column} = $${index + 1}`;
          return text;
        })
        .join();

      // Build the SQL Query as a string to avoid SQl Injection Security Vulnerability
      const sqlText = `
      UPDATE launches
      SET ${updateColumns} WHERE id=${id}
      RETURNING flightNumber, launchDate,mission,rocket,target_id;
    `;
      const query = { text: sqlText, values: values };
      const result = await db.query(query);
      return result.rows[0];
    } catch (error) {
      throw Error(error);
    }
  },
};
