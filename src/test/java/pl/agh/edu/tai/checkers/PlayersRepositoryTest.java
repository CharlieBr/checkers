package pl.agh.edu.tai.checkers;

import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.junit.Before;
import org.junit.Test;

import pl.edu.agh.tai.checkers.Player;
import pl.edu.agh.tai.checkers.PlayersRepository;

public class PlayersRepositoryTest {
		
	public Map<String, Player> playersMap = new ConcurrentHashMap<String, Player>();
	@Before
	public void setup(){
	playersMap = PlayersRepository.getPlayers();
		Player player1 = new Player("1", "Anna");
		Player player2 = new Player("2", "Barbara");
		Player player3 = new Player("3", "Celina");
		Player player4 = new Player("4", "Dorota");
		playersMap.put("1", player1);
		playersMap.put("2", player2);
		playersMap.put("3", player3);
		playersMap.put("4", player4);	
	}
	
	@Test
	public void fetchPlayerByIdTest(){
		Player player = new Player("3", "Celina");
		assertEquals(player, PlayersRepository.fetchPlayerById("3"));
	}
	
	@Test
	public void savePlayerTest(){
		Player player = new Player("1", "Alina");
		PlayersRepository.savePlayer(player);
		assertEquals(player, PlayersRepository.fetchPlayerById("1"));
	}
	
	@Test
	public void deletePlayerTest(){
		int size = playersMap.size();
		PlayersRepository.deletePlayer("4");
		playersMap = PlayersRepository.getPlayers();		
		assertEquals(size - 1, playersMap.size() );
	}
	
	
}
