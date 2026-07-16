-- name: CreateUser :one
INSERT INTO users (
    userName, email, password, link
) VALUES (
    ?1, ?2, ?3, ?4
) RETURNING *;
