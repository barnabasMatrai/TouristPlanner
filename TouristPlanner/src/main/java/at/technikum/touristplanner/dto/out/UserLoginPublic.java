package at.technikum.touristplanner.dto.out;

import lombok.Data;

@Data
public class UserLoginPublic implements IPublic {
    private int id;
    private String username;
}
