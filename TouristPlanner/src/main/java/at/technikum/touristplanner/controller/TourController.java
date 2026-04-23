package at.technikum.touristplanner.controller;

import at.technikum.touristplanner.dto.TourDto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tours")
public class TourController extends BaseController<TourDto> {
}
