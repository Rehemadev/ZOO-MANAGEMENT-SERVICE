package com.rehema.zoo.repository;

import com.rehema.zoo.model.HealthRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HealthRecordRepository extends JpaRepository<HealthRecord, Long> {
    List<HealthRecord> findByAnimalId(Long animalId);
}
