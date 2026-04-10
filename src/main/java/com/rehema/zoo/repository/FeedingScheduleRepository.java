package com.rehema.zoo.repository;

import com.rehema.zoo.model.FeedingSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeedingScheduleRepository extends JpaRepository<FeedingSchedule, Long> {
    List<FeedingSchedule> findByAnimalId(Long animalId);
}
