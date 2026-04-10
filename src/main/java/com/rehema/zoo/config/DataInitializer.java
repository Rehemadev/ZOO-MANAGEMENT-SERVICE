package com.rehema.zoo.config;

import com.rehema.zoo.model.Role;
import com.rehema.zoo.model.User;
import com.rehema.zoo.repository.RoleRepository;
import com.rehema.zoo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    @Bean
    CommandLineRunner initRoles(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed Roles
            if (roleRepository.findByName("ADMIN").isEmpty()) {
                roleRepository.save(new Role(null, "ADMIN"));
                log.info("Created role: ADMIN");
            }
            if (roleRepository.findByName("ZOOKEEPER").isEmpty()) {
                roleRepository.save(new Role(null, "ZOOKEEPER"));
                log.info("Created role: ZOOKEEPER");
            }
            if (roleRepository.findByName("VISITOR").isEmpty()) {
                roleRepository.save(new Role(null, "VISITOR"));
                log.info("Created role: VISITOR");
            }
            log.info("Roles initialized: ADMIN, ZOOKEEPER, VISITOR");

            // Seed Default Admin User
            if (userRepository.findByEmail("admin@zoo.com").isEmpty()) {
                Role adminRole = roleRepository.findByName("ADMIN").get();
                User admin = new User();
                admin.setFullName("System Admin");
                admin.setEmail("admin@zoo.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(adminRole);
                userRepository.save(admin);
                log.info("Default Admin created: admin@zoo.com / admin123");
            }
        };
    }
}
