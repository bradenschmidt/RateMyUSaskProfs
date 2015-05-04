
function linkify() {
	// Checking page title
	if (document.title.indexOf("Google") == -1) {
		//Test
		alert();

		//Get Table
		// Cross Domain Exception
		//var table = window.frames[0].document.getElementsByClassName("datadisplaytable");
		var table = document.getElementsByClassName('datadisplaytable');

		//TEST
		alert(table);

		for (var i = 0, row; row = table.rows[i]; i++) {
		   for (var j = 0, col; col = row.cells[j]; j++) {
		     alert(col);
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
