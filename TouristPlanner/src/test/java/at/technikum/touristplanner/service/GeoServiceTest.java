package at.technikum.touristplanner.service;

import at.technikum.touristplanner.dto.openrouteservice.Feature;
import at.technikum.touristplanner.dto.openrouteservice.GeocodeSearchResponse;
import at.technikum.touristplanner.dto.openrouteservice.Geometry;
import at.technikum.touristplanner.dto.openrouteservice.RouteResponse;
import at.technikum.touristplanner.dto.service.Coordinates;
import at.technikum.touristplanner.service.client.OpenRouteServiceClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GeoServiceTest {

    @Mock
    private OpenRouteServiceClient openRouteServiceClient;

    private GeoService geoService;

    @BeforeEach
    void setUp() {
        ObjectMapper objectMapper = new ObjectMapper();
        geoService = new GeoService("test-api-key", openRouteServiceClient, objectMapper);
    }

    @Test
    void findCoordinates_returnsEmptyWhenNoFeatures() {
        GeocodeSearchResponse response = new GeocodeSearchResponse();
        response.setFeatures(List.of());

        when(openRouteServiceClient.geocodeSearch(eq("test-api-key"), eq("Nowhere")))
                .thenReturn(response);

        Optional<Coordinates> result = geoService.findCoordinates("Nowhere");

        assertTrue(result.isEmpty());
    }

    @Test
    void findCoordinates_returnsCoordinatesWhenFound() {
        Geometry geometry = new Geometry();
        geometry.setCoordinates(List.of(16.37, 48.21));

        Feature feature = new Feature();
        feature.setGeometry(geometry);

        GeocodeSearchResponse response = new GeocodeSearchResponse();
        response.setFeatures(List.of(feature));

        when(openRouteServiceClient.geocodeSearch(eq("test-api-key"), eq("Vienna")))
                .thenReturn(response);

        Optional<Coordinates> result = geoService.findCoordinates("Vienna");

        assertTrue(result.isPresent());
        assertEquals(48.21, result.get().getLatitude());
        assertEquals(16.37, result.get().getLongitude());
    }

    @Test
    void getRoute_returnsEmptyWhenResponseIsNull() {
        Coordinates from = new Coordinates(48.21, 16.37);
        Coordinates to = new Coordinates(47.07, 15.44);

        when(openRouteServiceClient.getRoute(eq("test-api-key"), any()))
                .thenReturn(null);

        Optional<RouteResponse> result = geoService.getRoute(from, to);

        assertTrue(result.isEmpty());
    }

    @Test
    void getRoute_returnsRouteWhenValid() {
        Coordinates from = new Coordinates(48.21, 16.37);
        Coordinates to = new Coordinates(47.07, 15.44);

        RouteResponse routeResponse = mock(RouteResponse.class);
        RouteResponse.Feature feature = mock(RouteResponse.Feature.class);

        when(routeResponse.getFeatures()).thenReturn(List.of(feature));
        when(openRouteServiceClient.getRoute(eq("test-api-key"), any()))
                .thenReturn(routeResponse);

        Optional<RouteResponse> result = geoService.getRoute(from, to);

        assertTrue(result.isPresent());
        assertEquals(routeResponse, result.get());
    }
}
