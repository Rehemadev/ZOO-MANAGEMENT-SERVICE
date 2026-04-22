package com.rehema.zoo.controller;

import com.rehema.zoo.dto.FeedingScheduleDto;
import com.rehema.zoo.service.FeedingScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feeding-schedules")
@RequiredArgsConstructor
public class FeedingScheduleController {

    private final FeedingScheduleService scheduleService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ZOOKEEPER')")
    public ResponseEntity<FeedingScheduleDto> createSchedule(@Valid @RequestBody FeedingScheduleDto dto) {
        return ResponseEntity.ok(scheduleService.createSchedule(dto));
    }

    @GetMapping
    public ResponseEntity<List<FeedingScheduleDto>> getAllSchedules() {
        return ResponseEntity.ok(scheduleService.getAllSchedules());
    }

    @GetMapping("/animal/{animalId}")

    @PreAuthorize("hasAnyRole('ADMIN', 'ZOOKEEPER')")
    public ResponseEntity<List<FeedingScheduleDto>> getSchedulesByAnimal(@PathVariable Long animalId) {
        return ResponseEntity.ok(scheduleService.getSchedulesByAnimalId(animalId));
    }
}
