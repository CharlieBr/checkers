var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $('#checkersBoard').show();
    } else {
        $('#checkersBoard').hide();
    }
}

function connect() {
    var socket = new SockJS('/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        stompClient.subscribe('/topic/moves', function (move) {
            var startX = JSON.parse(move.body).startX;
            var startY = JSON.parse(move.body).startY;
            var stopX = JSON.parse(move.body).stopX;
            var stopY = JSON.parse(move.body).stopY;
            var occupied = JSON.parse(move.body).occupied;
            var turnColor = JSON.parse(move.body).turn;
            showMove(startX, startY, stopX, stopY, occupied, turnColor);
        });
    });
}

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

$(function () {
    $('#connect').click(function () {
        connect();
    });
    $( "#disconnect" ).click(function() {
        disconnect(); });
});

var w; //The Game grid window.
var user;


var grid = [
	/* Initial White checker positions */
	{x:1, y:0, occupied:"checker-white", king:false},
	{x:3, y:0, occupied:"checker-white", king:false},
	{x:5, y:0, occupied:"checker-white", king:false},
	{x:7, y:0, occupied:"checker-white", king:false},
	{x:0, y:1, occupied:"checker-white", king:false},
	{x:2, y:1, occupied:"checker-white", king:false},
	{x:4, y:1, occupied:"checker-white", king:false},
	{x:6, y:1, occupied:"checker-white", king:false},
	{x:1, y:2, occupied:"checker-white", king:false},
	{x:3, y:2, occupied:"checker-white", king:false},
	{x:5, y:2, occupied:"checker-white", king:false},
	{x:7, y:2, occupied:"checker-white", king:false},

	/* Initial empty positions */
	{x:0, y:3, occupied:"", king:false},
	{x:2, y:3, occupied:"", king:false},
	{x:4, y:3, occupied:"", king:false},
	{x:6, y:3, occupied:"", king:false},
	{x:1, y:4, occupied:"", king:false},
	{x:3, y:4, occupied:"", king:false},
	{x:5, y:4, occupied:"", king:false},
	{x:7, y:4, occupied:"", king:false},

	/* Initial Red checker positions */
	{x:0, y:5, occupied:"checker-red", king:false},
	{x:2, y:5, occupied:"checker-red", king:false},
	{x:4, y:5, occupied:"checker-red", king:false},
	{x:6, y:5, occupied:"checker-red", king:false},
	{x:1, y:6, occupied:"checker-red", king:false},
	{x:3, y:6, occupied:"checker-red", king:false},
	{x:5, y:6, occupied:"checker-red", king:false},
	{x:7, y:6, occupied:"checker-red", king:false},
	{x:0, y:7, occupied:"checker-red", king:false},
	{x:2, y:7, occupied:"checker-red", king:false},
	{x:4, y:7, occupied:"checker-red", king:false},
	{x:6, y:7, occupied:"checker-red", king:false}
];

var selected = {occupied:"", x:0, y:0, king:false};
var turn = 'white';
var white;
var red;

function loadGrid()
{
	printGrid();
	addEvents();
}

function printGrid()
{
	var board = document.getElementById('gamegrid');
	var html = "<table class='grid'>";

	for (var i = 0; i < grid.length; i++)
	{
		if (grid[i].x == 0 || grid[i].x == 1)
		{
			html += "<tr>";
		}
		if (grid[i].x%2 == 1)
		{
			html += "<td class='redcell'></td>";
		}

		html += "<td class='blackcell'><div id=" + grid[i].occupied + "></div></td>";

		if (grid[i].x%2 == 0 && grid[i].x != 7)
		{
			html += "<td class='redcell'></td>";
		}
		if (grid[i].x == 6)
		{
			html += "</tr>";
		}
		if (grid[i].x == 7)
		{
			html += "</tr>";
		}
	}

	html += "</table>";
	board.innerHTML = html;
}

function setName(color, playername)
{
	var outer = document.getElementById(color + 'player');
	if (!playername)
	{
		playername = document.getElementById(color + 'name').value;
	}
	outer.innerHTML = '<h4>' + playername + '</h4>';

	switch(color)
	{
		case 'white':
			white = playername;
			break;
		case 'red':
			red = playername;
			break;

	}
}

