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

B_AREA_BOX = 1;
B_AREA_CIRCLE = 2;

/*
 * Check if two circles are colliding
 */
function isCollidingCircle(vector1, radius1, vector2, radius2)
{
	var diff = new vector(0,0);
	diff.add(vector1);
	diff.sub(vector2);
	return (diff.hypotenuse() < (radius1 + radius2));
}

/*
 * Check if two boxes are colliding
 */
function isCollidingBox(pos1, size1, pos2, size2)
{
	return false;
}

/*
 * Check if a box and a circle are colliding
 */
function isCollidingBoxCircle(boxPos, boxSize, CirclePos, CircleRadius)
{
	if ((CirclePos.x+CircleRadius) > boxPos.x) {
		if ((CirclePos.x-CircleRadius) < (boxPos.x+boxSize.x)) {
			/* Horizontally aligned */
			if ((CirclePos.y+CircleRadius) > (boxPos.y-boxSize.y)) {
				if ((CirclePos.y-CircleRadius) < (boxPos.y)) {
					/* Vertically aligned */
					return true;
				}
			}
		}
	}
	return false;
}

/*
 * Check if two sprites are colliding
 */
function isCollidingSprite(sprite1, sprite2)
{
	if (sprite1.barea_type == sprite2.barea_type) {
		if (sprite1.barea_type == B_AREA_CIRCLE) {
			return isCollidingCircle(sprite1.s, sprite1.rad, sprite2.s, sprite2.rad);
		} else {
			return isCollidingBox(sprite1.s, sprite1.size, sprite2.s, sprite2.size);
		}
	} else {
		if (sprite1.barea_type == B_AREA_CIRCLE) {
			return isCollidingBoxCircle(sprite2.s, sprite2.size, sprite1.s, sprite1.rad);
		} else {
			return isCollidingBoxCircle(sprite1.s, sprite1.size, sprite2.s, sprite2.rad);
		}
	}
}

/*
 * Impulse class
 * @param F	force
 * @param t	time delta
 */
function Impulse(F, t) {
	this.F = F;
	this.t = t;
}

/*
 * Coefficient of resitution:
 * perfectly elastic collisions e=1 (conservation of energy)
 * perfectly inelastic collisions e=0 (objects connect)
 */
function calcResitutionCoef(obj1, obj2)
{
	return (obj1.e + obj2.e) / 2;
}
