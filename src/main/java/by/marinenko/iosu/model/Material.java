package by.marinenko.iosu.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Material extends ExtensibleEntity {

    @Id
    @GeneratedValue(generator = "material_id_seq")
    private Long id;

    private String name;

    private Long quantity;

    private String unit;

    @ManyToOne(fetch = FetchType.EAGER)
    private Supplier supplier;

}
