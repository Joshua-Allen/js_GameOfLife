// an array of all the posts as a url
var lifeCanvas = document.getElementById("lifeCanvas");
var AstarCanvas = document.getElementById("AstarCanvas");
var lightCanvas = document.getElementById("lightCanvas");

var ctx_life = lifeCanvas.getContext("2d");
var ctx_Astar = AstarCanvas.getContext("2d");
var ctx_light = lightCanvas.getContext("2d");

var current_canvas = lifeCanvas;
var current_context = ctx_life;

// life
var life = [];
var cellSize = 5;
var numCells_x = (lifeCanvas.width / cellSize);
var numCells_y = (lifeCanvas.height / cellSize);
var numberOfCells = numCells_x * numCells_y;

setInterval(render, 1000/30);

lifeStart();

// 
function lifeStart()
{
	for (i = 0; i < numberOfCells; i++) 
	{
		life[i] = (100*Math.random() < 10);
	}
}
function lifeGetCell(x, y)
{
	if (y < 0 || y > numCells_y) 
		return 0;
	if (x < 0 || x > numCells_x) 
		return 0;
	
	return life[x+y*numCells_x];
}
function lifeSetCell(array, x, y, val)
{
	array[x+y*numCells_x] = val;
}
function lifeUpdate()
{
	numCells_x = (lifeCanvas.width / cellSize);
	numCells_y = (lifeCanvas.height / cellSize);
	numberOfCells = numCells_x * numCells_y;
	
	var newlife = [];
	for (x = 0; x < numCells_x; x++) 
	{
		for (y = 0; y < numCells_y; y++) 
		{
			
			var c = lifeGetCell(x,y);
			
			var c1 = lifeGetCell(x-1,y-1);
			var c2 = lifeGetCell(x  ,y-1);
			var c3 = lifeGetCell(x+1,y-1);
			var c4 = lifeGetCell(x-1,y  );
			var c5 = lifeGetCell(x+1,y  );
			var c6 = lifeGetCell(x-1,y+1);
			var c7 = lifeGetCell(x  ,y+1);
			var c8 = lifeGetCell(x+1,y+1);
			
			var total = c1+c2+c3+c4+c5+c6+c7+c8;
			
			lifeSetCell(newlife, x, y, false);
			if (c){
				if (total < 2)
				{
					lifeSetCell(newlife, x, y, false);
				}
				if (total == 2 || total == 3)
				{
					lifeSetCell(newlife, x, y, true);
				}
				if (total > 3)
				{
					lifeSetCell(newlife, x, y, false);
				}
			} else {
				if (total == 3)
				{
					lifeSetCell(newlife, x, y, true);
				}
			}
		}
	}
	
	Array.prototype.splice.apply(life, [0, newlife.length].concat(newlife));
}
function render_life()
{
	var x = 0;
	var y = 0;
	
	for (i = 0; i < numberOfCells; i++) 
	{
		if (life[i])
		{
			draw_rect(x*cellSize,y*cellSize,cellSize,cellSize);
		}
		x++;
		if (x > numCells_x)
		{
			x = 0;
			y++;
			
		}
	}
}


//
function render()
{
	//
	ctx_life.clearRect(0, 0, lifeCanvas.width, lifeCanvas.height);
	ctx_Astar.clearRect(0, 0, AstarCanvas.width, AstarCanvas.height);
	ctx_light.clearRect(0, 0, lightCanvas.width, lightCanvas.height);
	
	//
	current_context = ctx_life;
	//draw_line(0, 0, lifeCanvas.width, lifeCanvas.height);
	lifeUpdate();
	render_life();
	
	//
	current_context = ctx_Astar;
	draw_line(0, 0, AstarCanvas.width, AstarCanvas.height);
	
	//
	current_context = ctx_light;
	draw_line(0, 0, lightCanvas.width, lightCanvas.height);
}


// draw helper
function draw_line(x1, y1, x2, y2)
{
	current_context.beginPath();
	current_context.moveTo(x1,y1);
	current_context.lineTo(x2,y2);
	current_context.stroke();
}

function draw_circle(x, y, r)
{
	current_context.beginPath();
	current_context.arc(x,y,r,0,2*Math.PI);
	current_context.stroke();
}

function draw_rect(x,y,width,height)
{
	current_context.fillRect(x,y,width,height);
}

function draw_point(x,y)
{
	current_context.fillRect(x,y,1,1);
}






















