package at.technikum.touristplanner.service;

import at.technikum.touristplanner.dto.in.UserCreate;
import at.technikum.touristplanner.entity.User;
import at.technikum.touristplanner.exception.EntityNotFoundException;
import at.technikum.touristplanner.mapper.UserMapper;
import at.technikum.touristplanner.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public User create(UserCreate userCreate) {
        User user = userMapper.toEntity(userCreate);
        return userRepository.save(user);
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public User get(int id) {
        return userRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);
    }
}
