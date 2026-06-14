package at.technikum.touristplanner.service.client;

import at.technikum.touristplanner.dto.openrouteservice.GeocodeSearchResponse;
import at.technikum.touristplanner.dto.openrouteservice.RouteRequest;
import at.technikum.touristplanner.dto.openrouteservice.RouteResponse;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;
import org.springframework.web.service.annotation.PostExchange;

@HttpExchange(url = "https://api.openrouteservice.org")
public interface OpenRouteServiceClient {

    @GetExchange("/geocode/search")
    GeocodeSearchResponse geocodeSearch(
            @RequestParam(name = "api_key") String apiKey,
            @RequestParam String text
    );

    @PostExchange("/v2/directions/driving-car/geojson")
    RouteResponse getRoute(
            @RequestHeader("Authorization") String apiKey,
            @RequestBody RouteRequest request
    );
}
