package at.technikum.touristplanner.dto;

import org.springframework.web.bind.annotation.RequestMapping;

public class TodoDto {
    private int id;
    private String name;
    private boolean done;

    public TodoDto(int id, String name, boolean done) {
        this.id = id;
        this.name = name;
        this.done = done;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public boolean getDone() {
        return done;
    }
}
