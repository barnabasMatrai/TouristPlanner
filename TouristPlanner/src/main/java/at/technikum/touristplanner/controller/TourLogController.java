package at.technikum.touristplanner.controller;

import at.technikum.touristplanner.dto.TourLogDto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tours/{tour-id}/tourlogs")
public class TourLogController extends BaseController<TourLogDto> {
}
