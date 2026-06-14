package at.technikum.touristplanner.dto.out;

import at.technikum.touristplanner.dto.in.RouteInfoCreate;
import at.technikum.touristplanner.dto.in.RouteMetricsCreate;
import lombok.Data;

@Data
public class TourPublic implements IPublic {
    private int id;
    private String name;
    private String description;
    private RouteInfoPublic route;
    private RouteMetricsPublic metrics;
}
