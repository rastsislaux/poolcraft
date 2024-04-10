package by.marinenko.iosu.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

public abstract class ExtensibleEntity {

    @Getter
    @Setter
    private transient Map<String, String> additionalColumns;

    public abstract Long getId();

}
