package pl.edu.agh.tai.checkers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {
    @MessageMapping("/move")
    @SendTo("topic/moves")
    public MoveMessage move(final MoveMessage message) throws Exception {
        return message;
    }
}
