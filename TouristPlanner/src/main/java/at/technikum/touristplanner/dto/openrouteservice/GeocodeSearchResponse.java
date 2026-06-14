package at.technikum.touristplanner.dto.openrouteservice;

import lombok.Data;

import java.util.List;

@Data
public class GeocodeSearchResponse {
    private String type;
    private List<Feature> features;
}
