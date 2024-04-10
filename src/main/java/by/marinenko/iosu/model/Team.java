package by.marinenko.iosu.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Formula;

import java.util.Objects;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Team extends ExtensibleEntity {

    @Id
    @GeneratedValue(generator = "team_id_seq")
    private Long id;

    private String name;

    private Long members;

    @Formula("(SELECT count(*) FROM team t JOIN project p ON p.team_id = t.id WHERE t.id = id)")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long projectCount;

    public String getLevel() {
        if (Objects.isNull(projectCount)) {
            return null;
        }

        if (projectCount < 2) {
            return "Novice";
        } else if (projectCount < 4) {
            return "Advanced";
        } else {
            return "Pro";
        }
    }

}
