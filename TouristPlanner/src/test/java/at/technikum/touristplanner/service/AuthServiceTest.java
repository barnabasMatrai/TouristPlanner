package at.technikum.touristplanner.service;

import at.technikum.touristplanner.dto.in.AuthCreate;
import at.technikum.touristplanner.dto.out.AuthPublic;
import at.technikum.touristplanner.dto.out.UserLoginPublic;
import at.technikum.touristplanner.entity.User;
import at.technikum.touristplanner.exception.InvalidCredentialsException;
import at.technikum.touristplanner.mapper.UserMapper;
import at.technikum.touristplanner.repository.UserRepository;
import at.technikum.touristplanner.security.JwtIssuer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserMapper userMapper;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtIssuer jwtIssuer;

    @InjectMocks
    private AuthService authService;

    @Test
    void login_returnsTokenAndUserOnSuccess() {
        AuthCreate authIn = new AuthCreate();
        authIn.setUsername("alice");
        authIn.setPassword("secret");

        User user = new User();
        user.setId(1);
        user.setUsername("alice");
        user.setEmail("alice@example.com");
        user.setPasswordHash("hashed");

        UserLoginPublic userLogin = new UserLoginPublic();
        userLogin.setId(1);
        userLogin.setUsername("alice");

        when(userRepository.findByUsername("alice")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("secret", "hashed")).thenReturn(true);
        when(jwtIssuer.issue(1, "alice@example.com", List.of("USER"))).thenReturn("jwt-token");
        when(userMapper.toLoginObject(user)).thenReturn(userLogin);

        AuthPublic result = authService.login(authIn);

        assertEquals("jwt-token", result.getAccessToken());
        assertEquals("alice", result.getUser().getUsername());
    }

    @Test
    void login_throwsWhenUserNotFound() {
        AuthCreate authIn = new AuthCreate();
        authIn.setUsername("unknown");
        authIn.setPassword("secret");

        when(userRepository.findByUsername("unknown")).thenReturn(Optional.empty());

        assertThrows(InvalidCredentialsException.class, () -> authService.login(authIn));
    }

    @Test
    void login_throwsWhenPasswordWrong() {
        AuthCreate authIn = new AuthCreate();
        authIn.setUsername("alice");
        authIn.setPassword("wrong");

        User user = new User();
        user.setUsername("alice");
        user.setPasswordHash("hashed");

        when(userRepository.findByUsername("alice")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong", "hashed")).thenReturn(false);

        assertThrows(InvalidCredentialsException.class, () -> authService.login(authIn));
    }

    @Test
    void login_callsJwtIssuerWithCorrectUserData() {
        AuthCreate authIn = new AuthCreate();
        authIn.setUsername("alice");
        authIn.setPassword("secret");

        User user = new User();
        user.setId(42);
        user.setUsername("alice");
        user.setEmail("alice@example.com");
        user.setPasswordHash("hashed");

        when(userRepository.findByUsername("alice")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("secret", "hashed")).thenReturn(true);
        when(jwtIssuer.issue(42, "alice@example.com", List.of("USER"))).thenReturn("token");
        when(userMapper.toLoginObject(user)).thenReturn(new UserLoginPublic());

        authService.login(authIn);

        verify(jwtIssuer).issue(eq(42L), eq("alice@example.com"), eq(List.of("USER")));
    }
}
