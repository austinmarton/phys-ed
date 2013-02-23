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
 *  
 */

function GameState(state) {
	
	/* attributes */
	this.current = state;
	this.levelComplete = false;
	
	/* colours */
	this.bgcolour = COLOUR.WHITE;
	this.fgcolour = COLOUR.BLACK;
	
	/* Default call backs */
	this.gameDraw = basicDraw;
	this.gameLogic = gameLogic;
	this.initLevel = initLevelNone;
	
	/* State specific */
	if (state == GameState.STATES.LEVEL_ONE) {
		this.bgcolour = COLOUR.BG;
		this.gameDraw = basicDraw;
		this.gameLogic = gameLogic;
		this.initLevel = initLevelOne;
	} else if (state == GameState.STATES.LEVEL_TWO_TITLE) {
		this.bgcolour = COLOUR.BG_LEVEL2;
		this.gameDraw = level2IntroDraw;
		this.gameLogic = gameLogicTitle;
	} else if (state == GameState.STATES.LEVEL_TWO) {
		this.bgcolour = COLOUR.BG_LEVEL2;
		this.gameDraw = basicDraw;
		this.gameLogic = gameLogic;
		this.initLevel = initLevelTwo;
	} else if (state == GameState.STATES.GAME_DONE_TITLE) {
		this.bgcolour = COLOUR.WHITE;
		this.gameDraw = level2IntroDraw;
		this.gameLogic = gameLogicTitle;
	} else if (state == GameState.STATES.DEAD) {
		this.gameDraw = deadDraw;
		this.gameLogic = gameLogic;
	} else if (state == GameState.STATES.TITLE_SCREEN) {
		this.bgcolour = COLOUR.BG;
		this.gameDraw = titleDraw;
		this.gameLogic = gameLogicTitle;
	}
	
	this.initDraw = initDraw;
	this.initWorld = initWorld;
	this.initLogic = initLogic;
	
	this.initLevel();
}

GameState.STATES = {
	DEAD : 0,
	TITLE_SCREEN : 1,
	LEVEL_ONE : 2,
	LEVEL_TWO_TITLE : 3,
	LEVEL_TWO : 4,
	GAME_DONE_TITLE : 5,
	GAME_DONE : 6
};

function stateTransition(increment)
{
	var new_state = state.current + increment;
	return new GameState(new_state);	
}