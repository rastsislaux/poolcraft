package by.marinenko.iosu.repository;

import by.marinenko.iosu.model.ExtensibleEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public abstract class BaseRepository<ENTITY extends ExtensibleEntity, ID> {

    private final String tableName;

    private final List<String> defaultColumns;

    protected final JpaRepository<ENTITY, ID> jpaRepository;

    protected final JdbcTemplate jdbcTemplate;

    public ENTITY findById(ID id) {
        return jpaRepository.findById(id).stream()
                .peek(this::populateAdditonalColumns)
                .findAny().orElseThrow();
    }

    public List<ENTITY> findAll() {
        return jpaRepository.findAll().stream()
                .peek(this::populateAdditonalColumns)
                .toList();
    }

    @SuppressWarnings("unchecked")
    public ENTITY save(ENTITY entity) {
        final var savedEntity = jpaRepository.saveAndFlush(entity);

        entity.getAdditionalColumns().keySet().forEach(BaseRepository::validateColumnName);
        for (final var entry : entity.getAdditionalColumns().entrySet()) {
            final var sql = "UPDATE " + tableName + " SET " + entry.getKey() + " = '" + entry.getValue() + "' WHERE id = " + entity.getId();
            jdbcTemplate.update(sql);
        }

        return findById((ID) savedEntity.getId());
    }

    public void deleteById(ID id) {
        jpaRepository.deleteById(id);
    }

    public List<String> getDefaultColumns() {
        return defaultColumns;
    }

    public List<String> getAdditionalColumns() {
        final var sql = "SELECT column_name FROM information_schema.columns WHERE table_name = ?";
        return jdbcTemplate.queryForList(sql, tableName).stream()
                .map(it -> (String) it.get("column_name"))
                .filter(it -> !defaultColumns.contains(it))
                .toList();
    }

    public void createAdditionalColumn(String name) {
        validateColumnName(name);
        final var sql = "ALTER TABLE " + tableName + " ADD COLUMN " + name + " TEXT";
        jdbcTemplate.execute(sql);
    }

    public void deleteAdditionalColumn(String name) {
        if (defaultColumns.contains(name)) {
            throw new IllegalArgumentException("Default column can not be deleted");
        }

        final var sql = "ALTER TABLE " + tableName + " DROP COLUMN " + name;
        jdbcTemplate.execute(sql);
    }

    protected void populateAdditonalColumns(ENTITY it) {
        final var additionalColumnNames = String.join(", ", getAdditionalColumns());
        var additionalColumns = jdbcTemplate
                .queryForList("SELECT " + additionalColumnNames + " FROM " + tableName + " WHERE id = " + it.getId())
                .stream()
                .map(map -> {
                    Map<String, String> convertedMap = new HashMap<>();

                    for (Map.Entry<String, Object> entry : map.entrySet()) {
                        String key = entry.getKey();
                        Object value = entry.getValue();
                        String stringValue = String.valueOf(value);
                        convertedMap.put(key, stringValue);
                    }

                    return convertedMap;
                })
                .toList()
                .get(0);
        it.setAdditionalColumns(additionalColumns);
    }

    private static void validateColumnName(String name) {
        for (final var ch: name.toCharArray()) {
            if (!(Character.isLetter(ch) || ch == '_')) {
                throw new IllegalArgumentException("Column name must consist only of letters and underscores.");
            }
        }
    }
}
