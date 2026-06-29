package at.technikum.touristplanner.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "route_metrics")
public class RouteMetrics {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Double distanceKm;

    private Integer estimatedTimeMinutes;

    public void setDistanceKm(Double distanceM) {
        if (distanceM == null) {
            return;
        }
        // The API gives distance in meters, must divide by 1000 for kilometers
        double kms = distanceM / 1000;
        this.distanceKm = BigDecimal.valueOf(kms)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
    }

    public void setEstimatedTimeMinutes(Integer seconds) {
        if (seconds == null) {
            return;
        }

        // The API gives time in seconds, must divide by 60 for minutes
        this.estimatedTimeMinutes = seconds / 60;
    }
}
