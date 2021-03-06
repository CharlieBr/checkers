package pl.edu.agh.tai.checkers;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class PlayersRepository {
    public static final Map<String, Player> players = new ConcurrentHashMap<>();

    public static void savePlayer(final Player player) {
        if (players.containsKey(player.getId())) {
            players.put(player.getId(), player);
        }
    }

    public static Player fetchPlayerById(final String id) {
        return players.get(id);
    }

    public static Map<String, Player> getPlayers() {
        return players;
    }

    public static void deletePlayer(final String id) {
        if (players.containsKey(id)) {
            players.remove(id);
        }
    }
}
