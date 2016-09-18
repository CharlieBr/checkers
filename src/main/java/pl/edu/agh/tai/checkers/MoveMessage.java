package pl.edu.agh.tai.checkers;

public class MoveMessage {
    private String occupied;
    private int startX;
    private int startY;
    private int stopX;
    private int stopY;

    public MoveMessage(){}
    public MoveMessage(final int startX, final int startY, final int stopX, final int stopY, final String occupied){
        this.startX = startX;
        this.startY = startY;
        this.stopX = stopX;
        this.stopY = stopY;
        this.occupied = occupied;
    }

    public int getStartX() {
        return this.startX;
    }

    public void setStartX(final int startX) {
        this.startX = startX;
    }

    public int getStartY() {
        return this.startY;
    }

    public void setStartY(final int startY) {
        this.startY = startY;
    }

    public int getStopX() {
        return this.stopX;
    }

    public void setStopX(final int stopX) {
        this.stopX = stopX;
    }

    public int getStopY() {
        return this.stopY;
    }

    public void setStopY(final int stopY) {
        this.stopY = stopY;
    }

    public String getOccupied() {
        return this.occupied;
    }

    public void setOccupied(final String occupied) {
        this.occupied = occupied;
    }
}
