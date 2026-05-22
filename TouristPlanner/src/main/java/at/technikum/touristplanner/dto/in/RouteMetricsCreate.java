package at.technikum.touristplanner.dto.in;

import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class RouteMetricsCreate implements ICreate {
    @Positive
    private double distanceKm;

    @Positive
    private int estimatedTimeMinutes;
}
