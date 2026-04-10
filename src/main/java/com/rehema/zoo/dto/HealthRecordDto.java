package com.rehema.zoo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class HealthRecordDto {
    private Long id;

    @NotNull(message = "Animal ID is required")
    private Long animalId;

    @NotBlank(message = "Treatment details are required")
    private String treatment;

    @NotNull(message = "Record date is required")
    private LocalDate recordDate;

    private String notes;
}
