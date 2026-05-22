package at.technikum.touristplanner.dto.in;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthCreate implements ICreate {
    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
