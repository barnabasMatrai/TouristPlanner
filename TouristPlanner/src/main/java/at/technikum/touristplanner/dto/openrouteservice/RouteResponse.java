package at.technikum.touristplanner.dto.openrouteservice;

import java.util.List;

public class RouteResponse {

    private List<Feature> features;

    public List<Feature> getFeatures() {
        return features;
    }

    public static class Feature {
        private RouteGeometry geometry;
        private Properties properties;

        public RouteGeometry getGeometry() { return geometry; }
        public Properties getProperties() { return properties; }
    }

    public static class Properties {
        private Summary summary;

        public Summary getSummary() { return summary; }
    }

    public static class Summary {
        private double distance;
        private double duration;

        public double getDistance() { return distance; }
        public double getDuration() { return duration; }
    }
}
