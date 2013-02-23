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
 * This file handles the game logic
 */

var player;
var objs_static;
var objs_dynamic;
var gates;
var bg_images;

var OBJ_BAD = true;
var OBJ_GOOD = false;

/*
 * Run once at start
 */
function initLogic()
{
	/*
	 * Player
	 */
	
	var S = new vector(80, 150);
	var V = new vector(0, 0);
	var A = new vector(0, 0);
	var mass = 10;
	var e = 0;
	player = new SpritePlayer(S, V, A, SIZE_DOT, mass, e);

	/*
	 * Level
	 */

	objs_static = new Array();
	objs_dynamic = new Array();
	gates = new Array();
	bg_images = new Array();
	
	//state.initLevel();
	//initLevelTwo();
}

/*
 * Update physics for single object
 */
function gameUpdateObjectPhysics(obj, dt)
{
	var dt_s = (dt/1000);
	var dotS = new vector(obj.s.x, obj.s.y);
	var dotV = new vector(obj.v.x, obj.v.y);
	//var dotA = new vector(obj.a.x, obj.a.y);
	//var dotH = obj.v.heading();

	/*
	 * Update physics
	 */

	if (obj.player) {
		var Fuser = new vector(0, 0);
		if (input.left) {
			var F;
			if (obj.foot_sense) {
				F = -400;
			} else {
				F = -200;
			}
			Fuser.add(new vector(F, 0));
		}
		if (input.right) {
			var F;
			if (obj.foot_sense) {
				F = 400;
			} else {
				F = 200;
			}
			Fuser.add(new vector(F, 0));
		}
		if (input.up && obj.foot_sense) {
			//Fuser.add(new vector(0, 400));
			var F = new vector(0, 38000);
			var t = 180; // ms?
			obj.j.push(new Impulse(F, t));
		}
		if (input.down) {
			Fuser.add(new vector(0, -400));
		}
	}

	/* Gravity force, Fg = m.a */
	/* gravity defined in game_world.js */
	var gravityA = new vector(0, -gravity);
	var Fg = gravityA;
	Fg.scale(obj.mass);

	/* Drag force (wind resistance), Fd = 1/2.rho.v^2.Cd.A */
	/* rho defined in game_world.js */
	var Cd = 0.47; /* Sphere */
	var A = obj.area; /* Reference area - approx orthogonal projection */
	var Fd = new vector(dotV.x, dotV.y);
	Fd.dot(Fd);
	Fd.scale(-(1/2) * rho * Cd * A);

	/* Sum forces */
	var Fsum = new vector(0, 0);

	Fsum.add(Fg);
	Fsum.add(Fd);
	if (obj.player) {
		Fsum.add(Fuser);
	}

	/* Impulses */
	var jRemaining = new Array();
	var j;
	while ((j = obj.j.pop())) {
		if (j.t > 0) {
			Fsum.add(j.F);
			j.t -= dt;
		} else {
			jRemaining.push(j);
		}
	}
	obj.j = jRemaining;

	/* F = m.a */
	/* a = F / m */
	var dotA = new vector(0, 0);
	dotA.add(Fsum);
	dotA.scale(1/obj.mass);

	/* v = u + a.t */
	var temp = new vector(dotA.x, dotA.y);
	temp.scale(dt_s);
	dotV.add(temp);

	/* s = v.t + a.t^2 */
	// (ms / (ms / s)) * (px / s) = px
	temp = new vector(dotV.x, dotV.y);
	temp.scale(dt_s);
	dotS.add(temp);

	temp = new vector(dotA.x, dotA.y);
	temp.scale(dt_s*dt_s);
	dotS.add(temp);

	/*
	 * Collision detection
	 */

	/* Ground, roof, walls */

	if (dotS.x + obj.rad > space.width) { /* right wall */
		dotS.x = space.width - obj.rad; // don't get stuck in wall
		dotV.x = -dotV.x * obj.e; // dampening
	} else if (dotS.x - obj.rad < 0) { /* left wall */
		dotS.x = obj.rad; // don't get stuck in wall
		dotV.x = -dotV.x * obj.e; // dampening
	}

	if (dotS.y + obj.rad > space.top) { /* top */
		dotS.y = space.top - obj.rad; // don't get stuck in wall
		dotV.y = -dotV.y * obj.e; // dampening
	} else if (dotS.y - obj.rad < space.bottom) { /* bottom */
		if (obj.player) {
			obj.foot_sense = true;
		}
		dotS.y = space.bottom + obj.rad; // don't get stuck in wall
		dotV.y = -dotV.y * obj.e; // dampening
	} else {
		if (obj.player) {
			obj.foot_sense = false;
		}		
	}

	/* 
	 * User input - move dot
	 */
	if (obj.player && input.mouseDown) {
		//dotS.x = input.mouseX;
		//dotS.y = input.mouseY;
		var offset = viewCanvas.offset.clone();
		if (input.mouseX - viewCanvas.width/2 > 0 && input.mouseX + viewCanvas.width/2 < space.width) {
			offset.x = input.mouseX - viewCanvas.width/2;
		}
		if (input.mouseY - viewCanvas.height/2 > 0 && input.mouseY + viewCanvas.height/2 < space.top) {
			offset.y = input.mouseY - viewCanvas.height/2;
		}
		viewCanvas.offset.modify(offset.x, offset.y);
		
		/* reload page if player is dead! weird I know... */
		if (obj.health == 0) {
			window.location.reload(false);
		}
	}

	/*
	 * Update objects
	 */
	//if (obj.h != dotH) {
	//	obj.updateHeading(dotH);
	//}
	//obj.move(dotS.x, dotS.y);

	obj.updateState(dotS, dotV, dotA);

	//$('#dotHeading').html("h=" + Math.round(180 * obj.h / Math.PI) + " x=" + Math.round(obj.s.x) + " y=" + Math.round(obj.s.y) + " x=" + Math.round(dotS.x) + " y=" + Math.round(dotS.y));
}

