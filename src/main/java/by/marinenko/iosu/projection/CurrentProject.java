package by.marinenko.iosu.projection;

import java.time.LocalDate;

public interface CurrentProject {
    Long getId();
    String getName();
    String getType();
    LocalDate getStartDate();
    LocalDate getDate();
}
