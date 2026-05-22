package at.technikum.touristplanner.controller;

import at.technikum.touristplanner.dto.in.TourCreate;
import at.technikum.touristplanner.entity.Tour;
import at.technikum.touristplanner.mapper.TourMapper;
import at.technikum.touristplanner.service.TourService;
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
    public TourCreate create(@RequestBody TourCreate tourIn) {
        Tour tour = tourService.create(tourIn);
        return tourMapper.toObject(tour);
    }

    @GetMapping("/{id}")
    public TourCreate read(@PathVariable int id) {
        return null;
    }

    @GetMapping
    public List<TourCreate> readAll() {
        return List.of();
    }

    @PutMapping("/{id}")
    public TourCreate update(@PathVariable int id, @RequestBody TourCreate dto) {
        return dto;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id) {

    }
}
