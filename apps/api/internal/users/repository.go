package users

import (
	"context"
	"errors"
	"strings"

	"github.com/mattn/go-sqlite3"
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
		var sqlerr sqlite3.Error
		if errors.As(err, &sqlerr) {
			if sqlerr.Code == sqlite3.ErrConstraint {
				msg := sqlerr.Error()
				switch {
				case strings.Contains(msg, "email"):
					return nil, ErrEmailExists
				case strings.Contains(msg, "username"):
					return nil, ErrUsernameExists
				case strings.Contains(msg, "link"):
					return nil, ErrLinkExists
				default:
					return nil, err
				}
			}
		}
		return nil, err
	}
	return &user, nil
}

func (r *Repository) GetUserByUsername(ctx context.Context, username string) (*database.GetUserByUsernameRow, error) {
	user, err := r.db.GetUserByUsername(ctx, username)
	if err != nil {
		return nil, err
	}
	return &user, nil
}
