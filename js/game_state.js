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
	switch (this.current) {
	case GameState.STATES.DEAD:
		this.gameDraw = deadDraw;
		this.gameLogic = gameLogic;
		break;
	case GameState.STATES.TITLE_SCREEN:
		this.bgcolour = COLOUR.BG_LEVEL1;
		this.gameDraw = introDraw;
		this.gameLogic = gameLogicTitle;
		break;
	case GameState.STATES.LEVEL_ONE_TITLE:
		this.bgcolour = COLOUR.BG_LEVEL1;
		this.gameDraw = titleDraw;
		this.gameLogic = gameLogicTitle;
		break;
	case GameState.STATES.LEVEL_ONE:
		this.bgcolour = COLOUR.BG_LEVEL1;
		this.gameDraw = basicDraw;
		this.gameLogic = gameLogic;
		this.initLevel = initLevelOne;
		break;
	case GameState.STATES.LEVEL_TWO_TITLE:
		this.bgcolour = COLOUR.BG_BRICKS;
		this.gameDraw = titleDraw;
		this.gameLogic = gameLogicTitle;
		break;
	case GameState.STATES.LEVEL_TWO:
		this.bgcolour = COLOUR.BG_BRICKS;
		this.gameDraw = basicDraw;
		this.gameLogic = gameLogic;
		this.initLevel = initLevelTwo;
		break;
	case GameState.STATES.LEVEL_THREE_TITLE:
		this.bgcolour = COLOUR.BG_LEVEL3;
		this.gameDraw = titleDraw;
		this.gameLogic = gameLogicTitle;
		break;
	case GameState.STATES.LEVEL_THREE:
		this.bgcolour = COLOUR.BG_LEVEL3;
		this.gameDraw = basicDraw;
		this.gameLogic = gameLogic;
		this.initLevel = initLevelThree;
		break;
	case GameState.STATES.LEVEL_FOUR_TITLE:
		this.bgcolour = COLOUR.BG_LEVEL1;
		this.gameDraw = titleDraw;
		this.gameLogic = gameLogicTitle;
		break;
	case GameState.STATES.LEVEL_FOUR:
		this.bgcolour = COLOUR.BG_LEVEL1;
		this.gameDraw = basicDraw;
		this.gameLogic = gameLogic;
		this.initLevel = initLevelFour;
		break;
	case GameState.STATES.GAME_DONE_TITLE:
		this.bgcolour = COLOUR.WHITE;
		this.gameDraw = titleDraw;
		this.gameLogic = gameLogicTitle;
		break;
	default:
		break;
	}
	
	this.initDraw = initDraw;
	this.initWorld = initWorld;
	this.initLogic = initLogic;
	
	this.initLevel();
}

GameState.STATES = {
	DEAD : 0,
	TITLE_SCREEN : 1,
	LEVEL_ONE_TITLE: 2,
	LEVEL_ONE : 3,
	LEVEL_TWO_TITLE : 4,
	LEVEL_TWO : 5,
	LEVEL_THREE_TITLE : 6,
	LEVEL_THREE : 7,
	LEVEL_FOUR_TITLE : 8,
	LEVEL_FOUR : 9,
	GAME_DONE_TITLE : 10,
	GAME_DONE : 11
};

GameState.prototype.toString = function() {
	switch (this.current) {
	case GameState.STATES.LEVEL_ONE_TITLE:
		return "Level 1: Getting to school";
	case GameState.STATES.LEVEL_TWO_TITLE:
		return "Level 2: Physical Education";
	case GameState.STATES.LEVEL_THREE_TITLE:
		return "Level 3: Lunch time";
	case GameState.STATES.LEVEL_FOUR_TITLE:
		return "Level 4: Home time";
	case GameState.STATES.GAME_DONE_TITLE:
		return "First day of school over!";
	default:
		return "";
	}
};

function stateTransition(increment)
{
	var new_state = state.current + increment;
	return new GameState(new_state);	
}
