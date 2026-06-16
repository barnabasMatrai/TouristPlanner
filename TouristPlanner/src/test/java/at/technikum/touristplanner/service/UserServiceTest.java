package at.technikum.touristplanner.service;

import at.technikum.touristplanner.dto.in.UserRegisterCreate;
import at.technikum.touristplanner.dto.out.UserPublic;
import at.technikum.touristplanner.entity.User;
import at.technikum.touristplanner.exception.EntityNotFoundException;
import at.technikum.touristplanner.exception.UsernameAlreadyExistsException;
import at.technikum.touristplanner.mapper.UserMapper;
import at.technikum.touristplanner.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserMapper userMapper;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    void register_throwsUsernameAlreadyExistsExceptionWhenUsernameTaken() {
        UserRegisterCreate request = new UserRegisterCreate();
        request.setUsername("alice");
        request.setEmail("alice@example.com");
        request.setPassword("secret");

        when(userRepository.existsByUsername("alice")).thenReturn(true);

        assertThrows(UsernameAlreadyExistsException.class, () -> userService.register(request));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void register_encodesPasswordAndReturnsUserPublic() {
        UserRegisterCreate request = new UserRegisterCreate();
        request.setUsername("alice");
        request.setEmail("alice@example.com");
        request.setPassword("secret");

        User saved = new User();
        saved.setId(1);
        saved.setUsername("alice");
        saved.setEmail("alice@example.com");
        saved.setPasswordHash("hashed");

        UserPublic expected = new UserPublic();
        expected.setId(1);
        expected.setUsername("alice");
        expected.setEmail("alice@example.com");

        when(userRepository.existsByUsername("alice")).thenReturn(false);
        when(passwordEncoder.encode("secret")).thenReturn("hashed");
        when(userRepository.save(any(User.class))).thenReturn(saved);
        when(userMapper.toObject(saved)).thenReturn(expected);

        UserPublic result = userService.register(request);

        assertEquals("alice", result.getUsername());
        assertEquals("alice@example.com", result.getEmail());
        verify(passwordEncoder).encode("secret");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void get_returnsUserWhenExists() {
        User user = new User();
        user.setId(1);
        user.setUsername("bob");

        UserPublic expected = new UserPublic();
        expected.setId(1);
        expected.setUsername("bob");

        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(userMapper.toObject(user)).thenReturn(expected);

        UserPublic result = userService.get(1);

        assertEquals("bob", result.getUsername());
    }

    @Test
    void get_throwsEntityNotFoundWhenMissing() {
        when(userRepository.findById(99)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> userService.get(99));
    }

    @Test
    void getAll_returnsMappedUsers() {
        User user1 = new User();
        user1.setId(1);
        User user2 = new User();
        user2.setId(2);

        UserPublic public1 = new UserPublic();
        public1.setId(1);
        UserPublic public2 = new UserPublic();
        public2.setId(2);

        when(userRepository.findAll()).thenReturn(List.of(user1, user2));
        when(userMapper.toObject(user1)).thenReturn(public1);
        when(userMapper.toObject(user2)).thenReturn(public2);

        List<UserPublic> result = userService.getAll();

        assertEquals(2, result.size());
        assertEquals(1, result.get(0).getId());
        assertEquals(2, result.get(1).getId());
    }
}
