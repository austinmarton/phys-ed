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
 * This file handles the game levels
 */

function createPlatform()
{
	
}

/*
 * Maps
 */

function initLevelOne()
{	
	/*
	 * Player
	 */
	if (player) {
		var pos = new vector(80, 150);
		player.updateState(pos, null_vector, null_vector, null_vector);
		updateViewReset();
	}
	
	/*
	 * Static objects 
	 */
	
	objs_static = new Array();
	
	var objTemp;
	var size = new vector(75, 20);
	var pos = new vector(520, 140);
	var e = 0.999;
	var mass = 8;
	
	objTemp = new SpriteStatic(pos, size, mass, e, platformTreeImg);
	objs_static.push(objTemp);

	size.modify(100, 20);
	pos.modify(280, 100);
	objTemp = new SpriteStatic(pos, size, mass, e, platformImg);
	objs_static.push(objTemp);
	
	pos.modify(140, 240);
	size.modify(20, 20);
	objTemp = new SpriteStatic(pos, size, mass, e, platformImg);
	objs_static.push(objTemp);
	
	pos.modify(260, 200);
	size.modify(90, 20);
	objTemp = new SpriteStatic(pos, size, mass, e, platformImg);
	objs_static.push(objTemp);

	/*
	 * Background images
	 */
	bg_images = new Array();
	
	size.modify(120, 100);
	pos.modify(500, 140);
	objTemp = new SpriteStatic(pos, size, mass, e, treeImg);
	bg_images.push(objTemp);
	
	/* ground *
	pos.modify(0, 50);
	size.modify(boardCanvas.width, 50);
	objTemp = new SpriteStatic(pos, size, mass, e);
	objs_static.push(objTemp); */

	/* ground */
	groundImg = platformImg;
	
	/*
	 * Gates
	 */
	gates = new Array();
	
	size.modify(20, 40);
	pos.modify(900, 80);
	
	objTemp = new SpriteStatic(pos, size, mass, e, doorImg);
	gates.push(objTemp);
	
	/*
	 * Moving objects
	 */

	e = 0.999;
	mass = 10;
	var S = new vector(250, 230.0);
	var V = new vector(100.0, 0.0);
//	V.rotate(-Math.PI/4);
	var A = new vector(0.0, 0.0);

	/* Array of dots */
	objs_dynamic = new Array();

	var dotTemp;
			/* S, V, A, radius, mass */
	dotTemp = new SpriteDynamic(S, V, A, SIZE_DOT, mass, e, OBJ_BAD, ballImg);
//	objs_dynamic.push(dotTemp);
	
	S.x = 500;
	S.y -= 10;
	V.x = -100;
	dotTemp = new SpriteDynamic(S, V, A, SIZE_DOT*2, mass*2, e, OBJ_BAD, ballImg);
	objs_dynamic.push(dotTemp);

	S.x += 100;
	V.y = -26;
	dotTemp = new SpriteDynamic(S, V, A, SIZE_DOT, mass, e, OBJ_BAD, ballImg);
	objs_dynamic.push(dotTemp);

	S.scale(0.5);
	S.x += 40;
	S.y -= 100;
	V.modify(160, 0);
	dotTemp = new SpriteDynamic(S, V, A, SIZE_DOT, mass, e, OBJ_BAD, ballImg);
	objs_dynamic.push(dotTemp);

	S.scale(0.5);
	S.y += 200;
	V.modify(-80, 40);
	dotTemp = new SpriteDynamic(S, V, A, SIZE_DOT, mass, e, OBJ_BAD, ballImg);
	objs_dynamic.push(dotTemp);

	/* Goodies */
	
	e = 0.9;

	S.modify(150, 280);
	V.modify(0,0);
	A.modify(0,0);
	dotTemp = new SpriteDynamic(S, V, A, SIZE_DOT, mass, e, OBJ_GOOD, pineappleImg);
	objs_dynamic.push(dotTemp);
	
	S.modify(300, 140);
	V.modify(0,0);
	A.modify(0,0);
	dotTemp = new SpriteDynamic(S, V, A, SIZE_DOT, mass, e, OBJ_GOOD, pineappleImg);
	objs_dynamic.push(dotTemp);
}


