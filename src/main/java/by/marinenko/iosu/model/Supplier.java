package by.marinenko.iosu.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Supplier extends ExtensibleEntity {

    @Id
    @GeneratedValue(generator = "supplier_id_seq")
    private Long id;

    private String name;

}