/* Collision detection */
function gameCollisionDetection()
{
	/*
	 * Dynamic sprites
	 */
	
	/* dots */

	var remaining = objs_dynamic.slice(); /* copy to modify */
	var current;
	var other;

	for (var i = 0; i < remaining.length; i++) {
		remaining[i].newCollision = false;
	}

	while ((current = remaining.pop())) {
		for (var i = 0; i < remaining.length; i++) {
			other = remaining[i];
			if (isCollidingSprite(current, other)) {

				var a = current;
				var b = other;

				var norm = new vector(0,0);
				norm.add(b.s);
				norm.sub(a.s);

				var e = calcResitutionCoef(a,b);

				/* calculate projection of V onto norm - which is direction force acts */
				
				var Vai = a.v.clone();
				var Vai_p = Vai.projection(norm);
				var Vai_r = Vai.rejection(norm);
				//Vai_r.scale(-1);
				var Vbi = b.v.clone();
				var Vbi_p = Vbi.projection(norm);
				var Vbi_r = Vbi.rejection(norm);
				Vbi_r.scale(-1);
				//Vai.modify(Vai_p.x, Vai_p.y);
				//Vbi.modify(Vbi_r.x, Vai_p.y);

				/* 
				 * F = m.a
				 * j = F.t
				 * j = m.dv
				 *
				 * t = m.dv / F
				 *   = m.dv / m.a
				 *   = dv / a
				 */

				var Vaf = new vector(0,0);
				/* Vaf = Vai*((Ma - e.Mb)/(Ma+Mb)) + Vbi*(e+1)*(Mb/(Ma+Mb)) */
				/* Vaf = Vai_rej*((Ma - e.Mb)/(Ma+Mb)) + Vbi_proj*(e+1)*(Mb/(Ma+Mb)) */
				var temp1 = Vai_r.clone();
				temp1.scale((a.mass - e*b.mass)/(a.mass + b.mass));
				/* p */
				var temp2 = Vbi_p.clone();
				temp2.scale((e+1)*(b.mass/(a.mass + b.mass)));
				Vaf.add(temp1);
				Vaf.add(temp2);

				Vbf = new vector(0,0);
				/* Vbf = Vbi*((Mb - e.Ma)/(Ma+Mb)) + Vai*(e+1)*(Ma/(Ma+Mb)) */
				/* Vbf = Vbi_rej*((Mb - e.Ma)/(Ma+Mb)) + Vai_proj*(e+1)*(Ma/(Ma+Mb)) */
				temp1 = Vbi_r.clone();
				temp1.scale((b.mass - e*a.mass)/(a.mass + b.mass));
				temp2 = Vai_p.clone();
				temp2.scale((e+1)*(a.mass/(a.mass + b.mass)));
				Vbf.add(temp1);
				Vbf.add(temp2);

				a.v.modify(Vaf.x, Vaf.y);
				b.v.modify(Vbf.x, Vbf.y);

				/*
				var F = other.a.clone();
				F.scale(other.mass);
				F.scale(-1);
				var t = 100; // ms?
				current.j.push(new Impulse(F, t));
*/

				current.setColliding(true);
				current.newCollision = true;

				other.setColliding(true);
				other.newCollision = true;
/*
				var F2 = current.a.clone();
				F2.scale(current.mass);
				F2.scale(-1);
				other.j.push(new Impulse(F2, t));
				*/
			}
		}
		if (!current.newCollision) {
			current.setColliding(false);
		}
	}
	
	/* player */
	player.newCollision = false;
	for (var j = 0; j < objs_dynamic.length; j++) {
		var b = objs_dynamic[j];
		if (isCollidingSprite(player, b)) {
			player.newCollision = true;
			if (b.bad) { /* Bad object! */
				/* pain is the rate of health decrease */
				player.pain = PAIN_DOTS;			
			} else { /* Good object! */ 
				
				if (player.health + HEALTH_DOTS > HEALTH_MAX) {
					player.health = HEALTH_MAX;
				} else {
					player.health += HEALTH_DOTS;	
				}
				objs_dynamic.splice(j);
			}
		}
	}
	
	if (!player.newCollision) {
		player.pain = 0;
	}

	/*
	 * Static sprites
	 */
	
	/* dots */
	for (var i = 0; i < objs_dynamic.length; i++) {
		for (var j = 0; j < objs_static.length; j++) {
			var a = objs_dynamic[i];
			var b = objs_static[j];
			if (isCollidingSprite(a, b)) {

				a.setColliding(true);

				if (a.v.x > 0 && a.s.x <= b.s.x) { /* left wall */
					//a.s.x = b.s.x - a.rad; // don't get stuck in wall
					a.v.x = -a.v.x * a.e; // dampening
				} else if (a.v.x < 0 && a.s.x >= b.s.x + b.size.x) { /* right wall */
					//a.s.x = b.s.x + b.size.x + a.rad; // don't get stuck in wall
					a.v.x = -a.v.x * a.e; // dampening
				}
				
				if (a.v.y < 0 && a.s.y >= b.s.y) { /* top */
					//a.s.y = b.s.y + a.rad; // don't get stuck in wall
					a.v.y = -a.v.y * a.e; // dampening
				} else if (a.v.y > 0 && a.s.y <= b.s.y + b.size.y) { /* bottom */
					//a.s.y = b.s.y - b.size.y - a.rad; // don't get stuck in wall
					a.v.y = -a.v.y * a.e; // dampening
				}
				
			}
		}
	}	
	
	/* player */
	for (var j = 0; j < objs_static.length; j++) {
		var a = player;
		var b = objs_static[j];
		if (isCollidingSprite(a, b)) {

			if (a.v.x > 0 && a.s.x /*+ a.rad*/ <= b.s.x) { /* left wall */
				a.s.x = b.s.x - a.rad; // don't get stuck in wall
				a.v.x = -a.v.x * a.e; // dampening
			} else if (a.v.x < 0 && a.s.x /*- a.rad*/ >= b.s.x + b.size.x) { /* right wall */
				a.s.x = b.s.x + b.size.x + a.rad; // don't get stuck in wall
				a.v.x = -a.v.x * a.e; // dampening
			} else if (a.v.y < 0 && a.s.y /*+ a.rad*/ >= b.s.y) { /* top */
				a.s.y = b.s.y + a.rad; // don't get stuck in wall
				a.v.y = -a.v.y * a.e; // dampening
				a.foot_sense = true;
			} else if (a.v.y > 0 && a.s.y /*- a.rad*/ <= b.s.y + b.size.y) { /* bottom */
				a.s.y = b.s.y - b.size.y - a.rad; // don't get stuck in wall
				a.v.y = -a.v.y * a.e; // dampening
			}
		}
	}
	
	/*
	 * Gates
	 */
	for (var j = 0; j < gates.length; j++) {
		var a = player;
		var b = gates[j];
		if (isCollidingSprite(a, b)) {
			state.levelComplete = true; // debug
		}
	}

}

