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
 * Static sprite class
 */

function SpriteStatic(S, size, mass, e, image) {

	this.mass = mass;
	this.s = new vector(S.x, S.y);
	this.size = new vector(size.x, size.y);
	this.e = e;
	this.img = image;
	this.player = 0;
	this.barea_type = B_AREA_BOX;

	this.frame = 0;
	this.isColliding = false;
	this.newCollision = false;
}

SpriteStatic.prototype.move = function(toX,toY) {
	this.s.x = toX;
	this.s.y = toY;
};

SpriteStatic.prototype.updateState = function(S, V, A) {
	this.s.x = S.x;
	this.s.y = S.y;
	this.v.x = V.x;
	this.v.y = V.y;
	this.a.x = A.x;
	this.a.y = A.y;
};

SpriteStatic.prototype.setColliding = function(isColliding) {
	if (isColliding) {
		this.isColliding = true;
	} else {
		this.isColliding = false;
	}
};

SpriteStatic.prototype.draw = function(context, canvas) {
						/* image, sx, sy, sw, sh, dx, dy, dw, dh */
	context.drawImage(this.img, 0, 0, this.img.width, this.img.height, this.s.x - canvas.offset.x, canvas.height-this.s.y + canvas.offset.y, this.size.x, this.size.y);
	//context.drawImage(this.img, this.s.x, this.s.y);
};
