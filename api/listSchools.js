const mysql = require("mysql2");
const { getDistance } = require("geolib");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "solo",
	database: "school_management",
});

module.exports = async (req, res) => {
	if (req.method === "GET") {
		const { latitude, longitude } = req.query;

		if (latitude === undefined || longitude === undefined) {
			return res
				.status(400)
				.json({ error: "Latitude and longitude are required." });
		}

		const query = "SELECT * FROM schools";

		db.query(query, (err, schools) => {
			if (err) {
				return res
					.status(500)
					.json({ error: "Error fetching schools from the database." });
			}

			const sortedSchools = schools
				.map((school) => {
					const distance = getDistance(
						{
							latitude: parseFloat(latitude),
							longitude: parseFloat(longitude),
						},
						{ latitude: school.latitude, longitude: school.longitude },
					);
					return { ...school, distance };
				})
				.sort((a, b) => a.distance - b.distance);

			res.status(200).json(sortedSchools);
		});
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
};
