CREATE TABLE IF NOT EXISTS profession_scores
(
    id           SERIAL PRIMARY KEY,
    professionId INTEGER,
    profCharId   INTEGER,
    userId       INTEGER,
    score        INTEGER,
    createdAt    timestamptz,
    updatedAt    timestamptz,
    CONSTRAINT fk_profession FOREIGN KEY (professionId) REFERENCES professions (id),
    CONSTRAINT fk_profChar FOREIGN KEY (profCharId) REFERENCES professional_characteristics (id),
    CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES "user" (id)
)