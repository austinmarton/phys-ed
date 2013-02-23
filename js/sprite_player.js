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
 * Dot class
 */

var HEALTH_MAX = 100;

function SpritePlayer(S, V, A, radius, mass, e) {

	//this.rad = radius;
	this.mass = mass;
	this.s = new vector(S.x, S.y);
	this.v = new vector(V.x, V.y);
	this.a = new vector(A.x, A.y);
	this.frame = 0;
	this.frameCounter = 0;
	this.e = e;
	this.player = true;
	this.jumping = false;
	this.foot_sense = false;
	this.barea_type = B_AREA_CIRCLE;
	
	this.health = HEALTH_MAX; /* percent */ /* self respect? */ 
	this.pain = 0; /* rate of health decrease in % per second */

	this.imageRight = loadImage("images/dropman_right.png");
	this.imageLeft = loadImage("images/dropman_left.png");
	this.image = this.imageRight; // init
//	this.image.width;
//	this.image.height;

	this.rad = (this.image.height/2)/2;
	if (this.rad == 0) { /* TODO: proper bug fix */
		this.rad = 23;
	}
	this.area = 0.01;

	this.isColliding = false;
	this.newCollision = false;
	this.j = new Array(); /* impuses */
}

SpritePlayer.prototype.move = function(toX,toY) {
	this.s.x = toX;
	this.s.y = toY;
};

SpritePlayer.prototype.updateState = function(S, V, A) {
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
SpritePlayer.prototype.rotate = function(angleRad) {
	this.h = iHeading * angleRad;
};

SpritePlayer.prototype.updateHeading = function(headingRad) {
	this.h = headingRad;
};

SpritePlayer.prototype.draw = function(context, canvas, frameNum) {

	/*
	context.fillStyle = COLOUR.DOT;
	context.beginPath();
	context.arc(this.s.x, canvas.height-this.s.y, this.rad, 0, Math.PI*2, true);
	context.closePath();
	context.fill();

	// draw face
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


//	context.drawImage(this.image, this.image.width/4 * this.frame, 0, this.image.width/4, this.image.height, this.s.x, canvas.height-this.s.y, this.image.width/4, this.image.height);

	var iSpriteCount = 4;
	var iScale = 2;
	var iWid = (this.image.width/iScale)/iSpriteCount;
	var iHei = this.image.height/iScale;

	if (this.v.x > 0) {
		this.image = this.imageRight;
	} else if (this.v.x < 0) {
		this.image = this.imageLeft;
	}

	context.drawImage(this.image, this.image.width/iSpriteCount * this.frame, 0, this.image.width/iSpriteCount, this.image.height, this.s.x-iWid/2 - canvas.offset.x, canvas.height-this.s.y-iHei/2 + canvas.offset.y, iWid, iHei);

	if (this.v.x || this.v.y) { /* walk if moving */
		this.frameCounter = (++this.frameCounter) % 100;
		if ((this.frameCounter % 10) == 0) {
			this.frame = (++this.frame) % iSpriteCount;
		}
	}
};

SpritePlayer.prototype.setColliding = function(isColliding) {
	if (isColliding) {
		this.isColliding = true;
	} else {
		this.isColliding = false;
	}
};

/* pain is the rate of health decrease */
SpritePlayer.prototype.updateHealth = function(dt) {
	var dt_s = (dt/1000);
	this.health -= dt_s*this.pain;
	if (this.health < 0) {
		this.health = 0;
	}
};

