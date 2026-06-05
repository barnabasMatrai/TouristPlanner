package at.technikum.touristplanner.mapper;

import at.technikum.touristplanner.dto.in.UserCreate;
import at.technikum.touristplanner.dto.out.UserLoginPublic;
import at.technikum.touristplanner.dto.out.UserPublic;
import at.technikum.touristplanner.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {
    User toEntity(UserCreate userIn);

    @Mapping(target = "passwordHash", ignore = true)
    @Mapping(target = "tours", ignore = true)
    UserPublic toObject(User user);

    UserLoginPublic toLoginObject(User user);
}
