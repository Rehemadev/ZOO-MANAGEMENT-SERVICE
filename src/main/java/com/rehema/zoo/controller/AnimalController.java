package com.rehema.zoo.controller;

import com.rehema.zoo.dto.AnimalDto;
import com.rehema.zoo.service.AnimalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/animals")
@RequiredArgsConstructor
public class AnimalController {

    private final AnimalService animalService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<AnimalDto> createAnimal(@Valid @RequestBody AnimalDto animalDto) {
        return ResponseEntity.ok(animalService.createAnimal(animalDto));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ZOOKEEPER', 'VISITOR')")
    public ResponseEntity<List<AnimalDto>> getAllAnimals(
            @RequestParam(required = false) String species,
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(animalService.getAllAnimals(Optional.ofNullable(species), Optional.ofNullable(status)));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ZOOKEEPER', 'VISITOR')")
    public ResponseEntity<AnimalDto> getAnimalById(@PathVariable Long id) {
        return ResponseEntity.ok(animalService.getAnimalById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ZOOKEEPER')")
    public ResponseEntity<AnimalDto> updateAnimal(@PathVariable Long id, @Valid @RequestBody AnimalDto animalDto) {
        return ResponseEntity.ok(animalService.updateAnimal(id, animalDto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Void> deleteAnimal(@PathVariable Long id) {
        animalService.deleteAnimal(id);
        return ResponseEntity.ok().build();
    }
}
