package at.technikum.touristplanner.controller;

import at.technikum.touristplanner.dto.in.TourLogCreate;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tours/{tour-id}/tourlogs")
@CrossOrigin
public class TourLogController {
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TourLogCreate create(@RequestBody TourLogCreate dto) {
        return dto;
    }

    @GetMapping("/{id}")
    public TourLogCreate read(@PathVariable int id) {
        return null;
    }

    @GetMapping
    public List<TourLogCreate> readAll() {
        return List.of();
    }

    @PutMapping("/{id}")
    public TourLogCreate update(@PathVariable int id, @RequestBody TourLogCreate dto) {
        return dto;
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id) {

    }
}
