package at.technikum.touristplanner.service;

import at.technikum.touristplanner.dto.in.AuthCreate;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {
    public String generateToken(AuthCreate authIn) {
        return "";
    }
}
