package com.rehema.zoo.dto;

import lombok.Data;
import java.time.LocalTime;

@Data
public class FeedingScheduleDto {
    private Long id;
    private Long animalId;
    private LocalTime feedingTime;
    private String foodType;
}
