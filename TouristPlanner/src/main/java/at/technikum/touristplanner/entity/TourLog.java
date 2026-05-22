package at.technikum.touristplanner.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "tour_logs")
public class TourLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private Integer tourId;

    private String date;

    private String comment;

    private int difficulty;

    private double distance;

    private int time;

    private int rating;
}
