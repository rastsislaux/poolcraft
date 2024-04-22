package by.marinenko.iosu.projection;

import java.time.LocalDate;

public interface Deadlines {
    Long getId();
    String getName();
    LocalDate getStartDate();
    LocalDate getDate();
}
