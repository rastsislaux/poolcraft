package by.marinenko.iosu.projection;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.DurationSerializer;

import java.time.Duration;

public interface IDuration {
    Long getId();
    String getName();

    Integer getDuration();
}
