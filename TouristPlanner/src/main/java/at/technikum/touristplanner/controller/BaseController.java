package at.technikum.touristplanner.controller;

import at.technikum.touristplanner.dto.IDto;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public abstract class BaseController<T extends IDto> {

    @PostMapping
    public T create(@RequestBody T dto) {
        return dto;
    }

    @GetMapping("/{id}")
    public T read(@PathVariable int id) {
        return null;
    }

    @GetMapping
    public List<T> readAll() {
        return List.of();
    }

    @PutMapping("/{id}")
    public T update(@PathVariable int id, @RequestBody T dto) {
        return dto;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
    }
}
