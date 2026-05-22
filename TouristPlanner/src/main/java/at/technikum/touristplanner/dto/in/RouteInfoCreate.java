package at.technikum.touristplanner.dto.in;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RouteInfoCreate implements ICreate {
    @NotBlank
    private String from;

    @NotBlank
    private String to;

    @NotBlank
    private String transportType;

    @NotBlank
    private String routeInformation;
}
