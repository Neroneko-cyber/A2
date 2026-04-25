package com.otaku.ecommerce.dto;

import java.util.List;

public class ShippingCostResponseDTO {
    private Integer status;
    private String message;
    private Data data;

    public static class Data {
        private List<CostDetail> costs;

        public List<CostDetail> getCosts() { return costs; }
        public void setCosts(List<CostDetail> costs) { this.costs = costs; }
    }

    public static class CostDetail {
        private String service;
        private String description;
        private Integer cost;
        private String etd;

        public String getService() { return service; }
        public void setService(String service) { this.service = service; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public Integer getCost() { return cost; }
        public void setCost(Integer cost) { this.cost = cost; }
        public String getEtd() { return etd; }
        public void setEtd(String etd) { this.etd = etd; }
    }

    public Integer getStatus() { return status; }
    public void setStatus(Integer status) { this.status = status; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public Data getData() { return data; }
    public void setData(Data data) { this.data = data; }
}
