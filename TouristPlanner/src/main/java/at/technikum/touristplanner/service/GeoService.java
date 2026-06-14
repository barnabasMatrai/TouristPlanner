package at.technikum.touristplanner.service;

import at.technikum.touristplanner.dto.openrouteservice.GeocodeSearchResponse;
import at.technikum.touristplanner.dto.openrouteservice.Geometry;
import at.technikum.touristplanner.dto.openrouteservice.RouteRequest;
import at.technikum.touristplanner.dto.openrouteservice.RouteResponse;
import at.technikum.touristplanner.dto.service.Coordinates;
import at.technikum.touristplanner.service.client.OpenRouteServiceClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GeoService {

    private final String openRouteServiceApiKey;
    private final OpenRouteServiceClient openRouteServiceClient;

    public GeoService(
            @Value("${openrouteservice.api-key}") String openRouteServiceApiKey,
            OpenRouteServiceClient openRouteServiceClient
    ) {
        this.openRouteServiceApiKey = openRouteServiceApiKey;
        this.openRouteServiceClient = openRouteServiceClient;
    }

    public Optional<Coordinates> findCoordinates(String query) {
        GeocodeSearchResponse geocodeSearchResponse = openRouteServiceClient.geocodeSearch(openRouteServiceApiKey, query);

        if (geocodeSearchResponse.getFeatures().isEmpty()) {
            return Optional.empty();
        }

        Geometry geometry = geocodeSearchResponse.getFeatures().getFirst().getGeometry();
        Coordinates coordinates = new Coordinates(
                geometry.getCoordinates().getLast(),
                geometry.getCoordinates().getFirst()
        );

        return Optional.of(coordinates);
    }

    public Optional<RouteResponse> getRoute(Coordinates from, Coordinates to) {

        List<List<Double>> coords = List.of(
                List.of(from.getLongitude(), from.getLatitude()),
                List.of(to.getLongitude(), to.getLatitude())
        );

        RouteRequest request = new RouteRequest(coords);

        RouteResponse response =
                openRouteServiceClient.getRoute(openRouteServiceApiKey, request);

        if (response == null ||
                response.getFeatures() == null ||
                response.getFeatures().isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(response);
    }
}