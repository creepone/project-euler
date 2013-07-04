// union-find operations
function makeSet(v) {
	v.parent = v;
}

function find(v) {
	return (v.parent == v) ? v : find(v.parent);
}

function union(v,w) {
	var vRoot = find(v), wRoot = find(w);
	vRoot.parent = wRoot.parent;
}

function main() {
	
	var vertices = [], edges = [];
	for (var i = 0; i < 40; i++) {
		var vertex = { index: i };
		makeSet(vertex);
		vertices.push(vertex);
	}
	
	var total = 0;
		
	// read the matrix into an array of weighted edges
	input.split(",").forEach(function (nr, index) {
		var i = Math.floor(index / 40), j = index % 40;	
		if (i > j || nr == "-")
			return;
		
		edges.push({ from: vertices[i], to: vertices[j], value: +nr });
		total += +nr;
	});
	
	var res = [], min;
	
	while (edges.length > 0) {
		min = { value: edges[0].value, edge: edges[0], index: 0 };
		
		// find minimal edge
		edges.forEach(function (edge, i) {
			if (edge.value < min.value) {
				min = { value: edge.value, edge: edge, index: i };
			}
		});
		
		var fromTree = find(min.edge.from), toTree = find(min.edge.to);
		if (fromTree != toTree) {
			union(fromTree, toTree);
			res.push(min.edge);
		}
		edges.splice(min.index, 1);
	}

	var sum = 0;
	res.forEach(function (edge) { sum += edge.value; });
	console.log(total - sum);
}

setTimeout(main, 2000);