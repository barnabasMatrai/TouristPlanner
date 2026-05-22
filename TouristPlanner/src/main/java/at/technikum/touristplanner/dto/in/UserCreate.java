package at.technikum.touristplanner.dto.in;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.util.List;

@Data
public class UserCreate implements ICreate {
    @NotBlank
    private String username;

    @NotBlank
    private String email;

    @NotBlank
    private String passwordHash;

    @NotNull
    private List<TourCreate> tours;
}
