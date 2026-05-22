package at.technikum.touristplanner.controller;

import at.technikum.touristplanner.dto.in.UserCreate;
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
    public UserCreate create(@RequestBody @Valid UserCreate userCreate) {
        return userCreate;
    }

    @GetMapping("/{id}")
    public UserCreate read(@PathVariable int id) {
        return null;
    }

    @GetMapping
    public List<UserCreate> readAll() {
        return List.of();
    }

    @PutMapping("/{id}")
    public UserCreate update(@PathVariable int id, @RequestBody @Valid UserCreate userCreate) {
        return userCreate;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id) {

    }
}
