package at.technikum.touristplanner.controller;

import at.technikum.touristplanner.dto.in.TourCreate;
import at.technikum.touristplanner.dto.out.TourPublic;
import at.technikum.touristplanner.entity.Tour;
import at.technikum.touristplanner.mapper.TourMapper;
import at.technikum.touristplanner.service.TourService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tours")
@AllArgsConstructor
@CrossOrigin
public class TourController {
    private final TourMapper tourMapper;
    private final TourService tourService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TourPublic create(@Valid @RequestBody TourCreate tourIn) {
        Tour tour = tourService.create(tourIn);
        return tourMapper.toObject(tour);
    }

    @GetMapping("/{id}")
    public TourPublic read(@PathVariable int id) {
        Tour tour = tourService.get(id);
        return tourMapper.toObject(tour);
    }

    @GetMapping
    public List<TourPublic> readAll() {
        return tourService.getAll().stream()
                .map(tourMapper::toObject)
                .toList();
    }

    @PutMapping("/{id}")
    public TourPublic update(@PathVariable int id, @RequestBody TourCreate tourIn) {
        Tour tour = tourService.update(id, tourIn);
        return tourMapper.toObject(tour);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id) {
        tourService.delete(id);
    }
}
