package at.technikum.touristplanner.mapper;

import at.technikum.touristplanner.dto.in.TourLogCreate;
import at.technikum.touristplanner.dto.out.TourLogPublic;
import at.technikum.touristplanner.entity.TourLog;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TourLogMapper {
    TourLog toEntity(TourLogCreate tourLogIn);
    TourLogPublic toObject(TourLog tourLog);
}
