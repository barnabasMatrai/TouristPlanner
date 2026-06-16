package at.technikum.touristplanner.service;

import at.technikum.touristplanner.dto.in.TourLogCreate;
import at.technikum.touristplanner.entity.TourLog;
import at.technikum.touristplanner.exception.EntityNotFoundException;
import at.technikum.touristplanner.mapper.TourLogMapper;
import at.technikum.touristplanner.repository.TourLogRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TourLogServiceTest {

    @Mock
    private TourLogMapper tourLogMapper;

    @Mock
    private TourLogRepository tourLogRepository;

    @InjectMocks
    private TourLogService tourLogService;

    @Test
    void create_savesAndReturnsTourLog() {
        TourLogCreate create = new TourLogCreate();
        create.setTourId(1);
        create.setComment("Great ride");

        TourLog entity = new TourLog();
        entity.setTourId(1);
        entity.setComment("Great ride");

        TourLog saved = new TourLog();
        saved.setId(10);
        saved.setTourId(1);
        saved.setComment("Great ride");

        when(tourLogMapper.toEntity(create)).thenReturn(entity);
        when(tourLogRepository.save(entity)).thenReturn(saved);

        TourLog result = tourLogService.create(create);

        assertEquals(10, result.getId());
        assertEquals("Great ride", result.getComment());
    }

    @Test
    void get_returnsTourLogWhenExists() {
        TourLog tourLog = new TourLog();
        tourLog.setId(5);
        tourLog.setComment("Easy trail");

        when(tourLogRepository.findById(5)).thenReturn(Optional.of(tourLog));

        TourLog result = tourLogService.get(5);

        assertEquals("Easy trail", result.getComment());
    }

    @Test
    void get_throwsEntityNotFoundWhenMissing() {
        when(tourLogRepository.findById(99)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> tourLogService.get(99));
    }

    @Test
    void update_preservesId() {
        TourLogCreate create = new TourLogCreate();
        create.setComment("Updated");

        TourLog existing = new TourLog();
        existing.setId(3);

        TourLog updated = new TourLog();
        updated.setComment("Updated");

        TourLog saved = new TourLog();
        saved.setId(3);
        saved.setComment("Updated");

        when(tourLogRepository.findById(3)).thenReturn(Optional.of(existing));
        when(tourLogMapper.toEntity(create)).thenReturn(updated);
        when(tourLogRepository.save(updated)).thenReturn(saved);

        TourLog result = tourLogService.update(3, create);

        assertEquals(3, result.getId());
        assertEquals("Updated", result.getComment());
        assertEquals(3, updated.getId());
    }

    @Test
    void delete_removesTourLog() {
        TourLog tourLog = new TourLog();
        tourLog.setId(7);

        when(tourLogRepository.findById(7)).thenReturn(Optional.of(tourLog));

        tourLogService.delete(7);

        verify(tourLogRepository).delete(tourLog);
    }
}
