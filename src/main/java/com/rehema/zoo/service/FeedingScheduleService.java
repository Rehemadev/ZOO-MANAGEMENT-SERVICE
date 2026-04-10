package com.rehema.zoo.service;

import com.rehema.zoo.dto.FeedingScheduleDto;
import com.rehema.zoo.model.Animal;
import com.rehema.zoo.model.FeedingSchedule;
import com.rehema.zoo.repository.AnimalRepository;
import com.rehema.zoo.repository.FeedingScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FeedingScheduleService {

    private final FeedingScheduleRepository scheduleRepository;
    private final AnimalRepository animalRepository;

    @Transactional
    public FeedingScheduleDto createSchedule(FeedingScheduleDto dto) {
        Animal animal = animalRepository.findById(dto.getAnimalId())
                .orElseThrow(() -> new RuntimeException("Animal not found"));

        FeedingSchedule schedule = new FeedingSchedule();
        schedule.setAnimal(animal);
        schedule.setFeedingTime(dto.getFeedingTime());
        schedule.setFoodType(dto.getFoodType());

        FeedingSchedule savedSchedule = scheduleRepository.save(schedule);
        return mapToDto(savedSchedule);
    }

    public List<FeedingScheduleDto> getSchedulesByAnimalId(Long animalId) {
        return scheduleRepository.findByAnimalId(animalId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private FeedingScheduleDto mapToDto(FeedingSchedule schedule) {
        FeedingScheduleDto dto = new FeedingScheduleDto();
        dto.setId(schedule.getId());
        dto.setAnimalId(schedule.getAnimal().getId());
        dto.setFeedingTime(schedule.getFeedingTime());
        dto.setFoodType(schedule.getFoodType());
        return dto;
    }
}
