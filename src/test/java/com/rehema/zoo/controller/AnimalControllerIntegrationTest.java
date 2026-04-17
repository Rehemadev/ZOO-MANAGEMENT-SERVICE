package com.rehema.zoo.controller;

import com.rehema.zoo.BaseIntegrationTest;
import com.rehema.zoo.dto.AnimalDto;
import com.rehema.zoo.repository.AnimalRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class AnimalControllerIntegrationTest extends BaseIntegrationTest {

    @Autowired
    private AnimalRepository animalRepository;

    private String adminToken;

    @BeforeEach
    void setUp() throws Exception {
        animalRepository.deleteAll();
        adminToken = getAdminToken();
    }

    @Test
    void testCreateAnimal() throws Exception {
        AnimalDto animal = new AnimalDto();
        animal.setName("Simba");
        animal.setSpecies("Lion");
        animal.setAge(5);
        animal.setHealthStatus("HEALTHY");

        mockMvc.perform(post("/api/animals")
                .header("Authorization", "Bearer " + adminToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(animal)))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Simba"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.species").value("Lion"));
    }

    @Test
    void testGetAllAnimals() throws Exception {
        AnimalDto animal = new AnimalDto();
        animal.setName("Bambi");
        animal.setSpecies("Deer");
        animal.setAge(2);
        animal.setHealthStatus("HEALTHY");
        
        mockMvc.perform(post("/api/animals")
                .header("Authorization", "Bearer " + adminToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(animal)))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/animals")
                .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Bambi"));
    }

    @Test
    void testUnauthorizedAccess() throws Exception {
        mockMvc.perform(get("/api/animals"))
                .andExpect(status().isForbidden());
    }
}
