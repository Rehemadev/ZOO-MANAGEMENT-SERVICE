package com.rehema.zoo.controller;

import com.rehema.zoo.dto.HealthRecordDto;
import com.rehema.zoo.service.HealthRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/health-records")
@RequiredArgsConstructor
public class HealthRecordController {

    private final HealthRecordService healthRecordService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ZOOKEEPER')")
    public ResponseEntity<HealthRecordDto> createRecord(@Valid @RequestBody HealthRecordDto dto) {
        return ResponseEntity.ok(healthRecordService.createHealthRecord(dto));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<HealthRecordDto>> getAllRecords() {
        return ResponseEntity.ok(healthRecordService.getAllHealthRecords());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ZOOKEEPER')")
    public ResponseEntity<HealthRecordDto> updateRecord(@PathVariable Long id, @Valid @RequestBody HealthRecordDto dto) {
        return ResponseEntity.ok(healthRecordService.updateHealthRecord(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteRecord(@PathVariable Long id) {
        healthRecordService.deleteHealthRecord(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/animal/{animalId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ZOOKEEPER')")
    public ResponseEntity<List<HealthRecordDto>> getRecordsByAnimal(@PathVariable Long animalId) {
        return ResponseEntity.ok(healthRecordService.getRecordsByAnimalId(animalId));
    }
}
