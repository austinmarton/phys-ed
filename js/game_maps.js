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

/* 
 * helpers
 */
function createPlatform(x, y, siz_x, siz_y, img)
{
	var e = 0.999;
	var mass = 8;
	var pos = new vector(x, y);
	var size = new vector(siz_x, siz_y);
	objs_static.push(new SpriteStatic(pos, size, mass, e, img));
}

function createBgImage(x, y, siz_x, siz_y, img)
{
	var e = 0.999;
	var mass = 8;
	var pos = new vector(x, y);
	var size = new vector(siz_x, siz_y);
	var tmpSprite = new SpriteStatic(pos, size, mass, e, img);
	tmpSprite.tile = false;
	bg_images.push(tmpSprite);
}

function createGate(x, y, siz_x, siz_y, img)
{
	var e = 0.999;
	var mass = 8;
	var pos = new vector(x, y);
	var size = new vector(siz_x, siz_y);
	var tmpSprite = new SpriteStatic(pos, size, mass, e, img);
	tmpSprite.tile = false;
	gates.push(tmpSprite);
}

function createProjectile(x, y, v_x, v_y, a_x, a_y, rad, mass, img)
{
	var e = 0.999;
	var s = new vector(x, y);
	var v = new vector(v_x, v_y);
	var a = new vector(a_x, a_y);
	objs_dynamic.push(new SpriteDynamic(s, v, a, rad, mass, e, OBJ_BAD, img));
}

function createGoodie(x, y, v_x, v_y, a_x, a_y, rad, mass, img)
{
	var e = 0.9;
	var s = new vector(x, y);
	var v = new vector(v_x, v_y);
	var a = new vector(a_x, a_y);
	objs_dynamic.push(new SpriteDynamic(s, v, a, rad, mass, e, OBJ_GOOD, img));
}

/*
 * Maps
 */

/* Level one - getting to school */
function initLevelOne()
{	
	/* Player */
	if (player) {
		var pos = new vector(80, 150);
		player.updateState(pos, null_vector, null_vector, null_vector);
		updateViewReset();
	}
	
	/* Static objects */
	objs_static = new Array();
	createPlatform(520, 140, 75, 20, platformTreeImg);
	createPlatform(280, 100, 100, 20, platformCloudImg);
	createPlatform(140, 240, 20, 20, platformCloudImg);
	createPlatform(260, 200, 90, 20, platformCloudImg);
	/* Background images */
	bg_images = new Array();
	createBgImage(500, 140, 120, 100, treeImg);
	/* Ground */
	groundImg = platformBWImg;
	/* Gates */
	gates = new Array();
	createGate(900, 80, 20, 40, doorImg);
	
	/* Moving objects */
	objs_dynamic = new Array();
	/* Bad things */
	createProjectile(500, 130, -100, 0, 0, 0, SIZE_DOT*2, 20, ballImg);
	createProjectile(600, 130, -100, -26, 0, 0, SIZE_DOT, 10, ballImg);
	createProjectile(340, 65, 160, -26, 0, 0, SIZE_DOT, 10, ballImg);
	createProjectile(170, 265, -80, 40, 0, 0, SIZE_DOT, 10, ballImg);
	/* Goodies */
	createGoodie(150, 280, 0, 0, 0, 0, SIZE_DOT, 10, pineappleImg);
	createGoodie(300, 140, 0, 0, 0, 0, SIZE_DOT, 10, pineappleImg);
}

