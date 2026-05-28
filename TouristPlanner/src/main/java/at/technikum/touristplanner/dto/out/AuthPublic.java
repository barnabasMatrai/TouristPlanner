package at.technikum.touristplanner.dto.out;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthPublic implements IPublic {
    private String accessToken;
}
