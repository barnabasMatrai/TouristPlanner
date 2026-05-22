package at.technikum.touristplanner.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "tours")
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String name;

    private String description;

    @OneToOne(cascade = CascadeType.ALL)
    private RouteInfo route;

    @OneToOne(cascade = CascadeType.ALL)
    private RouteMetrics metrics;

}
