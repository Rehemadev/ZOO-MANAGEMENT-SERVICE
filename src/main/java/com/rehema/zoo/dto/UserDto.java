package com.rehema.zoo.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String fullName;
    private String email;
    private String role;
    private boolean enabled;
}
