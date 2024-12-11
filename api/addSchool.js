const mysql = require("mysql2");

// MySQL connection setup
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "solo",
	database: "school_management",
});

module.exports = async (req, res) => {
	if (req.method === "POST") {
		const { name, address, latitude, longitude } = req.body;
		if (!name || !address || !latitude || !longitude) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const query =
			"INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
		db.query(query, [name, address, latitude, longitude], (err, result) => {
			if (err) {
				return res.status(500).json({ message: "Error inserting school data" });
			}
			return res.status(201).json({ message: "School added successfully" });
		});
	} else {
		return res.status(405).json({ message: "Method not allowed" });
	}
};
