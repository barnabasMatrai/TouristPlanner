package at.technikum.touristplanner.controller;

import at.technikum.touristplanner.dto.in.AuthCreate;
import at.technikum.touristplanner.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/token")
    public String generateToken(@RequestBody AuthCreate authIn) {
        //String token = authService.
        return "userIn";
    }
}
