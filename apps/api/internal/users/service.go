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

func (s *Service) Register(ctx context.Context, req  database.CreateUserParams) (*database.User,error) {
	data, err := s.repo.db.CreateUser(ctx, req)
	if err != nil {
		return nil, err
	}
	return &data, nil
}