function updateViewFocus()
{
	var offset = viewCanvas.offset.clone();
	if (player.s.x - viewCanvas.width/2 > 0 && player.s.x + viewCanvas.width/2 < space.width) {
		offset.x = player.s.x - viewCanvas.width/2;
	}
	if (player.s.y - viewCanvas.height/2 > 0 && player.s.y + viewCanvas.height/2 < space.top) {
		offset.y = player.s.y - viewCanvas.height/2;
	}
	viewCanvas.offset.modify(offset.x, offset.y);	
}

function updateViewReset()
{
	viewCanvas.offset.modify(0, 0);	
}

/*
 * Run every game loop
 */
function gameLogic(dt)
{
	if (player.health <= 0) {
		state = new GameState(GameState.STATES.DEAD);
	}
	
	/* Update physics */

	for (var i = 0; i < objs_dynamic.length; i++) {
		gameUpdateObjectPhysics(objs_dynamic[i], dt);
	}

	gameUpdateObjectPhysics(player, dt);

	gameUpdateDebug(dt);

	/* Collision detection/response */

	gameCollisionDetection();

	player.updateHealth(dt);

	updateViewFocus();
	
	if (state.levelComplete) {
		state = stateTransition(+1);
	}
}

function gameLogicTitle(dt)
{
	/*
	 * User click screen to start
	 */
	if (input.mouseDown2 || input.left || input.right || 
								input.up || input.down) {
		state = stateTransition(+1);
	}
}


