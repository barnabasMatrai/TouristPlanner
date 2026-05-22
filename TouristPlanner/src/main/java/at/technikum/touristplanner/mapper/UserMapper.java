package at.technikum.touristplanner.mapper;

import at.technikum.touristplanner.dto.in.UserCreate;
import at.technikum.touristplanner.dto.out.UserPublic;
import at.technikum.touristplanner.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    User toEntity(UserCreate userIn);
    UserPublic toObject(User user);
}
