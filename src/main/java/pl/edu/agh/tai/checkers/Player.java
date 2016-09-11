package pl.edu.agh.tai.checkers;

import java.io.Serializable;
import java.util.Objects;

public class Player implements Serializable {
    private String id;
    private String name;

    public Player(final String id, final String name) {
        this.name = name;
        this.id = id;
    }

    public String getId() {
        return this.id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        final Player player = (Player) o;
        return Objects.equals(this.id, player.id) &&
                Objects.equals(this.name, player.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id, this.name);
    }

    @Override
    public String toString() {
        return "Player{" +
                "id='" + this.id + '\'' +
                ", name='" + this.name + '\'' +
                '}';
    }
}
