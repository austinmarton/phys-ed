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
 * This file handles the boiler plate game engine loop
 * (Shouldn't need to be modified much once things are working.)
 */

// Get boardCanvas and context
var boardCanvas, boardContext;
var viewCanvas, viewContext;
var controlsCanvas, controlsContext;
//var boardCanvas = document.getElementById('boardCanvas');
//var context = boardCanvas.getContext('2d');
var pauseButton, modButton;

// Browser independent animation
var requestAnimationFrame = 
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	window.oRequestAnimationFrame;

var GAME_FPS = 60; // FPS
var GAME_PERIOD = (1000/GAME_FPS); // ms
var tPrev = Date.now();

var state;

function gameLoop()
{
	/* Recalculate time delta */
	var tNow = Date.now();
	var dt = tNow - tPrev;
	tPrev = tNow;

	/* DEBUG: Display game rate */
	$('#frameRate').html(Math.round(1000/dt) + " PS");

	/* evaluate logic */
	if (!input.pause) {
		state.gameLogic(dt);
	}

	/* repeat */
	var T = GAME_PERIOD - (Date.now() - tNow);
	/* DEBUG: Display game period */
	$('#framePeriod').html(Math.round(T) + " ms");
	setTimeout(gameLoop, T);
}

function initPageObjects()
{
	/* Get DOM objects */

	boardCanvas = document.getElementById('boardCanvas');
	boardContext = boardCanvas.getContext('2d');

	viewCanvas = document.getElementById('viewCanvas');
	viewContext = viewCanvas.getContext('2d');

	controlsCanvas = document.getElementById('controlsCanvas');
	controlsContext = controlsCanvas.getContext('2d');

	pauseButton = document.getElementById('pauseButton');
	modButton = document.getElementById('modButton');
}

function init()
{
	state = new GameState(GameState.STATES.TITLE_SCREEN);
	
	initPageObjects();

	state.initDraw();
	state.initWorld();
	state.initLogic();

	initInput();

	/* Start game loop */
	tPrev = Date.now();
	setTimeout(gameLoop, GAME_PERIOD);

	/* Start animation */
	requestAnimationFrame(gameDraw);
}
/* Run on page load */
window.onload = init;
