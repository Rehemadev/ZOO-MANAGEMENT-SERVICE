package com.rehema.zoo.service;

import com.rehema.zoo.dto.UserDto;
import com.rehema.zoo.model.User;
import com.rehema.zoo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<UserDto> getStaff() {
        return userRepository.findAll().stream()
                .filter(u -> u.getRole().getName().equals("ZOOKEEPER") || u.getRole().getName().equals("ADMIN"))
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    private UserDto mapToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole().getName());
        return dto;
    }
}
