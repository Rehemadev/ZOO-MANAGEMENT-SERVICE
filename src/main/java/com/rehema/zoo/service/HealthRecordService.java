package com.rehema.zoo.service;

import com.rehema.zoo.dto.HealthRecordDto;
import com.rehema.zoo.model.Animal;
import com.rehema.zoo.model.HealthRecord;
import com.rehema.zoo.repository.AnimalRepository;
import com.rehema.zoo.repository.HealthRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class HealthRecordService {

    private final HealthRecordRepository healthRecordRepository;
    private final AnimalRepository animalRepository;

    @Transactional
    public HealthRecordDto createHealthRecord(HealthRecordDto dto) {
        Animal animal = animalRepository.findById(dto.getAnimalId())
                .orElseThrow(() -> new RuntimeException("Animal not found"));

        HealthRecord record = new HealthRecord();
        record.setAnimal(animal);
        record.setTreatment(dto.getTreatment());
        record.setRecordDate(dto.getRecordDate());
        record.setNotes(dto.getNotes());

        updateAnimalStatusBasedOnTreatment(animal, dto.getTreatment());
        animalRepository.save(animal);

        HealthRecord savedRecord = healthRecordRepository.save(record);
        return mapToDto(savedRecord);
    }

    public List<HealthRecordDto> getAllHealthRecords() {
        return healthRecordRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public HealthRecordDto updateHealthRecord(Long id, HealthRecordDto dto) {
        HealthRecord record = healthRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Health record not found"));
        
        Animal animal = record.getAnimal();
        record.setTreatment(dto.getTreatment());
        record.setRecordDate(dto.getRecordDate());
        record.setNotes(dto.getNotes());

        // Update animal status based on the new treatment
        updateAnimalStatusBasedOnTreatment(animal, dto.getTreatment());
        animalRepository.save(animal);

        HealthRecord updatedRecord = healthRecordRepository.save(record);
        return mapToDto(updatedRecord);
    }

    @Transactional
    public void deleteHealthRecord(Long id) {
        HealthRecord record = healthRecordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Health record not found"));
        healthRecordRepository.delete(record);
    }

    private void updateAnimalStatusBasedOnTreatment(Animal animal, String treatmentDetails) {
        // Priority logic: Critical conditions take precedence over stable/healthy mentions
        String treatment = treatmentDetails.toLowerCase();
        if (treatment.contains("sick") || treatment.contains("ill") || treatment.contains("critical") || treatment.contains("surgery")) {
            animal.setHealthStatus("Under Treatment");
        } else if (treatment.contains("vaccination") || treatment.contains("checkup") || treatment.contains("monitoring")) {
            animal.setHealthStatus("Monitoring");
        } else if (treatment.contains("recovered") || treatment.contains("excellent") || treatment.contains("stable") || treatment.contains("healthy")) {
            animal.setHealthStatus("Healthy");
        }
    }

    public List<HealthRecordDto> getRecordsByAnimalId(Long animalId) {
        return healthRecordRepository.findByAnimalId(animalId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private HealthRecordDto mapToDto(HealthRecord record) {
        HealthRecordDto dto = new HealthRecordDto();
        dto.setId(record.getId());
        dto.setAnimalId(record.getAnimal().getId());
        dto.setTreatment(record.getTreatment());
        dto.setRecordDate(record.getRecordDate());
        dto.setNotes(record.getNotes());
        return dto;
    }
}
