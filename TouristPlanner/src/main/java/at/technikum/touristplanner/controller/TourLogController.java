package at.technikum.touristplanner.controller;

import at.technikum.touristplanner.dto.in.TourLogCreate;
import at.technikum.touristplanner.dto.out.TourLogPublic;
import at.technikum.touristplanner.entity.TourLog;
import at.technikum.touristplanner.mapper.TourLogMapper;
import at.technikum.touristplanner.service.TourLogService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tours/{tour-id}/tourlogs")
@AllArgsConstructor
@CrossOrigin
public class TourLogController {
    private final TourLogService tourLogService;
    private final TourLogMapper tourLogMapper;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TourLogPublic create(@RequestBody TourLogCreate tourLogIn) {
        TourLog tourLog = tourLogService.create(tourLogIn);
        return tourLogMapper.toObject(tourLog);
    }

    @GetMapping("/{id}")
    public TourLogPublic read(@PathVariable int id) {
        TourLog tourLog = tourLogService.get(id);
        return tourLogMapper.toObject(tourLog);
    }

    @GetMapping
    public List<TourLogPublic> readAll() {
        return tourLogService.getAll().stream()
                .map(tourLogMapper::toObject)
                .toList();
    }

    @PutMapping("/{id}")
    public TourLogPublic update(@PathVariable int id, @RequestBody TourLogCreate tourLogIn) {
        TourLog tourLog = tourLogService.update(id, tourLogIn);
        return tourLogMapper.toObject(tourLog);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id) {
        tourLogService.delete(id);
    }
}
