package pl.edu.agh.tai.checkers;

import com.google.gson.Gson;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/new-game")
public class Game {
    private Player whitePlayer;
    private Player blackPlayer;

    @RequestMapping(value = "/start", method = RequestMethod.GET)
    @ResponseBody
    public boolean isReady() {
        return this.whitePlayer != null && this.blackPlayer != null;
    }

    @RequestMapping(value = "/white-player", method = RequestMethod.POST)
    public void setWhitePlayer(@RequestParam(value = "id") @NotBlank final String id,
                               @RequestParam(value = "name") @NotBlank final String name) {
        this.whitePlayer = new Player(id, name);
    }

    @RequestMapping(value = "/black-player", method = RequestMethod.POST)
    public void setBlackPlayer(@RequestParam(value = "id") @NotBlank final String id,
                               @RequestParam(value = "name") @NotBlank final String name) {
        this.blackPlayer = new Player(id, name);
    }

    @RequestMapping(value = "/player", method = RequestMethod.GET)
    @ResponseBody
    public String getPlayerName(@RequestParam(value = "color") @NotBlank final String color) {
        final Gson gson = new Gson();
        if(Objects.equals(color, "white")){
            return gson.toJson(this.whitePlayer.getName());
        }
        return gson.toJson(this.blackPlayer.getName());
    }
}
