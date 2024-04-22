package by.marinenko.iosu.repository;

import by.marinenko.iosu.model.Material;
import by.marinenko.iosu.projection.MaterialsByProject;
import by.marinenko.iosu.projection.TechMaterialUnion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

interface InternalMaterialRepository extends JpaRepository<Material, Long> {

    @Query(value = """
    SELECT u.id, u.name, s.name as supplierName, u.type FROM (
        (SELECT id, name, supplier_id, 'MATERIAL' as type FROM material)
        UNION
        (SELECT id, name, supplier_id, 'TECH' FROM tech)
    )
    u JOIN supplier s ON u.supplier_id = s.id
    ORDER BY u.name;
    """, nativeQuery = true)
    List<TechMaterialUnion> findMaterialAndTechnologies();

    @Query(value = """
    SELECT p.id, c.name as clientName, m.name as materialName, mfp.quantity
    FROM project p
    JOIN client c on c.id = p.client_id
    JOIN material_for_project mfp on p.id = mfp.project_id
    JOIN material m on mfp.material_id = m.id
    ORDER BY p.start_date
    """, nativeQuery = true)
    List<MaterialsByProject> findMaterialsByProject();

}
