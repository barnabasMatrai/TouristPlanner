package at.technikum.touristplanner.service;

import at.technikum.touristplanner.dto.in.TourLogCreate;
import at.technikum.touristplanner.entity.TourLog;
import at.technikum.touristplanner.exception.EntityNotFoundException;
import at.technikum.touristplanner.mapper.TourLogMapper;
import at.technikum.touristplanner.repository.TourLogRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TourLogService {
    private final TourLogMapper tourLogMapper;
    private final TourLogRepository tourLogRepository;

    public TourLog create(TourLogCreate tourLogCreate) {
        TourLog tourLog = tourLogMapper.toEntity(tourLogCreate);
        return tourLogRepository.save(tourLog);
    }

    public List<TourLog> getAll() {
        return tourLogRepository.findAll();
    }

    public TourLog get(int id) {
        return tourLogRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);
    }

    public TourLog update(int id, TourLogCreate tourLogCreate) {
        TourLog existingTourLog = tourLogRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        TourLog updatedTourLog = tourLogMapper.toEntity(tourLogCreate);

        updatedTourLog.setId(existingTourLog.getId());

        return tourLogRepository.save(updatedTourLog);
    }

    public void delete(int id) {
        TourLog tourLog = tourLogRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        tourLogRepository.delete(tourLog);
    }
}
