// // const express = require("express");
// // const mysql = require("mysql2");
// // const app = express();
// // const port = process.env.PORT || 3000;

// // // MySQL connection setup
// // const db = mysql.createConnection({
// //     host: "localhost",
// //     user: "root",
// //     password: "solo",
// //     database: "school_management",
// // });

// // db.query("CREATE DATABASE IF NOT EXISTS school_management", (err, result) => {
// //     if (err) {
// //         console.log("Error creating database:", err);
// //     } else {
// //         console.log("Database checked/created successfully");
// //     }
// // });

// // // Middleware to parse JSON
// // app.use(express.json());

// // // Root route
// // app.get("/", (req, res) => {
// //     res.send(
// //         "Welcome to the School Management API. Use /addSchool and /listSchools endpoints.",
// //     );
// // });

// // // Add School API
// // app.post("/addSchool", (req, res) => {
// //     const { name, address, latitude, longitude } = req.body;

// //     if (!name || !address || !latitude || !longitude) {
// //         return res.status(400).json({ message: "All fields are required" });
// //     }

// //     const query =
// //         "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
// //     db.query(query, [name, address, latitude, longitude], (err, result) => {
// //         if (err) {
// //             return res.status(500).json({ message: "Error inserting school data" });
// //         }
// //         res.status(201).json({ message: "School added successfully" });
// //     });
// // });

// // // List Schools API - sorted by proximity
// // app.get("/listSchools", (req, res) => {
// //     const { userLatitude, userLongitude } = req.query;

// //     if (!userLatitude || !userLongitude) {
// //         return res
// //             .status(400)
// //             .json({ message: "User latitude and longitude are required" });
// //     }

// //     // SQL query to calculate distance between schools and user
// //     const query = `
// //     SELECT *, (
// //       6371 * acos(
// //         cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +
// //         sin(radians(?)) * sin(radians(latitude))
// //       )
// //     ) AS distance
// //     FROM schools
// //     ORDER BY distance ASC;
// //   `;

// //     db.query(
// //         query, [userLatitude, userLongitude, userLatitude],
// //         (err, results) => {
// //             if (err) {
// //                 return res.status(500).json({ message: "Error fetching schools" });
// //             }
// //             res.json(results);
// //         },
// //     );
// // });

// // // Start the server
// // app.listen(port, () => {
// //     console.log(`Server is running on port ${port}`);
// // });
// // //
// // Respected Priyanka Mam
// // I hope you are doing well.I am writing to inform you that I received a grade of B in your subject this semester.If I were to achieve an A in this subject, my overall CGPA would reach 7, making me eligible
// // for placements in the company I am targeting.

// // As part of this, I have filled out the objection form
// // for the final result of the 5 th semester.I kindly request your support and consideration in this matter, and I would be extremely grateful
// // if you could assist me in any way to help improve my grade.
// // Achieving this CGPA is crucial
// // for my eligibility
// // for placements, and it would greatly enhance my prospects of securing a position in the company I am targeting.I would be extremely grateful
// // for any guidance or support you can in this regard.

// // Thank you
// // for your time and understanding.I look forward to your positive response.

// // Best regards,
// // Aditya Shukla
// // 22223006
// // MCA Department

// // using bfs
// // Definition for a binary tree node
// // class TreeNode {
// // 	constructor(value) {
// // 		this.value = value;
// // 		this.left = null;
// // 		this.right = null;
// // 	}
// // }

// // // Function to perform BFS traversal
// // function bfsTraversal(root) {
// // 	if (!root) return [];

// // 	let queue = [root]; // Initialize queue with the root node
// // 	console.log(queue);
// // 	let result = [];

// // 	while (queue.length > 0) {
// // 		let currentNode = queue.shift(); // Dequeue the front node

// // 		// Process the current node
// // 		result.push(currentNode.value);

// // 		// Enqueue left child if exists
// // 		if (currentNode.left) {
// // 			queue.push(currentNode.left);
// // 		}

// // 		// Enqueue right child if exists
// // 		if (currentNode.right) {
// // 			queue.push(currentNode.right);
// // 		}
// // 	}

// // 	return result;
// // }

// // // Example usage
// // const root = new TreeNode(1);
// // root.left = new TreeNode(2);
// // root.right = new TreeNode(3);
// // root.left.left = new TreeNode(4);
// // root.left.right = new TreeNode(5);
// // root.right.left = new TreeNode(6);
// // root.right.right = new TreeNode(7);

// // // Perform BFS traversal
// // bfsTraversal(root);

// // function buttonWithLongestTime(events) {
// // 	let time = events[0][1];
// // 	let button = events[0][0];

// // 	let i = 1;
// // 	while (i < events.length) {
// // 		let time1 = events[i][1] - events[i - 1][1];

// // 		if (time1 > time) {
// // 			time = time1;
// // 			button = events[i][0];
// // 		} else if (time1 === time) {
// // 			if (events[i][0] < button) {
// // 				button = events[i][0];
// // 			}
// // 		}

// // 		i++;
// // 	}

// // 	return button;
// // }

// function minCostToBalance(arr) {
//     const n = arr.length;

//     let odd = [];
//     let even = [];

//     for (let i = 0; i < n; i++) {
//         if (i % 2 === 0) {
//             if (arr[i] % 2 !== 0) {
//                 continue;
//             } else {
//                 even.push(arr[i]);
//             }
//         } else {
//             if (arr[i] % 2 === 0) {
//                 continue;
//             } else {
//                 odd.push(arr[i]);
//             }
//         }
//     }

//     if (odd.length !== even.length) {
//         return -1;
//     }

//     odd.sort((a, b) => a - b);
//     even.sort((a, b) => a - b);

//     let cost = 0;
//     for (let i = 0; i < odd.length; i++) {
//         cost += odd[i] + even[i];
//     }

//     return cost;
// }

// console.log(minCostToBalance([4, 3, 2, 1]));
// console.log(minCostToBalance([1, 2, 3, 4]));
// console.log(minCostToBalance([1, 1, 1]));

// I received a grade of D in Mobile Computing, but achieving a C would raise my CGPA to 7, which is essential
// // for placement eligibility in my target company.kindly request your support in reviewing my grade.Your guidance in helping me improve it would be greatly appreciated, as a CGPA of 7 is crucial
// // for my placement prospects.

// // function minSwaps(arr) {
// //     // code here
// //     let arr1 = []
// //     let swaps = 0
// //     for (let i = 0; i < arr.length; i++) {
// //         arr1.push([arr[i], i])
// //     }
// //     arr1.sort((a, b) => a[0] - b[0]);
// //     //console.log(arr1)
// //     for (let i = 0; i < arr.length; i++) {
// //         let pair = arr1[i]
// //         console.log(pair)
// //         let value = pair[0]
// //         let index = pair[1]
// //         if (i !== index) {
// //             [arr1[i], arr[index]] = [arr1[index], arr1[i]]
// //             swaps++
// //             i -= 1
// //         }
// //     }
// //     console.log(swaps)
// //     return swaps

// // }

// // minSwaps([10, 19, 6, 3, 5])
// function ab(a) {
// 	let count = 2;
// 	return abc(a, count);
// }

// function abc(a, count) {
// 	return console.log(a + count);
// }
// ab("a");
