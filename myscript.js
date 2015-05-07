
function linkify() {
	// Checking page title
	if (document.title.indexOf("Google") == -1) {
		//Test
		//alert();

		//Get Table
		// Cross Domain Exception
		//var table = window.frames[0].document.getElementsByClassName("datadisplaytable");
		var tables = document.getElementsByClassName('datadisplaytable');

		var table = tables[0];

		var rows = table.getElementsByTagName('tr');
		console.dir(rows);

		// Prep instructor column variable.
		var instructorColumn = null;

		// Loop through rows to find instructor cell location
		instructorLoop:
		for (var i = 0; i < rows.length; i++) {
			//console.dir(rows[i]);

			// Get row we are at
			var row = rows[i];

			// Skip rows without table content
			if(row.cells.length <= 1) {
				//console.log("Skipped row:");
				//console.log(row.textContent);
			} else {
				// Loop through cells in each row
			   	for (var j = 0; j < row.cells.length; j++) {
			     	//console.dir(row.cells[j]);
			     	//console.dir(row.cells[j].textContent);

			     	if(row.cells[j].textContent == "Instructor") {
			     		console.log("Ins: " + j);
			     		var instructorColumn = j;
			     		break instructorLoop;
			     	}
			   	}
			}
		}

		// Error check if we found the instructor Column or not
	   	if(instructorColumn === null) {
	   		alert("Failed to find Instructor Column.");
	   	} else {
			// Loop through rows changing instructors cells.
			for (var i = 0; i < rows.length; i++) {
				//console.dir(rows[i]);

				// Get row we are at
				var row = rows[i];

				// Skip rows without table content
				if(row.cells.length <= 1) {
					//console.log("Skipped row:");
					//console.log(row.textContent);
				} else {
					if(row.cells[instructorColumn].textContent != "Instructor") {
						row.cells[instructorColumn].innerHTML = "HI";
					}
				}
			}
		}

		//// TEST ////
	    //Creating Elements
	    var button = document.createElement("Button")
	    var text = document.createTextNode("TEST");
	    button.appendChild(text);

	    //Appending to DOM
	    document.body.appendChild(button);
	}
}
