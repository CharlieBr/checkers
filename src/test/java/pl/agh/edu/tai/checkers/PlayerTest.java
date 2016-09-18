package pl.agh.edu.tai.checkers;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import pl.edu.agh.tai.checkers.Player;

public class PlayerTest {
	
	private Player player1;
	private Player player2;
	
	@Before
	public void setup(){
		player1 = new Player ("1", "Kasia");
		player2 = new Player ("32", "Ola");
	}
	
	@Test
	public void testSetId(){
		player1.setId("3");
		assertEquals("3", player1.getId());
	}
	
	@Test
	public void testSetName(){
		player2.setName("Aleksandra");
		assertEquals("Aleksandra", player2.getName());
		assertNotEquals("Aleksandra", player1.getName());
	}
	
	@Test
	public void testEquals(){
		assertFalse(player1.equals(player2) && player2.equals(player1));
	}
	
	@Test
	public void testHashCode(){
		assertFalse(player1.hashCode() == player2.hashCode());
	}
	
	
}