/* 
 * Update debug status
 */
function gameUpdateDebug(dt)
{
/*
	if (input.modmode) {
		$('#debugControls').show();
	} else {
		$('#debugControls').hide();
	}
*/
	if (input.modmode) { /* Mod mode */
		document.bgColor = COLOUR.BG_DEBUG;
		document.getElementById('debugControls').style.display = "";
		document.getElementById('boardCanvas').style.display = "";
	} else { /* Play mode */
		document.bgColor = COLOUR.BG_PLAY;
		document.getElementById('debugControls').style.display = "none";
		document.getElementById('boardCanvas').style.display = "none";
	}

	var obj = objs_dynamic[0]
	$('#debug_sX').html(Math.round(obj.s.x));
	$('#debug_sY').html(Math.round(obj.s.y));
	$('#debug_vX').html(Math.round(obj.v.x));
	$('#debug_vY').html(Math.round(obj.v.y));
	$('#debug_aX').html(Math.round(obj.a.x));
	$('#debug_aY').html(Math.round(obj.a.y));
	//$('#debug_fX').html(Math.round(Fsum.x));
	//$('#debug_fY').html(Math.round(Fsum.y));

	$('#debug_mouseX').html(Math.round(input.mouseX));
	$('#debug_mouseY').html(Math.round(input.mouseY));
	if (input.left) {
		$('#debug_input').html("<");
	} else if (input.right) {
		$('#debug_input').html(">");
	} else if (input.up) {
		$('#debug_input').html("^");
	} else if (input.down) {
		$('#debug_input').html("\\/");
	} else {
		$('#debug_input').html("");
	}
}
