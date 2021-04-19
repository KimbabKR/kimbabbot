module.exports =
async (name, db) => {
	let stock = await db.find().toArray();
	let names = [];
	for (let s of stock) {
		names.push(s._id);
	}
	let target = [];

	for (let n of names) {
		if (n.includes(name)) {
			target.push(n);
		}
	}

	return target;
};