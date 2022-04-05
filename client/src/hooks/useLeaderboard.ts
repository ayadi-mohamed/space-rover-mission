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
import axios from "axios";
import { useQuery } from "react-query";
import { leaderboardURL } from "lib/config";

export type LeaderboardEntry = {
  rank: number;
  player: string;
  time: number;
  health: number;
  score: number;
  timestamp: string;
};

const getLeaderboard = async () => {
  const { data } = await axios.get<LeaderboardEntry[]>(`${leaderboardURL}/`);
  data.forEach((entry, i) => {
    entry.rank = i + 1;
  });
  return data;
};

const useLeaderboard = () => {
  return useQuery("leaderboard", getLeaderboard);
};

export default useLeaderboard;
