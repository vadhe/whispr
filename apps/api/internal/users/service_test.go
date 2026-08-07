package users

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/vadhe/whispr/internal/database"
	"github.com/vadhe/whispr/internal/utils"
)

func TestCreateUser(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("error: %s", err)
	}
	defer db.Close()
	queries := database.New(db)
	userRepo := NewRepository(queries)
	userService := NewService(userRepo)
	test := []struct {
		userName string
		email    string
		password string
		expected error
	}{
		{
			email:    "",
			userName: "",
			password: "",
			expected: ErrInvalidEmail,
		},
		{
			email:    "aldyvadhe@gmail.com",
			userName: "",
			password: "",
			expected: ErrUsernameRequired,
		},
		{
			email:    "aldyvadhe@gmail.com",
			userName: "vadhe",
			password: "",
			expected: ErrPasswordRequired,
		},
		{
			email:    "aldyvadhe@gmail.com",
			userName: "vadhe",
			password: "password",
			expected: nil,
		},
	}

	for _, tc := range test {
		if tc.expected == nil {
			hash, err := utils.HashPassword(tc.password)
			if err != nil {
				t.Fatalf("error: %s", err)
			}
			rows := sqlmock.NewRows([]string{"id", "username", "email", "link", "password", "created_at"}).
				AddRow(1, "vadhe", "aldyvadhe@gmail.com", "vadhe", hash, time.Now())

			mock.ExpectQuery("INSERT INTO users").
				WithArgs("vadhe", "aldyvadhe@gmail.com", sqlmock.AnyArg(), "vadhe").
				WillReturnRows(rows)
		}

		user, err := userService.Register(context.Background(), database.CreateUserParams{
			UserName: tc.userName,
			Email:    tc.email,
			Password: tc.password,
			Link:     tc.userName,
		})
		assert.Equal(t, tc.expected, err)
		assert.NotNil(t, user)
	}
}