function initLevelTwo()
{
	/*
	 * Player
	 */
	if (player) {
		player.move(80, 150);
		updateViewReset();
	}
	
	/*
	 * Static objects 
	 */
	
	objs_static = new Array();
	
	var objTemp;
	var size = new vector(100, 20);
	var pos = new vector(500, 150);
	var e = 0.999;
	var mass = 8;
	
	objTemp = new SpriteStatic(pos, size, mass, e, platformImg);
	objs_static.push(objTemp);

	pos.modify(280, 100);
	objTemp = new SpriteStatic(pos, size, mass, e, platformImg);
	objs_static.push(objTemp);
	
	pos.modify(140, 240);
	size.modify(20, 20);
	objTemp = new SpriteStatic(pos, size, mass, e, platformImg);
	objs_static.push(objTemp);
	
	pos.modify(260, 300);
	size.modify(90, 20);
	objTemp = new SpriteStatic(pos, size, mass, e, platformImg);
	objs_static.push(objTemp);
	
	pos.modify(860, 290);
	size.modify(60, 20);
	objTemp = new SpriteStatic(pos, size, mass, e, platformImg);
	objs_static.push(objTemp);
	
	pos.modify(690, 200);
	size.modify(90, 20);
	objTemp = new SpriteStatic(pos, size, mass, e, platformImg);
	objs_static.push(objTemp);
	
	pos.modify(700, 100);
	size.modify(90, 20);
	objTemp = new SpriteStatic(pos, size, mass, e, platformImg);
	objs_static.push(objTemp);
	
	/* ground */
	groundImg = platformImg;
	
	/*
	 * Gates
	 */
	gates = new Array();
	
	size.modify(20, 40);
	pos.modify(900, 80);
	
	objTemp = new SpriteStatic(pos, size, mass, e, doorImg);
	gates.push(objTemp);
	
	/*
	 * Moving objects
	 */

	e = 0.999;
	mass = 10;
	var S = new vector(250, 230.0);
	var V = new vector(100.0, 0.0);
//	V.rotate(-Math.PI/4);
	var A = new vector(0.0, 0.0);

	/* Array of dots */
	objs_dynamic = new Array();

	var dotTemp;
			/* S, V, A, radius, mass */
	dotTemp = new SpriteDynamic(S, V, A, SIZE_DOT, mass, e, OBJ_BAD, ballImg);
//	objs_dynamic.push(dotTemp);
	
	S.x = 500;
	S.y -= 10;
	V.x = -100;
	dotTemp = new SpriteDynamic(S, V, A, SIZE_DOT*2, mass*2, e, OBJ_BAD, ballImg);
	objs_dynamic.push(dotTemp);

	S.x += 100;
	V.y = -26;
	dotTemp = new SpriteDynamic(S, V, A, SIZE_DOT, mass, e, OBJ_BAD, ballImg);
	objs_dynamic.push(dotTemp);

	S.scale(0.5);
	S.x += 40;
	S.y -= 100;
	V.modify(160, 0);
	dotTemp = new SpriteDynamic(S, V, A, SIZE_DOT, mass, e, OBJ_BAD, ballImg);
	objs_dynamic.push(dotTemp);

	S.scale(0.5);
	S.y += 200;
	V.modify(-80, 40);
	dotTemp = new SpriteDynamic(S, V, A, SIZE_DOT, mass, e, OBJ_BAD, ballImg);
	objs_dynamic.push(dotTemp);

	/* Goodies */
	
	e = 0.9;

	S.modify(150, 280);
	V.modify(0,0);
	A.modify(0,0);
	dotTemp = new SpriteDynamic(S, V, A, SIZE_DOT, mass, e, OBJ_GOOD, pineappleImg);
	objs_dynamic.push(dotTemp);
	
	S.modify(300, 140);
	V.modify(0,0);
	A.modify(0,0);
	dotTemp = new SpriteDynamic(S, V, A, SIZE_DOT, mass, e, OBJ_GOOD, pineappleImg);
	objs_dynamic.push(dotTemp);
}


function initLevelNone()
{
	/*
	 * Player
	 */
	if (player) {
		var pos = new vector(80, 300);
		player.updateState(pos, null_vector, null_vector, null_vector);
		updateViewReset();
	}
	
	/*
	 * Static objects 
	 */
	
	objs_static = new Array();
	
	var objTemp;
	var size = new vector(100, 20);
	var pos = new vector(500, 150);
	var e = 0.999;
	var mass = 8;

	pos.modify(260, 200);
	size.modify(90, 20);
	objTemp = new SpriteStatic(pos, size, mass, e, platformBWImg);
	objs_static.push(objTemp);
	
	/*
	 * Background images
	 */
	bg_images = new Array();
	
	/* ground */
	groundImg = platformBWImg;
	
	/*
	 * Gates
	 */
	gates = new Array();
	
	/*
	 * Moving objects
	 */

	objs_dynamic = new Array();

	var S = new vector(250, 230);
	var V = null_vector;
	var A = null_vector;

	objTemp = new SpriteDynamic(S, V, A, SIZE_DOT, mass, e, OBJ_BAD, ballImg);
	objs_dynamic.push(objTemp);
}
