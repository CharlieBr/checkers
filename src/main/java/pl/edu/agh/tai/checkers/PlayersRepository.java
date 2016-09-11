package pl.edu.agh.tai.checkers;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class PlayersRepository {
    private final Map<String, Player> players = new ConcurrentHashMap<>();

    public void savePlayer(final Player player) {
        if (this.players.containsKey(player.getId())) {
            this.players.put(player.getId(), player);
        }
    }

    public Player fetchPlayerById(final String id) {
        return this.players.get(id);
    }

    public Map<String, Player> getPlayers() {
        return this.players;
    }

    public void deletePlayer(final String id) {
        if (this.players.containsKey(id)) {
            this.players.remove(id);
        }
    }
}