function selectOption()
{
	var options = document.getElementById('options');
	if (options.value == 'reset')
	{
		location.reload(true);
	}
	else if (options.value == 'redsurrender')
	{
		alert('White Wins!');
		location.reload(true);
	}
	else if (options.value == 'whitesurrender')
	{
		alert('Red Wins!');
		location.reload(true);
	}
}

function addEvents()
{
	var gridDiv = document.getElementById('gamegrid');
	var tds = gridDiv.getElementsByTagName('td');

	for (var i = 0; i < tds.length; i++)
	{
		tds[i].onclick = movePiece;
	}
}

var startX = null;
var startY = null;
var stopX = null;
var stopY = null;

function sendMove(startX, startY, stopX, stopY, occupied, turn) {
    stompClient.send("/grid/move", {}, JSON.stringify({
        'startX': startX,
        'startY':startY,
        'stopX':stopX,
        'stopY':stopY,
        'occupied' : occupied,
        'turn': turn}));
}

function showMove(startX, startY, stopX, stopY, occupied, turnColor){
    var startGridCell = getGridCell(startX, startY);
    startGridCell.innerHTML = "<div id=''></div>";
    var stopGridCell = getGridCell(stopX, stopY);
    stopGridCell.innerHTML = "<div id=" + occupied + "></div>";
    turn = turnColor;
}

