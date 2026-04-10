package com.rehema.zoo.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AnimalDto {
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Species is required")
    private String species;

    @Min(value = 0, message = "Age cannot be negative")
    private Integer age;

    private String healthStatus;
}
