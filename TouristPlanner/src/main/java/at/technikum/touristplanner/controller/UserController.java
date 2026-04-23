package at.technikum.touristplanner.controller;

import at.technikum.touristplanner.dto.UserDto;
import at.technikum.touristplanner.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController extends BaseController<UserDto> {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
}
