package at.technikum.touristplanner.service;

import at.technikum.touristplanner.dto.in.AuthCreate;
import at.technikum.touristplanner.dto.out.AuthPublic;
import at.technikum.touristplanner.dto.out.UserLoginPublic;
import at.technikum.touristplanner.entity.User;
import at.technikum.touristplanner.exception.InvalidCredentialsException;
import at.technikum.touristplanner.mapper.UserMapper;
import at.technikum.touristplanner.repository.UserRepository;
import at.technikum.touristplanner.security.JwtIssuer;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AuthService {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtIssuer jwtIssuer;

    public AuthPublic login(AuthCreate authIn) {
        User user = userRepository.findByUsername(authIn.getUsername())
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordEncoder.matches(authIn.getPassword(), user.getPasswordHash())) {
            throw new InvalidCredentialsException();
        }

        String token = jwtIssuer.issue(user.getId(), user.getEmail(), List.of("USER"));
        UserLoginPublic userLogin = userMapper.toLoginObject(user);
        return new AuthPublic(token, userLogin);
    }
}
