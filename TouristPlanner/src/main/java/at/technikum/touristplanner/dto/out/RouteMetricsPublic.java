package at.technikum.touristplanner.dto.out;

import lombok.Data;

@Data
public class RouteMetricsPublic implements IPublic {
    private int id;
    private double distanceKm;
    private int estimatedTimeMinutes;
}
