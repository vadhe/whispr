package users

import (
	"context"

	"github.com/vadhe/whispr/internal/database"
)

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Register(ctx context.Context, req database.CreateUserParams) (*database.User, error) {
	data, err := s.repo.CreateUser(ctx, req)
	if req.Email == "" {
		return &database.User{}, ErrInvalidEmail
	}
	if req.Username == "" {
		return &database.User{}, ErrUsernameRequired
	}
	if req.Password == "" {
		return &database.User{}, ErrPasswordRequired
	}
	if err != nil {
		return &database.User{}, err
	}
	return data, nil
}
