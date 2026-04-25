package com.otaku.ecommerce.service;

import com.otaku.ecommerce.dto.CityResponseDTO;
import com.otaku.ecommerce.dto.ShippingCostResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Service
public class ShippingService {

    @Value("${binderbyte.api-key}")
    private String apiKey;

    @Value("${binderbyte.base-url}")
    private String baseUrl;

    private final RestTemplate restTemplate;

    public ShippingService() {
        this.restTemplate = new RestTemplate();
    }

    public List<CityResponseDTO.CityData> getCities() {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/list/city")
                .queryParam("api_key", apiKey)
                .toUriString();

        CityResponseDTO response = restTemplate.getForObject(url, CityResponseDTO.class);
        return response != null ? response.getData() : List.of();
    }

    public ShippingCostResponseDTO getShippingCost(String origin, String destination, Integer weight, String courier) {
        // origin = city ID asal (misal Jakarta)
        // destination = city ID tujuan
        // weight = berat dalam gram
        // courier = jne, jnt, sicepat, dll
        
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl + "/cost")
                .queryParam("api_key", apiKey)
                .queryParam("courier", courier)
                .queryParam("origin", origin)
                .queryParam("destination", destination)
                .queryParam("weight", weight)
                .toUriString();

        return restTemplate.getForObject(url, ShippingCostResponseDTO.class);
    }
}
