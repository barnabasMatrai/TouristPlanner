package at.technikum.touristplanner.mapper;

import at.technikum.touristplanner.dto.in.RouteInfoCreate;
import at.technikum.touristplanner.dto.in.RouteMetricsCreate;
import at.technikum.touristplanner.dto.in.TourCreate;
import at.technikum.touristplanner.dto.out.TourPublic;
import at.technikum.touristplanner.entity.RouteInfo;
import at.technikum.touristplanner.entity.RouteMetrics;
import at.technikum.touristplanner.entity.Tour;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface TourMapper {
    @Mapping(target = "user", ignore = true)
    Tour toEntity(TourCreate tourIn);
    @Mapping(target = "userId", source = "user.id")
    TourPublic toObject(Tour tour);
    RouteInfo toEntity(RouteInfoCreate dto);
    RouteMetrics toEntity(RouteMetricsCreate dto);
}
