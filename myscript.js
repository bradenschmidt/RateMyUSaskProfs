
// The extension ID
// chrome.runtime.id
var extensionID = "jcnimoojgnaighleoldnkbhembpdhoij";

var searchPageURL = "";

/**
 * [linkify description]
 * @return {[type]} [description]
 */
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
					var cell = row.cells[instructorColumn];
					if(cell.textContent != "Instructor") {
						// Get the prof name
						var profName = cell.textContent;

						// Remove Parentheses and content in them ie. (P)
						profName = profName.replace(/ *\([^)]*\) */g, "");

						// Replace prof name
						cell.innerHTML = profName;

						getProfessorSearchPage(profName);
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

/**
 * [getProfessorPage description]
 * SOURCE: https://github.com/Christian0411/Rate-My-Professor/blob/master/script.js
 * @return {[type]} [description]
 * http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university%of%saskatchewan&queryoption=HEADER&query=Mark%20Eramian&facetSearch=true
 */
function getProfessorSearchPage(professorName) {
	chrome.runtime.sendMessage(extensionID, {
		method: 'POST',
		action: 'xhttp',
		url: 'http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university%of%saskatchewan&queryoption=HEADER&query=' + encodeURI(professorName) + '&facetSearch=true',
		link: searchPageURL
	}, function(response) {
		console.log("Response")

		if(!response) {
			console.log("Error");
			return;
		}

		// Get the html page
		var myHTML = response.response;

		// Make a new div we will use for easier parsing of prof link
		var tempDiv = document.createElement('div');

		// Remove script tag content and place in the empty div
		tempDiv.innerHTML = myHTML.replace(/<script(.|\s)*?\/script>/g, '');

		// Get the sub link for the professor
		var professorClass = tempDiv.getElementsByClassName("listing PROFESSOR")[0].getElementsByTagName('a')[0];

		// Form the full professor link
		searchPageURL =  "http://www.ratemyprofessors.com" + professorClass.getAttribute('href');

		//getProfessorRating(response.professorIndex, searchPageURL)
		console.log(searchPageURL);
	});
}
