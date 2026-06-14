package at.technikum.touristplanner.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "route_infos")
public class RouteInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "from_location")
    private String from;

    @Column(name = "to_location")
    private String to;

    @Column(name = "from_latitude")
    private Double fromLatitude;

    @Column(name = "from_longitude")
    private Double fromLongitude;

    @Column(name = "to_latitude")
    private Double toLatitude;

    @Column(name = "to_longitude")
    private Double toLongitude;

    @Column(columnDefinition = "TEXT")
    private String routeGeometry;

    private String transportType;

    private String routeInformation;
}