function movePiece()
{
	cell = this;
	x = cell.cellIndex;
	y = cell.parentNode.rowIndex;
	gridPiece = getGridPiece(x, y);
	var location = document.getElementById('location');
    startX = (startX == null ? x : startX);
    startY = (startY == null ? y : startY);

	if (selected.occupied == "" && gridPiece && gridPiece.occupied.indexOf(turn) != -1)
	{
		selected.occupied = gridPiece.occupied;
		selected.king = gridPiece.king;
		selected.x = x;
		selected.y = y;
		gridPiece.occupied = "";
		cell.innerHTML = "<div id=''></div>";
		cell.onclick = movePiece;
	}
	else if (selected.occupied.indexOf('white') != -1)
	{
		if (y == 7)
		{
			selected.king = true;
			selected.occupied = 'king-white';
		}
		//Move
		if ((x == selected.x-1 || x == selected.x+1) && (y == selected.y+1) && (gridPiece.occupied == ""))
		{
			cell.innerHTML = "<div id=" + selected.occupied + "></div>";
			cell.onclick = movePiece;
			gridPiece.occupied = selected.occupied;
			gridPiece.king = selected.king;
			selected.occupied = "";
			selected.king = false;
			selected.x = 0;
			selected.y = 0;
            stopX = (stopX == null ? x : stopX);
            stopY = (stopY == null ? y : stopY);
            if(startX!=null && startY!=null && stopX != null && stopY != null){
                sendMove(startX, startY, stopX, stopY, gridPiece.occupied, 'red');
                startX = null;
                startY = null;
                stopX = null;
                stopY = null;
            }
			turn = 'red';
		}//Jump left
		else if ((x == selected.x-2) && (y == selected.y+2) && (getGridPiece(x, y).occupied == ""))
		{
			jumped = getGridPiece(x+1, y-1);
			if (jumped.occupied.indexOf('white') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x+1, y-1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = movePiece;
				gridPiece.occupied = selected.occupied;
				gridPiece.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = movePiece;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'red';

				gameFinished();
			}
		}//Jump right
		else if ((x == selected.x+2) && (y == selected.y+2) && (gridPiece.occupied == ""))
		{
			jumped = getGridPiece(x-1, y-1);
			if (jumped.occupied.indexOf('white') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x-1, y-1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = movePiece;
				gridPiece.occupied = selected.occupied;
				gridPiece.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = movePiece;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'red';
				gameFinished();
			}
		}//Drop checker
		else if (x == selected.x && y == selected.y)
		{
			gridPiece.occupied = selected.occupied;
			gridPiece.king = selected.king;
			selected.occupied = '';
			selected.king = false;
			selected.x = 0;
			selected.y = 0;

			cell.innerHTML = "<div id=" + gridPiece.occupied + "></div>";
			cell.onclick = movePiece;
		}//Move king
		else if ((x == selected.x-1 || x == selected.x+1) && (y == selected.y-1) && (gridPiece.occupied == "") && selected.king)
		{
			cell.innerHTML = "<div id=" + selected.occupied + "></div>";
			cell.onclick = movePiece;
			gridPiece.occupied = selected.occupied;
			gridPiece.king = selected.king;
			selected.occupied = "";
			selected.king = false;
			selected.x = 0;
			selected.y = 0;
			turn = 'red';
		}//Jump left king
		else if ((x == selected.x-2) && (y == selected.y-2) && (getGridPiece(x, y).occupied == "") && selected.king)
		{
			jumped = getGridPiece(x+1, y+1);
			if (jumped.occupied.indexOf('white') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x+1, y+1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = movePiece;
				gridPiece.occupied = selected.occupied;
				gridPiece.king = selected.king
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = movePiece;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'red';
				gameFinished();
			}
		}//Jump right king
		else if ((x == selected.x+2) && (y == selected.y-2) && (gridPiece.occupied == "") && selected.king)
		{
			jumped = getGridPiece(x-1, y+1);
			if (jumped.occupied.indexOf('white') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x-1, y+1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = movePiece;
				gridPiece.occupied = selected.occupied;
				gridPiece.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = movePiece;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'red';
				gameFinished();
			}
		}
	}
	else if (selected.occupied.indexOf('red') != -1)
	{
		if (y == 0)
		{
			selected.king = true;
			selected.occupied = 'king-red';
		}
		//Move
		if ((x == selected.x-1 || x == selected.x+1) && (y == selected.y-1) && (gridPiece.occupied == ""))
		{
			cell.innerHTML = "<div id=" + selected.occupied + "></div>";
			cell.onclick = movePiece;
			gridPiece.occupied = selected.occupied;
			gridPiece.king = selected.king;
			selected.occupied = "";
			selected.king = false;
			selected.x = 0;
			selected.y = 0;
            stopX = (stopX == null ? x : stopX);
            stopY = (stopY == null ? y : stopY);
            if(startX != null && startY != null && stopX != null && stopY != null){
                sendMove(startX, startY, stopX, stopY, gridPiece.occupied, 'white');
                startX = null;
                startY = null;
                stopX = null;
                stopY = null;
            }
			turn = 'white';
		}//Jump left
		else if ((x == selected.x-2) && (y == selected.y-2) && (getGridPiece(x, y).occupied == ""))
		{
			jumped = getGridPiece(x+1, y+1);
			if (jumped.occupied.indexOf('red') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x+1, y+1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = movePiece;
				gridPiece.occupied = selected.occupied;
				gridPiece.king = selected.king
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = movePiece;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'white';
				gameFinished();
			}
		}//Jump right
		else if ((x == selected.x+2) && (y == selected.y-2) && (gridPiece.occupied == ""))
		{
			jumped = getGridPiece(x-1, y+1);
			if (jumped.occupied.indexOf('red') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x-1, y+1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = movePiece;
				gridPiece.occupied = selected.occupied;
				gridPiece.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = movePiece;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'white';
				gameFinished();
			}
		}//Drop checker
		else if (x == selected.x && y == selected.y)
		{
			gridPiece.occupied = selected.occupied;
			gridPiece.king = selected.king;
			selected.occupied = '';
			selected.king = false;
			selected.x = 0;
			selected.y = 0;
			cell.innerHTML = "<div id=" + gridPiece.occupied + "></div>";
			cell.onclick = movePiece;
		}//Move king
		else if ((x == selected.x-1 || x == selected.x+1) && (y == selected.y+1) && (gridPiece.occupied == "") && selected.king)
		{
			cell.innerHTML = "<div id=" + selected.occupied + "></div>";
			cell.onclick = movePiece;
			gridPiece.occupied = selected.occupied;
			gridPiece.king = selected.king;
			selected.occupied = "";
			selected.king = false;
			selected.x = 0;
			selected.y = 0;
			turn = 'white';
		}//Jump left king
		else if ((x == selected.x-2) && (y == selected.y+2) && (getGridPiece(x, y).occupied == "") && selected.king)
		{
			jumped = getGridPiece(x+1, y-1);
			if (jumped.occupied.indexOf('red') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x+1, y-1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = movePiece;
				gridPiece.occupied = selected.occupied;
				gridPiece.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = movePiece;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'white';
				gameFinished();
			}
		}//Jump right king
		else if ((x == selected.x+2) && (y == selected.y+2) && (gridPiece.occupied == "") && selected.king)
		{
			jumped = getGridPiece(x-1, y-1);
			if (jumped.occupied.indexOf('red') == -1 && jumped.occupied != "")
			{
				jumpedCell = getGridCell(x-1, y-1);
				cell.innerHTML = "<div id=" + selected.occupied + "></div>";
				cell.onclick = movePiece;
				gridPiece.occupied = selected.occupied;
				gridPiece.king = selected.king;
				jumped.occupied = "";
				jumpedCell.innerHTML = "<div id=''></div>";
				jumpedCell.onclick = movePiece;
				selected.occupied = "";
				selected.king = false;
				selected.x = 0;
				selected.y = 0;
				turn = 'white';
				gameFinished();
			}
		}
	}
}

