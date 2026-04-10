package com.rehema.zoo.service;

import com.rehema.zoo.dto.PaymentDto;
import com.rehema.zoo.model.Booking;
import com.rehema.zoo.model.Payment;
import com.rehema.zoo.repository.BookingRepository;
import com.rehema.zoo.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    @Transactional
    public PaymentDto processPayment(PaymentDto dto) {
        Booking booking = bookingRepository.findById(dto.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (paymentRepository.findByBookingId(booking.getId()).isPresent()) {
            throw new RuntimeException("Payment already processed for this booking");
        }

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setPaymentStatus("SUCCESS"); // Simulating successful payment
        payment.setPaymentDate(LocalDateTime.now());

        Payment savedPayment = paymentRepository.save(payment);
        return mapToDto(savedPayment);
    }

    public List<PaymentDto> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private PaymentDto mapToDto(Payment payment) {
        PaymentDto dto = new PaymentDto();
        dto.setId(payment.getId());
        dto.setBookingId(payment.getBooking().getId());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setPaymentStatus(payment.getPaymentStatus());
        dto.setPaymentDate(payment.getPaymentDate());
        return dto;
    }
}
