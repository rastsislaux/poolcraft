package by.marinenko.iosu.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "material_for_project")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MaterialForProject extends ExtensibleEntity {

    @EmbeddedId
    private Key key;

    private Long quantity;

    @ManyToOne
    @PrimaryKeyJoinColumn
    @JoinColumn(updatable = false, insertable = false)
    @JsonIgnore
    private Project project;

    @ManyToOne
    @PrimaryKeyJoinColumn
    @JoinColumn(updatable = false, insertable = false)
    private Material material;

    // Additional columns are not applicable for this.
    @Override
    public Long getId() {
        return null;
    }

    @Data
    @Embeddable
    public static class Key implements Serializable {

        @Column(name = "project_id")
        private Long projectId;

        @Column(name = "material_id")
        private Long materialId;

    }

}
