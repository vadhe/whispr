package users

import (
	"context"

	"github.com/vadhe/whispr/internal/database"
)


type Repository struct {
	db *database.Queries
}

func NewRepository(db *database.Queries) *Repository {
	return &Repository{db: db}
}


func (r *Repository) CreateUser(ctx context.Context, arg database.CreateUserParams) (*database.User, error) {
	user, err := r.db.CreateUser(ctx, arg)
	if err != nil {
		return nil, err
	}
	return &user, nil
}
