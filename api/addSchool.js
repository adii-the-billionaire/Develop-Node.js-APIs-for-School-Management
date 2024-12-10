const mysql = require("mysql2");
const bodyParser = require("body-parser");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "solo",
	database: "school_management",
});

module.exports = async (req, res) => {
	if (req.method === "POST") {
		const { name, address, latitude, longitude } = req.body;

		if (
			!name ||
			!address ||
			latitude === undefined ||
			longitude === undefined
		) {
			return res.status(400).json({
				error: "All fields are required: name, address, latitude, longitude.",
			});
		}

		const query =
			"INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

		db.query(query, [name, address, latitude, longitude], (err, result) => {
			if (err) {
				return res
					.status(500)
					.json({ error: "Error inserting data into the database." });
			}

			res.status(201).json({
				message: "School added successfully",
				schoolId: result.insertId,
			});
		});
	} else {
		res.status(405).json({ error: "Method not allowed" });
	}
};
