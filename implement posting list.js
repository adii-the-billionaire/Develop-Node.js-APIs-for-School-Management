class PostingListNode {
	constructor(value) {
		this.value = value; // The value of the node
		this.order = -1; // The order initialized to -1
		this.next = null; // Pointer to the next node (null if no next node)
		this.jump = null; // Pointer to the jump node (null if no jump)
	}
}

function setJumpOrder(L) {
	let order = { value: 0 }; // Use an object to wrap the order value
	setJumpOrderHelper(L, order);
}

function setJumpOrderHelper(L, order) {
	if (L !== null && L.order === -1) {
		L.order = order.value; // Assign the current order
		order.value++; // Increment the order for the next node

		// Recursively set the order for the jump node (if it exists)
		setJumpOrderHelper(L.jump, order);

		// Recursively set the order for the next node (if it exists)
		setJumpOrderHelper(L.next, order);
	}
}

// Example usage of the code

// Create nodes
let node1 = new PostingListNode("a");
let node2 = new PostingListNode("b");
let node3 = new PostingListNode("c");
let node4 = new PostingListNode("d");

// Link nodes together
node1.next = node2;
node2.next = node3;
node3.next = node4;

// Set some jump connections
node1.jump = node3; // Node 1 jumps to Node 3
node2.jump = node4; // Node 2 jumps to Node 4
node3.jump = node2; // Node 3 jumps to Node 2
node4.jump = node4; // Node 4 jumps to itself

// Compute the jump order
setJumpOrder(node1);

// Print the order of each node
let current = node1;
let visited = new Set(); // To track visited nodes and avoid infinite loops

while (current !== null) {
	console.log(`Node value: ${current.value}, Order: ${current.order}`);

	// Prevent infinite loop if jump points to the same node
	////if (visited.has(current)) {
	// break;
	//}

	//visited.add(current);
	current = current.next;
}
