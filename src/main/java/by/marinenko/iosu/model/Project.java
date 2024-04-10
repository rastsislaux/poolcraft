package by.marinenko.iosu.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Project extends ExtensibleEntity {

    @Id
    @GeneratedValue(generator = "project_id_seq")
    private Long id;

    @ManyToOne
    private Client client;

    @ManyToOne
    private Team team;

    private String type;

    private Long price;

    @Column(name = "start_date")
    private LocalDate startDate;

    private LocalDate date;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<MaterialForProject> materials;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<TechForProject> techs;

}
