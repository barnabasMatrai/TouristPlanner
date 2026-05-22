package at.technikum.touristplanner.dto.out;

import at.technikum.touristplanner.dto.in.TourCreate;
import lombok.Data;

import java.util.List;

@Data
public class UserPublic implements IPublic {
    private int id;
    private String username;
    private String email;
    private String passwordHash;
    private List<TourCreate> tours;
}
