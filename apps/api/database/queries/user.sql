-- name: CreateUser :one
INSERT INTO users (
    user_name, email, password, link
) VALUES (
    ?1, ?2, ?3, ?4
) RETURNING *;


-- name: GetUserByUsername :one
SELECT id, user_name, password, email, link FROM users WHERE user_name = ?1;
