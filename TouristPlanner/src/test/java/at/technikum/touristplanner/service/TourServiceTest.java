package at.technikum.touristplanner.service;

import at.technikum.touristplanner.dto.in.TourCreate;
import at.technikum.touristplanner.entity.Tour;
import at.technikum.touristplanner.exception.EntityNotFoundException;
import at.technikum.touristplanner.mapper.TourMapper;
import at.technikum.touristplanner.repository.TourRepository;
import at.technikum.touristplanner.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TourServiceTest {

    @Mock
    private TourMapper tourMapper;

    @Mock
    private TourRepository tourRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private GeoService geoService;

    @InjectMocks
    private TourService tourService;

    @Test
    void get_throwsEntityNotFoundWhenMissing() {
        when(tourRepository.findById(99)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> tourService.get(99));
    }

    @Test
    void getAll_returnsAllTours() {
        Tour tour1 = new Tour();
        tour1.setId(1);
        tour1.setName("Alpine Loop");

        Tour tour2 = new Tour();
        tour2.setId(2);
        tour2.setName("City Ride");

        when(tourRepository.findAll()).thenReturn(List.of(tour1, tour2));

        List<Tour> result = tourService.getAll();

        assertEquals(2, result.size());
        assertEquals("Alpine Loop", result.get(0).getName());
    }

    @Test
    void update_preservesId() {
        TourCreate create = new TourCreate();
        create.setName("Updated Tour");

        Tour existing = new Tour();
        existing.setId(5);

        Tour updated = new Tour();
        updated.setName("Updated Tour");

        Tour saved = new Tour();
        saved.setId(5);
        saved.setName("Updated Tour");

        when(tourRepository.findById(5)).thenReturn(Optional.of(existing));
        when(tourMapper.toEntity(create)).thenReturn(updated);
        when(tourRepository.save(updated)).thenReturn(saved);

        Tour result = tourService.update(5, create);

        assertEquals(5, result.getId());
        assertEquals("Updated Tour", result.getName());
        assertEquals(5, updated.getId());
    }

    @Test
    void delete_removesTour() {
        Tour tour = new Tour();
        tour.setId(8);

        when(tourRepository.findById(8)).thenReturn(Optional.of(tour));

        tourService.delete(8);

        verify(tourRepository).delete(tour);
    }
}
