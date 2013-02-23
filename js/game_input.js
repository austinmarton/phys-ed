/*
 * Copyright (C) 2013  Austin Boyle <boyle.austin@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * For a copy of the GNU General Public License see
 * <http://www.gnu.org/licenses/>.
 */

/*
 * User input class
 */
function userInput() {
	/* mouse */
	this.mouseX;
	this.mouseY;
	this.mouseX2;
	this.mouseY2;
	this.mouseDown = false;
	this.mouseDown2 = false;
	this.mouseMove = false;
	this.mouseMove2 = false;
	/* keys */
	this.left = false;
	this.right = false;
	this.up = false;
	this.down = false;
	/* controls */
	this.pause = false;
	this.modmode = false;

	boardCanvas.addEventListener("mousedown", boardClickDown, false);
	boardCanvas.addEventListener("mouseup", boardClickUp, false);
	viewCanvas.addEventListener("mousedown", boardClickDown2, false);
	viewCanvas.addEventListener("mouseup", boardClickUp2, false);
	document.onkeydown = keyDownHandler;
	document.onkeyup = keyUpHandler;
}

function findPos(obj) {
	var curleft = 0, curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return { x: curleft, y: curtop };
	}
	return undefined;
}

function boardClickDrag(e)
{
	var pos = findPos(this);

	var xClick = e.pageX - pos.x;
	var yClick = e.pageY - pos.y;

	input.mouseX = xClick;
	input.mouseY = boardCanvas.height - yClick;

	//window.alert("Clicked on X=" + xClick + " Y=" + yClick);

	input.mouseMove = true;
}

function boardClickDown(e)
{
	var pos = findPos(this);

	var xClick = e.pageX - pos.x;
	var yClick = e.pageY - pos.y;

	input.mouseX = xClick;
	input.mouseY = boardCanvas.height - yClick;

	//window.alert("Clicked on X=" + xClick + " Y=" + yClick);

	input.mouseDown = true;

	/* only care about mouse location while clicked */
	boardCanvas.addEventListener("mousemove", boardClickDrag, false);
}

function boardClickUp(e)
{
	input.mouseDown = false;

	//window.alert("Stopped clickin");

	input.mouseMove = false;

	/* only care about mouse location while clicked */
	boardCanvas.removeEventListener("mousemove", boardClickDrag, false);
}

function boardClickDrag2(e)
{
	var pos = findPos(this);

	var xClick = e.pageX - pos.x;
	var yClick = e.pageY - pos.y;

	input.mouseX2 = xClick;
	input.mouseY2 = boardCanvas.height - yClick;

	//window.alert("Clicked on X=" + xClick + " Y=" + yClick);

	input.mouseMove2 = true;
}

function boardClickDown2(e)
{
	var pos = findPos(this);

	var xClick = e.pageX - pos.x;
	var yClick = e.pageY - pos.y;

	input.mouseX2 = xClick;
	input.mouseY2 = boardCanvas.height - yClick;

	//window.alert("Clicked on X=" + xClick + " Y=" + yClick);

	input.mouseDown2 = true;

	/* only care about mouse location while clicked */
	viewCanvas.addEventListener("mousemove", boardClickDrag2, false);
}

function boardClickUp2(e)
{
	input.mouseDown2 = false;

	//window.alert("Stopped clickin");

	input.mouseMove2 = false;

	/* only care about mouse location while clicked */
	viewCanvas.removeEventListener("mousemove", boardClickDrag2, false);
}

function keyDownHandler(e)
{
	if (e.keyCode == 37) { /* left */
//		alert("left");
		input.left = true;
		if (input.modmode) {
			e.preventDefault();
			return false;
		}
	} else if (e.keyCode == 38) { /* up */
//		alert("up");
		input.up = true;
		if (input.modmode) {
			e.preventDefault();
			return false;
		}
	} else if (e.keyCode == 39) { /* right */
//		alert("right");
		input.right = true;
		if (input.modmode) {
			e.preventDefault();
			return false;
		}
	} else if (e.keyCode == 40) { /* down */
//		alert("down");
		input.down = true;
		if (input.modmode) {
			e.preventDefault();
			return false;
		}
	}
	return true;
}

function keyUpHandler(e)
{
	if (e.keyCode == 37) { /* left */
//		alert("left");
		input.left = false;
	} else if (e.keyCode == 38) { /* up */
//		alert("up");
		input.up = false;
	} else if (e.keyCode == 39) { /* right */
//		alert("right");
		input.right = false;
	} else if (e.keyCode == 40) { /* down */
//		alert("down");
		input.down = false;
	}
}

function pauseHandler(e)
{
	if (input.pause) {
		input.pause = false;
		pauseButton.value = "Pause";
	} else {
		input.pause = true;
		pauseButton.value = "Run";
	}
}

function modHandler(e)
{
	if (input.modmode) {
		input.modmode = false;
		modButton.value = "Mod Mode";
	} else {
		input.modmode = true;
		modButton.value = "Play Mode";
	}
}

function initInput()
{
	input = new userInput();

	//pauseButton.addEventListener("onmousedown", pauseHandler, false);
}

