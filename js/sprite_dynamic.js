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
 * Dynamic Sprite class
 * 
 * @param S			Initial position vector
 * @param V			Initial velocity vector
 * @param A			Initial acceleration vector
 * @param radius	Radius
 * @param mass		Mass in kg
 * @param e			"bounciness"
 * @param bad		True for bad, false for good
 */

function SpriteDynamic(S, V, A, radius, mass, e, bad, image) {

	this.rad = radius;
	this.mass = mass;
	this.s = new vector(S.x, S.y);
	this.v = new vector(V.x, V.y);
	this.a = new vector(A.x, A.y);
	this.e = e;
	this.player = 0;
	this.barea_type = B_AREA_CIRCLE;
	this.area = 0.01;
	this.bad = bad;

	this.frame = 0;
	if (this.bad) {
		this.colour = COLOUR.DOT_BAD;
	} else {
		this.colour = COLOUR.DOT_GOOD;
	}
	this.img = image;
	this.isColliding = false;
	this.newCollision = false;
	this.j = new Array(); /* impuses */
}

SpriteDynamic.prototype.move = function(toX,toY) {
	this.s.x = toX;
	this.s.y = toY;
};

SpriteDynamic.prototype.updateState = function(S, V, A) {
	this.s.x = S.x;
	this.s.y = S.y;
	this.v.x = V.x;
	this.v.y = V.y;
	this.a.x = A.x;
	this.a.y = A.y;
};

/**
 * Rotate
 * @param[in]	angleRad	Rotation angle in radians
 */
SpriteDynamic.prototype.rotate = function(angleRad) {
	this.h = iHeading * angleRad;
};

SpriteDynamic.prototype.updateHeading = function(headingRad) {
	this.h = headingRad;
};

SpriteDynamic.prototype.setColliding = function(isColliding) {
	if (isColliding) {
		this.colour = COLOUR.DOT_COLLISION;
		this.isColliding = true;
	} else {
		if (this.bad) {
			this.colour = COLOUR.DOT_BAD;
		} else {
			this.colour = COLOUR.DOT_GOOD;
		}
		this.isColliding = false;
	}
};

SpriteDynamic.prototype.draw = function(context, canvas) {

	/*
	if (this.bad) {
		context.fillStyle = this.colour;
		context.beginPath();
		context.arc(this.s.x - canvas.offset.x, canvas.height-this.s.y + canvas.offset.y, this.rad, 0, Math.PI*2, true);
		context.closePath();
		context.fill();
	} else {
	*/
		/* image, sx, sy, sw, sh, dx, dy, dw, dh */
	context.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.s.x-this.rad - canvas.offset.x, canvas.height-this.s.y-this.rad + canvas.offset.y, this.rad*2, this.rad*2);
	//}

	/* draw dot
	context.fillStyle = COLOUR.DOT2;
	context.beginPath();
	if (this.v.x < 0) {
		context.arc(this.s.x-this.rad/3, canvas.height-this.s.y-this.rad/3, this.rad/4, 0, Math.PI*2, true);
	} else {
		context.arc(this.s.x+this.rad/3, canvas.height-this.s.y-this.rad/3, this.rad/4, 0, Math.PI*2, true);
	}
	context.closePath();
	context.fill();
	*/
	this.frame = (++this.frame) % 100;
};

