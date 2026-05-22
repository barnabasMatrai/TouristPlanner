package at.technikum.touristplanner.dto.out;

import lombok.Data;

@Data
public class TourLogPublic implements IPublic {
    private int id;
    private int tourId;
    private String date;
    private String comment;
    private int difficulty;
    private double distance;
    private int time;
    private int rating;
}
