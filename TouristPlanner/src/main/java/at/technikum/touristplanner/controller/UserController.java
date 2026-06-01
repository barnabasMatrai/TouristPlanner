package at.technikum.touristplanner.controller;

import at.technikum.touristplanner.dto.in.UserRegisterCreate;
import at.technikum.touristplanner.dto.out.UserPublic;
import at.technikum.touristplanner.service.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
@CrossOrigin
public class UserController {
    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserPublic create(@RequestBody @Valid UserRegisterCreate userRegister) {
        return userService.register(userRegister);
    }

    @GetMapping("/{id}")
    public UserPublic read(@PathVariable int id) {
        return userService.get(id);
    }

    @GetMapping
    public List<UserPublic> readAll() {
        return userService.getAll();
    }
}
