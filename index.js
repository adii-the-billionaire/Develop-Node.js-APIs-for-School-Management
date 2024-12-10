const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const { getDistance } = require("geolib"); // For calculating geographical distance
const cors = require("cors"); // Add CORS support

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Set up MySQL connection
const db = mysql.createConnection({
	host: "localhost", // MySQL server address
	user: "root", // MySQL username (replace with your MySQL user)
	password: "solo", // Provide your MySQL password here
	database: "school_management", // Ensure this is your actual database name
});

db.connect((err) => {
	if (err) {
		console.error("Could not connect to database:", err);
		process.exit(1); // Exit the application if database connection fails
	}
	console.log("Connected to MySQL database");
});

// Root route (GET /)
app.get("/", (req, res) => {
	res.send("Welcome to the School Management API!");
});

// Add School API
app.post("/addSchool", (req, res) => {
	const { name, address, latitude, longitude } = req.body;

	// Validate input data
	if (!name || !address || latitude === undefined || longitude === undefined) {
		return res.status(400).json({
			error: "All fields are required: name, address, latitude, longitude.",
		});
	}

	// Query to insert school data into the database
	const query =
		"INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

	db.query(query, [name, address, latitude, longitude], (err, result) => {
		if (err) {
			return res
				.status(500)
				.json({ error: "Error inserting data into the database." });
		}

		// Send success response after successful insertion
		res.status(201).json({
			message: "School added successfully",
			schoolId: result.insertId,
		});
	});
});

// List Schools API (Sorted by proximity to the user's location)
app.get("/listSchools", (req, res) => {
	const { latitude, longitude } = req.query;

	// Validate query parameters
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

		// Sort schools by proximity to the user's location
		const sortedSchools = schools
			.map((school) => {
				const distance = getDistance(
					{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
					{ latitude: school.latitude, longitude: school.longitude },
				);
				return { ...school, distance }; // Add distance to each school
			})
			.sort((a, b) => a.distance - b.distance); // Sort by distance

		// Return sorted schools
		res.status(200).json(sortedSchools);
	});
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
