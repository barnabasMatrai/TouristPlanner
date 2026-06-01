package at.technikum.touristplanner.controller;

import at.technikum.touristplanner.dto.in.AuthCreate;
import at.technikum.touristplanner.dto.out.AuthPublic;
import at.technikum.touristplanner.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public AuthPublic login(@RequestBody @Valid AuthCreate authIn) {
        return authService.login(authIn);
    }
}
