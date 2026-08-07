package users

import "errors"

type RegisterRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

type UserResponse struct {
	ID       int64  `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Link     string `json:"link"`
}

type UserLoginResponse struct {
	ID       int64  `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Link     string `json:"link"`
	Token    string `json:"token"`
}

type LoginUserParams struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

var (
	ErrEmailExists        = errors.New("email already exists")
	ErrUsernameExists     = errors.New("username already exists")
	ErrLinkExists         = errors.New("link already exists")
	ErrUserRequired       = errors.New("user required")
	ErrInvalidEmail       = errors.New("invalid email")
	ErrUsernameRequired   = errors.New("username required")
	ErrPasswordRequired   = errors.New("password required")
	ErrInvalidCredentials = errors.New("invalid credentials")
)
