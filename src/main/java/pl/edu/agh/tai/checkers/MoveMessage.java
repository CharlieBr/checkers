package pl.edu.agh.tai.checkers;

public class MoveMessage {
    private boolean jump;
    private int jumpedX;
    private int jumpedY;
    private int startX;
    private int startY;
    private int stopX;
    private int stopY;
    private String occupied;
    private String turn;

    public MoveMessage() {
    }

    public MoveMessage(final boolean jump,
                       final int jumpedX,
                       final int jumpedY,
                       final int startX,
                       final int startY,
                       final int stopX,
                       final int stopY,
                       final String occupied,
                       final String turn) {
        this.jump = jump;
        this.jumpedX = jumpedX;
        this.jumpedY = jumpedY;
        this.startX = startX;
        this.startY = startY;
        this.stopX = stopX;
        this.stopY = stopY;
        this.occupied = occupied;
        this.turn = turn;
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

    public String getTurn() {
        return this.turn;
    }

    public void setTurn(final String turn) {
        this.turn = turn;
    }

    public boolean isJump() {
        return this.jump;
    }

    public void setJump(final boolean jump) {
        this.jump = jump;
    }

    public int getJumpedX() {
        return this.jumpedX;
    }

    public void setJumpedX(final int jumpedX) {
        this.jumpedX = jumpedX;
    }

    public int getJumpedY() {
        return this.jumpedY;
    }

    public void setJumpedY(final int jumpedY) {
        this.jumpedY = jumpedY;
    }
}
