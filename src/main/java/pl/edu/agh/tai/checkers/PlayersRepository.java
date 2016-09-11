package pl.edu.agh.tai.checkers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.LinkedHashMap;
import java.util.Map;

@Repository
public class PlayersRepository {
    private static final String PLAYERS_KEY = "players";
    private RedisTemplate<String, Player> redisTemplate;

    public void setRedisTemplate(RedisTemplate<String, Player> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void savePlayer(final Player player){
        if(!this.redisTemplate.opsForHash().hasKey(PLAYERS_KEY, player.getId())){
            this.redisTemplate.opsForHash().put(PLAYERS_KEY, player.getId(), player);
        }
    }

    public Player fetchPlayerById(final String id) {
        return (Player)this.redisTemplate.opsForHash().get(PLAYERS_KEY, id);
    }

    public Map<String, Player> fetchAllPlayers() {
        final Map<String, Player> result = new LinkedHashMap<>();
        this.redisTemplate.opsForHash().entries(PLAYERS_KEY)
                .entrySet().forEach(entry -> result.put(entry.getKey().toString(), (Player)entry.getValue()));
        return result;
    }

    public void deletePlayer(final String id){
        this.redisTemplate.opsForHash().delete(PLAYERS_KEY, id);
    }
}
