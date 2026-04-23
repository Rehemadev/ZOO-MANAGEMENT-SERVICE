package com.rehema.zoo.service;

import com.rehema.zoo.dto.AuthResponse;
import com.rehema.zoo.dto.LoginRequest;
import com.rehema.zoo.dto.RegisterRequest;
import com.rehema.zoo.model.Role;
import com.rehema.zoo.model.User;
import com.rehema.zoo.repository.RoleRepository;
import com.rehema.zoo.repository.UserRepository;
import com.rehema.zoo.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    public AuthService(UserRepository userRepository, 
                       RoleRepository roleRepository, 
                       PasswordEncoder passwordEncoder, 
                       JwtUtils jwtUtils, 
                       @Lazy AuthenticationManager authenticationManager, 
                       UserDetailsService userDetailsService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        log.info("Registration attempt for email: {}", request.getEmail());

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists: " + request.getEmail());
        }

        String roleName = request.getRole() != null ? request.getRole().toUpperCase() : "VISITOR";
        log.info("Looking up role: {}", roleName);

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role '" + roleName + "' not found. Please ensure the database has been initialized with roles."));

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        
        // If it's a zookeeper, they start as disabled until admin approves
        if ("ZOOKEEPER".equals(roleName)) {
            user.setEnabled(false);
        } else {
            user.setEnabled(true);
        }
        
        userRepository.save(user);
        log.info("User saved successfully: {} (Enabled: {})", user.getEmail(), user.isEnabled());

        String token = jwtUtils.generateToken(user.getEmail());

        AuthResponse response = new AuthResponse();
        response.setId(user.getId());
        response.setToken(token);
        response.setEmail(user.getEmail());
        response.setRole(role.getName());
        response.setFullName(user.getFullName());
        return response;
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isEnabled()) {
            throw new RuntimeException("Your account is pending approval by the administrator.");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtils.generateToken(userDetails);

        AuthResponse response = new AuthResponse();
        response.setId(user.getId());
        response.setToken(token);
        response.setEmail(user.getEmail());
        response.setRole(user.getRole().getName());
        response.setFullName(user.getFullName());
        return response;
    }
}
