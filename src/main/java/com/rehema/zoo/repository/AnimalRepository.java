package com.rehema.zoo.repository;

import com.rehema.zoo.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    List<Animal> findBySpeciesContainingIgnoreCase(String species);
    List<Animal> findByHealthStatus(String status);
    List<Animal> findBySpeciesContainingIgnoreCaseAndHealthStatus(String species, String status);
    List<Animal> findByNameContainingIgnoreCaseOrSpeciesContainingIgnoreCase(String name, String species);
}
