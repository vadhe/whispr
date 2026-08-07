package utils

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var ErrInvalidUserID = errors.New("invalid user id")
var ErrLoadEnv = errors.New("failed to load env")

func GenerateToken(userID string) (string, error) {
	JWT_SECRET_KEY := os.Getenv("JWT_SECRET_KEY")
	if JWT_SECRET_KEY == "" {
		return "", ErrLoadEnv
	}
	if userID == "" {
		return "", ErrInvalidUserID
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID": userID,
		"exp":    time.Now().Add(time.Minute * 15).Unix(),
	})
	tokenString, err := token.SignedString([]byte(JWT_SECRET_KEY))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}
