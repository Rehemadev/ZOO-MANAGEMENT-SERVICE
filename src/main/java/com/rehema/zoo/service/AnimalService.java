package com.rehema.zoo.service;

import com.rehema.zoo.dto.AnimalDto;
import com.rehema.zoo.model.Animal;
import com.rehema.zoo.repository.AnimalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AnimalService {

    private final AnimalRepository animalRepository;

    @Transactional
    public AnimalDto createAnimal(AnimalDto animalDto) {
        if (animalDto == null) {
            throw new IllegalArgumentException("Animal data cannot be null");
        }
        
        Animal animal = new Animal();
        animal.setName(animalDto.getName());
        animal.setSpecies(animalDto.getSpecies());
        animal.setAge(animalDto.getAge());
        animal.setHealthStatus(animalDto.getHealthStatus() != null ? animalDto.getHealthStatus() : "Healthy");

        Animal savedAnimal = animalRepository.save(animal);
        return mapToDto(savedAnimal);
    }

    public List<AnimalDto> getAllAnimals(Optional<String> species, Optional<String> status, Optional<String> search) {
        List<Animal> animals;
        try {
            if (search.isPresent() && !search.get().isEmpty()) {
                animals = animalRepository.findByNameContainingIgnoreCaseOrSpeciesContainingIgnoreCase(search.get(), search.get());
            } else if (species.isPresent() && status.isPresent()) {
                animals = animalRepository.findBySpeciesContainingIgnoreCaseAndHealthStatus(species.get(), status.get());
            } else if (species.isPresent()) {
                animals = animalRepository.findBySpeciesContainingIgnoreCase(species.get());
            } else if (status.isPresent()) {
                animals = animalRepository.findByHealthStatus(status.get());
            } else {
                animals = animalRepository.findAll();
            }
        } catch (Exception e) {
            throw new RuntimeException("Error fetching animals: " + e.getMessage());
        }
        
        return animals.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public AnimalDto getAnimalById(Long id) {
        return animalRepository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new RuntimeException("Animal not found with id: " + id));
    }

    @Transactional
    public AnimalDto updateAnimal(Long id, AnimalDto animalDto) {
        Animal animal = animalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Animal not found with id: " + id));

        if (animalDto.getName() != null) animal.setName(animalDto.getName());
        if (animalDto.getSpecies() != null) animal.setSpecies(animalDto.getSpecies());
        if (animalDto.getAge() != null) animal.setAge(animalDto.getAge());
        if (animalDto.getHealthStatus() != null) animal.setHealthStatus(animalDto.getHealthStatus());

        Animal updatedAnimal = animalRepository.save(animal);
        return mapToDto(updatedAnimal);
    }

    @Transactional
    public void deleteAnimal(Long id) {
        if (!animalRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete: Animal not found with id: " + id);
        }
        animalRepository.deleteById(id);
    }

    private AnimalDto mapToDto(Animal animal) {
        AnimalDto dto = new AnimalDto();
        dto.setId(animal.getId());
        dto.setName(animal.getName());
        dto.setSpecies(animal.getSpecies());
        dto.setAge(animal.getAge());
        dto.setHealthStatus(animal.getHealthStatus());
        return dto;
    }
}
