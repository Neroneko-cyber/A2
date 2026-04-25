package com.otaku.ecommerce.controller;

import com.otaku.ecommerce.dto.ApiResponse;
import com.otaku.ecommerce.dto.CityResponseDTO;
import com.otaku.ecommerce.dto.ShippingCostResponseDTO;
import com.otaku.ecommerce.service.ShippingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/shipping")
public class ShippingController {

    @Autowired
    private ShippingService shippingService;

    @GetMapping("/cities")
    public ResponseEntity<ApiResponse<List<CityResponseDTO.CityData>>> getCities() {
        List<CityResponseDTO.CityData> cities = shippingService.getCities();
        return ResponseEntity.ok(ApiResponse.success("OTK-3001", "Daftar kota berhasil diambil", cities));
    }

    @GetMapping("/cost")
    public ResponseEntity<ApiResponse<ShippingCostResponseDTO>> getCost(
            @RequestParam String origin,
            @RequestParam String destination,
            @RequestParam Integer weight,
            @RequestParam String courier) {
        
        ShippingCostResponseDTO cost = shippingService.getShippingCost(origin, destination, weight, courier);
        return ResponseEntity.ok(ApiResponse.success("OTK-3002", "Biaya ongkir berhasil dihitung", cost));
    }
}
