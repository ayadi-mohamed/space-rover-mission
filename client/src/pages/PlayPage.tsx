/*******************************************************************************
 * Copyright (c) 2022 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
import React from "react";
import { Navigate } from "react-router-dom";
import PlayerForm from "components/PlayerForm";
import GameScreen from "components/GameScreen";
import GameStateMessage from "components/GameStateMessage";
import useGame, { GameState } from "hooks/useGame";
import { gameSocketURL, gameDurationSeconds } from "lib/config";

const PlayPage = () => {
  const {
    playerName,
    gameState,
    formattedTime,
    health,
    score,
    startGame,
    endGame,
    error,
  } = useGame(gameSocketURL, gameDurationSeconds);

  switch (gameState) {
    case GameState.Connecting:
    case GameState.Error:
    case GameState.Waiting:
    case GameState.NotStarted:
      return (
        <div className="flex flex-col gap-7 justify-center h-full">
          <PlayerForm
            isDisabled={gameState !== GameState.NotStarted}
            onSubmit={startGame}
          />
          <GameStateMessage
            state={gameState}
            errorMessage={error}
          />
        </div>
      );
    case GameState.InGame:
      return (
        <GameScreen
          playerName={playerName}
          health={health}
          score={score}
          time={formattedTime}
          stopGame={endGame}
        />
      );
    case GameState.GameEnded:
      return <Navigate to={`/leaderboard?player=${playerName}`} />;
    default:
      return null;
  }
};

export default PlayPage;
