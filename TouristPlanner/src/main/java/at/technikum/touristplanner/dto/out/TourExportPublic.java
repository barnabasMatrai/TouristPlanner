package at.technikum.touristplanner.dto.out;

import lombok.Data;

@Data
public class TourExportPublic {
    private String name;
    private String description;
    private RouteInfoPublic route;
    private RouteMetricsPublic metrics;
}
