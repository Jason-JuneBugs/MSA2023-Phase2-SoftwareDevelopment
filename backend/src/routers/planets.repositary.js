const db = require("../dbConnection")

module.exports = {
    getAllPlanets: async () => {
      try {
        const result = await db.query(`
          SELECT keplerName,planet_id 
          FROM planets  
          ORDER BY id;
        `);
        return result.rows;
      } catch (error) {
        throw Error(error);
      }
    },
};
