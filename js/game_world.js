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
 * Constants
 */
var WIDTH = 1200;
var HEIGHT = 400;

//var gravity = 0.61;	/* Pluto */
//var gravity = 1.63;	/* Moon */
//var gravity = 3.73;	/* Mars */
//var gravity = 9.81;	/* Earth */
//var gravity = 11.19;	/* Saturn */
var gravity = 25.93;	/* Jupiter */

var rho = 1.2; /* Air */
//var rho = 1000; /* Water */

var CM_PER_PIXEL = 3; /* TODO convert from physical values to pixels */

var PAIN_DOTS = 10; /* percent per second */

var HEALTH_DOTS = 5;

/*
 * Variables
 */
var space;

/*
 * Functions
 */
function initWorld()
{
	/* Space! */
	space = new Object();
	
	space.bottom = groundImg.height;
	if (space.bottom == 0) { /* TODO: proper bug fix */
		space.bottom = 40;
	}
	//space.bottom = 0;
	
	space.top = boardCanvas.height;
	space.height = space.top - space.bottom;
	space.width = boardCanvas.width;
}
