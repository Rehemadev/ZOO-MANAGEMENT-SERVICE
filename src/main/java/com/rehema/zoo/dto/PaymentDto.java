package com.rehema.zoo.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PaymentDto {
    private Long id;
    private Long bookingId;
    private String paymentMethod;
    private String paymentStatus;
    private LocalDateTime paymentDate;
}