function gameFinished()
{
	var white_exists = false;
	var red_exists = false;
	for (var i = 0; i < grid.length; i++)
	{
		if (grid[i].occupied == 'checker-white' || grid[i].occupied == 'king-white')
		{
			white_exists = true;
		}
		else if (grid[i].occupied == 'checker-red' || grid[i].occupied == 'king-red')
		{
			red_exists = true;
		}
	}

	if (!white_exists)
	{
		alert('Red Wins!');
		location.reload(true);
	}
	else if (!red_exists)
	{
		alert('White Wins!');
		location.reload(true);
	}

	return false;
}

function getGridPiece(x, y)
{
	for (var i = 0; i < grid.length; i++)
	{
		if (grid[i].x == x && grid[i].y == y)
		{
			return grid[i];
		}
	}
}

function getGridCell(x, y)
{
	var board = document.getElementById('gamegrid');
	var gridTable = board.getElementsByTagName('table');
	return gridTable[0].rows[y].cells[x];
}

function openGrid()
{
	var width = 700;
	var height = 800;
	var x = screen.availWidth/2 - width/2;
	var y = screen.availHeight/2 - height/2;
	//w = window.open("grid.html", "Checkers", "width=" + width + ", height=" + height + ", status=yes, resizable=yes, left=" + x + ", top=" + y);
}

function closeGrid()
{
	w.close();
}

function login(username, password)
{
	url = 'http://universe.tc.uvu.edu/cs3550/assignments/PasswordCheck/check.php';
	var request = new XMLHttpRequest();
	request.open('POST', url, false);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send('userName=' + username + '&password=' + password);
	if (request.status == 200)
	{
		userName = eval('(' + request.responseText + ')');
	}
	if (userName.result == 'valid')
	{
		document.cookie = '3550timstamp=' + userName.userName + ' ' + userName.timestamp + '; max-age=' + (60*60*24*365);
		openGrid();
	}
	else
	{
		error = document.getElementById('login');
		error.innerHTML = 'Login failed. Please try again.';
	}
}

function load()
{
	var request = new XMLHttpRequest();
	request.open("GET", "xml/grid.xml", false);
	request.send(null);

	//Reset the grid.
	for (var i = 0; i < grid.length; i++)
	{
		grid[i].occupied = "";
	}

	var xmldoc = request.responseXML;

	var xmlrows = xmldoc.getElementsByTagName("grid");

	for (var r = 0; r < xmlrows.length; r++)
	{
		var xmlrow = xmlrows[r];
		var x = xmlrow.getElementsByTagName("x")[0].firstChild.data;
		var y = xmlrow.getElementsByTagName("y")[0].firstChild.data;
		var occupied;
		if (xmlrow.getElementsByTagName("occupied")[0].firstChild.data != "_")
		{
			occupied = xmlrow.getElementsByTagName("occupied")[0].firstChild.data;
			getGridPiece(x, y).occupied = occupied;
		}
	}

	var xmlrows = xmldoc.getElementsByTagName("game");
	white = xmlrows[0].getAttribute("white");
	setName('white', white);
	red = xmlrows[0].getAttribute("red");
	setName('red', red);
	turn = xmlrows[0].getAttribute("turn");
	
	var xmlrows = xmldoc.getElementsByTagName("selected");
	selected.x = xmlrows[0].getElementsByTagName("x")[0].firstChild.data;
	selected.y = xmlrows[0].getElementsByTagName("y")[0].firstChild.data;
	if (xmlrows[0].getElementsByTagName("occupied")[0].firstChild.data != "_")
	{
		selected.occupied = xmlrows[0].getElementsByTagName("occupied")[0].firstChild.data;
	}

	printGrid();
	addEvents()
}


