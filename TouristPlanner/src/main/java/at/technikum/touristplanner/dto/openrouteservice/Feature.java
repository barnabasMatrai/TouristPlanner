package at.technikum.touristplanner.dto.openrouteservice;

import lombok.Data;

@Data
public class Feature {
    private String type;
    private Geometry geometry;
}
