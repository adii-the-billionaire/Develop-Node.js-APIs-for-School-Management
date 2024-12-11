const mysql = require("mysql2");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "solo",
	database: "school_management",
});

module.exports = async (req, res) => {
	if (req.method === "GET") {
		const { userLatitude, userLongitude } = req.query;
		if (!userLatitude || !userLongitude) {
			return res
				.status(400)
				.json({ message: "User latitude and longitude are required" });
		}

		const query = `
      SELECT *, (
        6371 * acos(
          cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + 
          sin(radians(?)) * sin(radians(latitude))
        )
      ) AS distance
      FROM schools
      ORDER BY distance ASC;
    `;
		db.query(
			query,
			[userLatitude, userLongitude, userLatitude],
			(err, results) => {
				if (err) {
					return res.status(500).json({ message: "Error fetching schools" });
				}
				res.json(results);
			},
		);
	} else {
		return res.status(405).json({ message: "Method not allowed" });
	}
};