/* Level two - Dodgeball */
function initLevelTwo()
{
	/* Player */
	if (player) {
		player.move(80, 150);
		updateViewReset();
	}
	
	/* Static objects */
	objs_static = new Array();
	createPlatform(500, 150, 100, 20, gymFloorImg);
	createPlatform(280, 100, 100, 20, gymFloorImg);
	createPlatform(140, 240, 20, 20, gymFloorImg);
	createPlatform(260, 300, 90, 20, gymFloorImg);
	createPlatform(860, 290, 60, 20, gymFloorImg);
	createPlatform(690, 200, 90, 20, gymFloorImg);
	createPlatform(700, 100, 90, 20, gymFloorImg);
	/* Background images */
	bg_images = new Array();
	/* Ground */
	groundImg = gymFloorImg;
	/* Gates */
	gates = new Array();
	createGate(880, 330, 20, 40, doorImg);
	
	/* Moving objects */
	objs_dynamic = new Array();
	/* Bad things */
	createProjectile(500, 130, -100, 0, 0, 0, SIZE_DOT*2, 20, ballImg);
	createProjectile(600, 130, -100, -26, 0, 0, SIZE_DOT, 10, ballImg);
	createProjectile(340, 65, 160, -26, 0, 0, SIZE_DOT, 10, ballImg);
	createProjectile(170, 265, -80, 40, 0, 0, SIZE_DOT, 10, ballImg);
	/* Goodies */
	createGoodie(150, 280, 0, 0, 0, 0, SIZE_DOT, 10, pineappleImg);
	createGoodie(300, 140, 0, 0, 0, 0, SIZE_DOT, 10, pineappleImg);
}

/* Level three - lunch time */
function initLevelThree()
{
	/* Player */
	if (player) {
		player.move(80, 150);
		updateViewReset();
	}
	
	/* Static objects */
	objs_static = new Array();
	createPlatform(500, 150, 100, 20, platformImg);
	createPlatform(280, 100, 100, 20, platformImg);
	createPlatform(140, 240, 20, 20, platformImg);
	createPlatform(260, 300, 90, 20, platformImg);
	createPlatform(860, 290, 60, 20, platformImg);
	createPlatform(690, 200, 90, 20, platformImg);
	createPlatform(700, 100, 90, 20, platformImg);
	/* Background images */
	bg_images = new Array();
	/* Ground */
	groundImg = platformImg;
	/* Gates */
	gates = new Array();
	createGate(900, 80, 20, 40, doorImg);
	
	/* Moving objects */
	objs_dynamic = new Array();
	/* Bad things */
	createProjectile(500, 130, -100, 0, 0, 0, SIZE_DOT*2, 20, ballImg);
	createProjectile(600, 130, -100, -26, 0, 0, SIZE_DOT, 10, ballImg);
	createProjectile(340, 65, 160, -26, 0, 0, SIZE_DOT, 10, ballImg);
	createProjectile(170, 265, -80, 40, 0, 0, SIZE_DOT, 10, ballImg);
	/* Goodies */
	createGoodie(150, 280, 0, 0, 0, 0, SIZE_DOT, 10, pineappleImg);
	createGoodie(300, 140, 0, 0, 0, 0, SIZE_DOT, 10, pineappleImg);
}

/* Home time */
function initLevelFour()
{
	/* Level one backwards */
	initLevelOne();
	
	/* Player */
	if (player) {
		player.move(900, 150);
		player.v.x = -0.01;
		updateViewReset();
	}
	/* Gates */
	gates = new Array();
	createGate(80, 80, 20, 40, doorImg);
}

/* Finished the game */
function initLevelNone()
{
	/* Player */
	if (player) {
		var pos = new vector(80, 300);
		player.v.x = 0.01;
		player.updateState(pos, null_vector, null_vector, null_vector);
		updateViewReset();
	}
	
	/* Static objects */
	objs_static = new Array();
	createPlatform(260, 200, 90, 20, platformBWImg);
	/* Background images */
	bg_images = new Array();
	/* Ground */
	groundImg = platformBWImg;
	/* Gates */
	gates = new Array();
	createGate(900, 80, 20, 40, doorImg);
	
	/* Moving objects */
	objs_dynamic = new Array();
	/* Bad things */
	createProjectile(250, 230, 0, 0, 0, 0, SIZE_DOT, 10, ballImg);
	/* Goodies */
}
