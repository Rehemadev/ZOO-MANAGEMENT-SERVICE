package com.rehema.zoo.service;

import com.rehema.zoo.dto.BookingDto;
import com.rehema.zoo.model.Booking;
import com.rehema.zoo.model.User;
import com.rehema.zoo.repository.BookingRepository;
import com.rehema.zoo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    
    // Hardcoded price per ticket for simplicity
    private static final BigDecimal TICKET_PRICE = new BigDecimal("20.00");

    @Transactional
    public BookingDto createBooking(BookingDto dto) {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found in database"));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBookingDate(LocalDateTime.now());
        booking.setNumberOfTickets(dto.getNumberOfTickets());
        
        // Calculate total amount
        BigDecimal totalAmount = TICKET_PRICE.multiply(BigDecimal.valueOf(dto.getNumberOfTickets()));
        booking.setTotalAmount(totalAmount);

        Booking savedBooking = bookingRepository.save(booking);
        return mapToDto(savedBooking);
    }

    public List<BookingDto> getMyBookings() {
        String email = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
        return getBookingsByUser(user.getId());
    }

    public List<BookingDto> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<BookingDto> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private BookingDto mapToDto(Booking booking) {
        BookingDto dto = new BookingDto();
        dto.setId(booking.getId());
        dto.setUserId(booking.getUser().getId());
        dto.setUserEmail(booking.getUser().getEmail());
        dto.setBookingDate(booking.getBookingDate());
        dto.setNumberOfTickets(booking.getNumberOfTickets());
        dto.setTotalAmount(booking.getTotalAmount());
        return dto;
    }
}
