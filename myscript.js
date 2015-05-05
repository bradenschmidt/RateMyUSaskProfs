
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

		//TEST
		//alert(table);
		//
		//alert(table.rows.length);

		var rows = table.getElementsByTagName('tr');
		console.dir(rows);

		for (var row in rows) {
			//alert('test');

			//alert(row.cells.length);
			//alert(row.cells[0].textContent);

			console.dir(row);

		   for (var col in row.cells) {
		     console.dir(col);
		     //iterate through columns
		     //columns would be accessed using the "col" variable assigned in the for loop
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
