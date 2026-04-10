package com.rehema.zoo.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Data
public class BookingDto {
    private Long id;
    private Long userId;
    private String userEmail;
    private LocalDateTime bookingDate;

    @NotNull(message = "Number of tickets is required")
    @Min(value = 1, message = "At least one ticket must be booked")
    @Max(value = 20, message = "Cannot book more than 20 tickets at once")
    private Integer numberOfTickets;

    private BigDecimal totalAmount;
}
