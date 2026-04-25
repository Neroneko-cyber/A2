package com.otaku.ecommerce.dto;

import java.util.List;

public class CityResponseDTO {
    private Integer status;
    private String message;
    private List<CityData> data;

    public static class CityData {
        private String id;
        private String name;

        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }

    public Integer getStatus() { return status; }
    public void setStatus(Integer status) { this.status = status; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public List<CityData> getData() { return data; }
    public void setData(List<CityData> data) { this.data = data; }
}
