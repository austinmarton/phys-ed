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
 * Vector class
 */

function vector(x, y) {
	this.x = x;
	this.y = y;
};

vector.prototype.add = function(v) {
	this.x += v.x;
	this.y += v.y;
};

vector.prototype.sub = function(v) {
	this.x -= v.x;
	this.y -= v.y;
};

/**
 * @brief Overwrite existing value
 * @param x		new X coordinate
 * @param y		new Y coordinate
 */
vector.prototype.modify = function(x, y) {
	this.x = x;
	this.y = y;
};

/* dot product / scalar */
vector.prototype.dot = function(v) {
	return this.x*v.x + this.y*v.y;
};

/* cross product - 2D ONLY */
vector.prototype.cross = function(v) {
	return this.x*v.y + this.y*v.x;
};

/* scale */
vector.prototype.scale = function(c) {
	this.x *= c;
	this.y *= c;
};

/*
	Rotation matrix:
	[x'] = [cos(theta) -sin(theta)][x]
	[y']   [sin(theta)  cos(theta)][y]

	x' = x.cos(theta) - y.sin(theta)
	y' = x.sin(theta) + y.cos(theta)
 */
vector.prototype.rotate = function(theta) {
	this.x = this.x*Math.cos(theta) - this.y*Math.sin(theta);
	this.y = this.x*Math.sin(theta) + this.y*Math.cos(theta);
};

vector.prototype.heading = function() {
	return Math.atan(this.y/this.x);
};

vector.prototype.hypotenuse = function() {
	return Math.sqrt(this.x*this.x + this.y*this.y);
};

vector.prototype.clone = function() {
	return new vector(this.x, this.y);
};

vector.prototype.projection = function(B) {
	var a = this.clone();
	var b = B.clone();
	var num = a.dot(b);
	var den = b.dot(b);
	b.scale(num/den);
	return b;
};

vector.prototype.rejection = function(B) {
	var aRej = this.clone();
	var a = this.clone();
	var aProj = a.projection(B);
	aRej.sub(aProj);
	return aRej;
};

var null_vector = new vector(0, 0);
