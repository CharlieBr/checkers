package pl.edu.agh.tai.checkers;

public class MoveMessage {
    private int x;
    private int y;

    public MoveMessage(){}
    public MoveMessage(final int x, final int y){
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return this.x;
    }

    public void setX(final int x) {
        this.x = x;
    }

    public int getY() {
        return this.y;
    }

    public void setY(final int y) {
        this.y = y;
    }
}
