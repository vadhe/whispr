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

func (s *Service) Login(ctx context.Context, req LoginUserParams) (UserLoginResponse, error) {
	if req.Username == "" {
		return UserLoginResponse{}, ErrUsernameRequired
	}
	if req.Password == "" {
		return UserLoginResponse{}, ErrPasswordRequired
	}
	user, err := s.repo.GetUserByUsername(ctx, req.Username)
	if err != nil {
		return UserLoginResponse{}, err
	}

	if user == nil {
		return UserLoginResponse{}, ErrInvalidCredentials
	}
	if !utils.CheckPasswordHash(req.Password, user.Password) {
		return UserLoginResponse{}, ErrInvalidCredentials
	}
	token, err := utils.GenerateToken(user.ID)
	if err != nil {
		return UserLoginResponse{}, err
	}
	return UserLoginResponse{ID: user.ID, Username: user.UserName, Email: user.Email, Link: user.Link, Token: token}, nil
}
