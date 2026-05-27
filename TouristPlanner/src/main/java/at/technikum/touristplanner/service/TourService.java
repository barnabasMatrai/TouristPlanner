package at.technikum.touristplanner.service;

import at.technikum.touristplanner.dto.in.TourCreate;
import at.technikum.touristplanner.entity.Tour;
import at.technikum.touristplanner.exception.EntityNotFoundException;
import at.technikum.touristplanner.mapper.TourMapper;
import at.technikum.touristplanner.repository.TourRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@AllArgsConstructor
public class TourService {
    private final TourMapper tourMapper;
    private final TourRepository tourRepository;

    public Tour create(TourCreate tourCreate) {
        Tour tour = tourMapper.toEntity(tourCreate);
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

        Tour updatedTour = tourMapper.toEntity(tourCreate);

        updatedTour.setId(existingTour.getId());

        return tourRepository.save(updatedTour);
    }

    public void delete(int id) {
        Tour tour = tourRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        tourRepository.delete(tour);
    }
}
