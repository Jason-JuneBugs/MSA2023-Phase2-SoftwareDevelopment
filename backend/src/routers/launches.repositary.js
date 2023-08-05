const db = require("../dbConnection")

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
      // Build the SQl Query Object
      const query = { text: sqlText, values: values };

      // Execute the SQL Query and returnt he result
      const result = await db.query(query);
      return result.rows[0];
    } catch (error) {
      throw Error(error);
    }
  },


//   getAllPagedGames: async (limit, page) => {
//     try {
//       if (page <= 0 || !page) {
//         throw new Error("Page number must be greater than 0");
//       }
//       const offset = (page - 1) * limit;
//       // TODO: Update table name
//       const result = await db.query(
//         `
//         SELECT g.id, g.title, g.artwork, g.description, g.genres, g.age_rating, d.name AS developer, d.id AS developer_id, g.year, p.name AS platform, p.id AS platform_id, g.status
//         FROM games AS g
//         JOIN developers AS d ON g.developer_id=d.id
//         JOIN platforms AS p ON g.platform_id=p.id
//         ORDER BY id
//         LIMIT $1
//         OFFSET $2;
//       `,
//         [limit, offset]
//       );
//       return result.rows;
//     } catch (error) {
//       throw Error(error);
//     }
//   },
//   createGame: async (game) => {
//     try {
//       // TODO: Create a game
//       // console.log('👹', values);
//       const values = Object.values(game);

//       const result = await db.query(
//         `
//         INSERT INTO games (title, artwork, description, genres, age_rating, developer_id, year, platform_id, status) 
//         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
//         RETURNING id, title, artwork, description, genres, age_rating, developer_id, (SELECT d.name AS developer FROM developers AS d WHERE d.id=developer_id), year, platform_id, (SELECT p.name AS platform FROM platforms AS p WHERE p.id=platform_id), status; 
//       `,
//         values
//       );
//       return result.rows[0];
//     } catch (error) {
//       throw Error(error);
//     }
//   },
//   getGameById: async (id) => {
//     try {
//       // TODO: Get game by id
//       // console.log('👹', id);
//       const result = await db.query(
//         `
//         SELECT g.id, g.title, g.artwork, g.description, g.genres, g.age_rating, d.name AS developer,d.id AS developer_id, g.year, p.name AS platform, p.id AS platform_id,g.status
//         FROM games AS g
//         JOIN developers AS d ON g.developer_id=d.id
//         JOIN platforms AS p ON g.platform_id=p.id
//         WHERE g.id=$1;
//       `,
//         [id]
//       );
//       return result.rows[0];
//     } catch (error) {
//       return result.rowCount;
//     }
//   },
//   updateGameById: async (id, game) => {
//     try {
//       // TODO: Update game by id
//       const values = Object.values(game);
//       const columns = Object.keys(game);
//       const updateColumns = columns

//         // create a text string for the SQL 'SET' statement
//         .map((column, index) => {
//           let text = "";
//           text = text + `${column} = $${index + 1}`;
//           return text;
//         })
//         .join();

//       // Build the SQL Query as a string to avoid SQl Injection Security Vulnerability
//       const sqlText = `
//       UPDATE games
//       SET ${updateColumns} WHERE id=${id}
//       RETURNING id, title, artwork, description, genres, age_rating, developer_id, (SELECT d.name AS developer FROM developers AS d WHERE d.id=developer_id), year, platform_id, (SELECT p.name AS platform FROM platforms AS p WHERE p.id=platform_id), status; 
//     `;
//       // Build the SQl Query Object
//       const query = { text: sqlText, values: values };

//       // Execute the SQL Query and returnt he result
//       const result = await db.query(query);
//       return result.rows[0];
//     } catch (error) {
//       throw Error(error);
//     }
//   },
//   deleteGameById: async (id) => {
//     try {
//       // TODO: Delete game by id
//       const result = await db.query(
//         `
//       DELETE FROM games AS g
//       WHERE g.id=$1
//       RETURNING *;
//       `,
//         [id]
//       );
//       return result.rowCount;
//     } catch (error) {
//       throw Error(error);
//     }
//   },
};
