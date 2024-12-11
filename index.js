const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = process.env.PORT || 3000;

// MySQL connection setup
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "solo",
	database: "school_management",
});

db.query("CREATE DATABASE IF NOT EXISTS school_management", (err, result) => {
	if (err) {
		console.log("Error creating database:", err);
	} else {
		console.log("Database checked/created successfully");
	}
});

// Middleware to parse JSON
app.use(express.json());

// Root route
app.get("/", (req, res) => {
	res.send(
		"Welcome to the School Management API. Use /addSchool and /listSchools endpoints.",
	);
});

// Add School API
app.post("/addSchool", (req, res) => {
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
		res.status(201).json({ message: "School added successfully" });
	});
});

// List Schools API - sorted by proximity
app.get("/listSchools", (req, res) => {
	const { userLatitude, userLongitude } = req.query;

	if (!userLatitude || !userLongitude) {
		return res
			.status(400)
			.json({ message: "User latitude and longitude are required" });
	}

	// SQL query to calculate distance between schools and user
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
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
