package at.technikum.touristplanner.dto.service;

import lombok.Data;

@Data
public class Coordinates {
    private final double latitude;
    private final double longitude;

    @Override
    public String toString() {
        return "%s,%s".formatted(latitude, longitude);
    }
}
