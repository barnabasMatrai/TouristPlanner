package at.technikum.touristplanner.dto.out;

import lombok.Data;

@Data
public class RouteInfoPublic implements IPublic {
    private int id;
    private String from;
    private String to;
    private String transportType;
    private String routeInformation;
}
