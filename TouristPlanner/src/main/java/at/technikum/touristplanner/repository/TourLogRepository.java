package at.technikum.touristplanner.repository;

import at.technikum.touristplanner.entity.TourLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TourLogRepository extends JpaRepository<TourLog, Integer> {
}
