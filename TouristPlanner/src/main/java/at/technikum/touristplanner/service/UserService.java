package at.technikum.touristplanner.service;

import at.technikum.touristplanner.dto.in.UserRegisterCreate;
import at.technikum.touristplanner.dto.out.UserPublic;
import at.technikum.touristplanner.entity.User;
import at.technikum.touristplanner.exception.EntityNotFoundException;
import at.technikum.touristplanner.mapper.UserMapper;
import at.technikum.touristplanner.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserPublic register(UserRegisterCreate userRegister) {
        User user = new User();
        user.setUsername(userRegister.getUsername());
        user.setEmail(userRegister.getEmail());
        user.setPasswordHash(passwordEncoder.encode(userRegister.getPassword()));
        User saved = userRepository.save(user);
        return userMapper.toObject(saved);
    }

    public List<UserPublic> getAll() {
        return userRepository.findAll().stream()
                .map(userMapper::toObject)
                .toList();
    }

    public UserPublic get(int id) {
        User user = userRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);
        return userMapper.toObject(user);
    }
}
