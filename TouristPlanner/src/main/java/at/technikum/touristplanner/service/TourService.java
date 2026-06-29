package at.technikum.touristplanner.service;

import at.technikum.touristplanner.dto.in.RouteInfoCreate;
import at.technikum.touristplanner.dto.in.RouteMetricsCreate;
import at.technikum.touristplanner.dto.in.TourCreate;
import at.technikum.touristplanner.dto.openrouteservice.RouteRequest;
import at.technikum.touristplanner.dto.openrouteservice.RouteResponse;
import at.technikum.touristplanner.dto.service.Coordinates;
import at.technikum.touristplanner.entity.RouteInfo;
import at.technikum.touristplanner.entity.RouteMetrics;
import at.technikum.touristplanner.entity.Tour;
import at.technikum.touristplanner.entity.User;
import at.technikum.touristplanner.exception.EntityNotFoundException;
import at.technikum.touristplanner.exception.InvalidLocationException;
import at.technikum.touristplanner.mapper.TourMapper;
import at.technikum.touristplanner.repository.TourRepository;
import at.technikum.touristplanner.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class TourService {
    private final TourMapper tourMapper;
    private final TourRepository tourRepository;
    private final UserRepository userRepository;
    private final GeoService geoService;

    private record ResolvedRoute(
            Coordinates from,
            Coordinates to,
            RouteResponse route
    ) {}

    public Tour create(TourCreate tourCreate) {
        User user = userRepository.findById(tourCreate.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        RouteInfoCreate routeInfoCreate = tourCreate.getRoute();
        ResolvedRoute resolvedRoute = resolveRoute(routeInfoCreate);

        RouteResponse.Summary summary =
                resolvedRoute.route()
                        .getFeatures()
                        .getFirst()
                        .getProperties()
                        .getSummary();
        Tour tour = tourMapper.toEntity(tourCreate);
        tour.setUser(user);

        RouteMetrics metrics = tour.getMetrics();

        metrics.setDistanceKm(summary.getDistance());
        metrics.setEstimatedTimeMinutes((int) summary.getDuration());

        enrichRouteInfo(
                tour.getRoute(),
                resolvedRoute.from(),
                resolvedRoute.to(),
                resolvedRoute.route()
        );

        return tourRepository.save(tour);
    }

    public List<Tour> getAll() {
        return tourRepository.findAll();
    }

    public Tour get(int id) {
        return tourRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);
    }

    public Tour update(int id, TourCreate tourCreate) {
        Tour existingTour = tourRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        RouteInfoCreate routeInfoCreate = tourCreate.getRoute();
        ResolvedRoute resolvedRoute = resolveRoute(routeInfoCreate);

        RouteResponse.Summary summary =
                resolvedRoute.route()
                        .getFeatures()
                        .getFirst()
                        .getProperties()
                        .getSummary();
        Tour updatedTour = tourMapper.toEntity(tourCreate);
        updatedTour.setId(existingTour.getId());

        RouteMetrics metrics = updatedTour.getMetrics();

        metrics.setDistanceKm(summary.getDistance());
        metrics.setEstimatedTimeMinutes((int) summary.getDuration());

        enrichRouteInfo(
                updatedTour.getRoute(),
                resolvedRoute.from(),
                resolvedRoute.to(),
                resolvedRoute.route()
        );

        return tourRepository.save(updatedTour);
    }

    public void delete(int id) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        tourRepository.delete(tour);
    }

    private ResolvedRoute resolveRoute(RouteInfoCreate routeInfoCreate) {

        String fromLocation = routeInfoCreate.getFrom();
        Coordinates fromCoordinates = geoService.findCoordinates(fromLocation)
                .orElseThrow(() -> new InvalidLocationException(fromLocation));

        String toLocation = routeInfoCreate.getTo();
        Coordinates toCoordinates = geoService.findCoordinates(toLocation)
                .orElseThrow(() -> new InvalidLocationException(toLocation));

        RouteResponse route = geoService.getRoute(fromCoordinates, toCoordinates)
                .orElseThrow(() -> new RuntimeException("Route not found"));

        return new ResolvedRoute(fromCoordinates, toCoordinates, route);
    }

    private void enrichRouteInfo(RouteInfo routeInfo,
                                 Coordinates fromCoordinates,
                                 Coordinates toCoordinates,
                                 RouteResponse route) {

        routeInfo.setFromLatitude(fromCoordinates.getLatitude());
        routeInfo.setFromLongitude(fromCoordinates.getLongitude());

        routeInfo.setToLatitude(toCoordinates.getLatitude());
        routeInfo.setToLongitude(toCoordinates.getLongitude());

        routeInfo.setRouteGeometry(geoService.getRouteGeometry(route));
    }
}
