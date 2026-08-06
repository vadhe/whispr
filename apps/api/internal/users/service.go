package users

import (
	"context"

	"github.com/vadhe/whispr/internal/database"
	"github.com/vadhe/whispr/internal/utils"
)

type Service struct {
	repo *Repository
}

func NewService(repo *Repository) *Service {
	return &Service{repo: repo}
}

func (s *Service) Register(ctx context.Context, req database.CreateUserParams) (*database.User, error) {
	if req.Email == "" {
		return &database.User{}, ErrInvalidEmail
	}
	if req.UserName == "" {
		return &database.User{}, ErrUsernameRequired
	}
	if req.Password == "" {
		return &database.User{}, ErrPasswordRequired
	}
	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		return &database.User{}, err
	}
	req.Password = hashedPassword

	data, err := s.repo.CreateUser(ctx, req)
	if err != nil {
		return &database.User{}, err
	}

	return data, nil
}

func (s *Service) Login(ctx context.Context, req LoginUserParams) (*database.GetUserByUsernameRow, error) {
	if req.Username == "" {
		return &database.GetUserByUsernameRow{}, ErrUsernameRequired
	}
	if req.Password == "" {
		return &database.GetUserByUsernameRow{}, ErrPasswordRequired
	}
	user, err := s.repo.GetUserByUsername(ctx, req.Username)
	if err != nil {
		return &database.GetUserByUsernameRow{}, err
	}

	if user == nil {
		return &database.GetUserByUsernameRow{}, ErrInvalidCredentials
	}
	if !utils.CheckPasswordHash(req.Password, user.Password) {
		return &database.GetUserByUsernameRow{}, ErrInvalidCredentials
	}
	return user, nil
}
