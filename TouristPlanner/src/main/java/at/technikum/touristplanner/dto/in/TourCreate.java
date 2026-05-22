package at.technikum.touristplanner.dto.in;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TourCreate implements ICreate {
    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotNull
    private RouteInfoCreate route;

    @NotNull
    private RouteMetricsCreate metrics;
}
