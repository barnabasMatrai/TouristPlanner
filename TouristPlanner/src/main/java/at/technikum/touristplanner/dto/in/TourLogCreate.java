package at.technikum.touristplanner.dto.in;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class TourLogCreate implements ICreate {
    private int tourId;

    @NotBlank
    private String date;

    @NotBlank
    private String comment;

    @Min(1)
    @Max(5)
    private int difficulty;

    @Positive
    private double distance;

    @Positive
    private int time;

    @Min(1)
    @Max(5)
    private int rating;
}
