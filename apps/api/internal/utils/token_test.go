package utils

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGenerateToken(t *testing.T) {
	tc := []struct {
		name          string
		userID        int64
		expectedToken string
		expectedError error
	}{
		{
			name:          "valid user ID",
			userID:        123,
			expectedToken: "",
			expectedError: nil,
		},
		{
			name:          "empty user ID",
			userID:        0,
			expectedToken: "",
			expectedError: ErrInvalidUserID,
		},
		{
			name:          "empty JWT_SECRET_KEY",
			userID:        123,
			expectedToken: "",
			expectedError: ErrLoadEnv,
		},
	}

	for _, tc := range tc {
		if tc.name == "empty JWT_SECRET_KEY" {
			t.Setenv("JWT_SECRET_KEY", "")
		} else {
			t.Setenv("JWT_SECRET_KEY", "!_CoPk=oO*qjTCD6bm_D*w]tlWey![dMJ-WnxQ*-JU9")
		}
		token, err := GenerateToken(tc.userID)
		assert.Equal(t, tc.expectedError, err)

		if tc.expectedError != nil {
			assert.Empty(t, token)
		} else {
			assert.NotEmpty(t, token)
		}

	}
}

func TestVerifyToken(t *testing.T) {
	t.Setenv("JWT_SECRET_KEY", "!_CoPk=oO*qjTCD6bm_D*w]tlWey![dMJ-WnxQ*-JU9")
	token, err := GenerateToken(123)
	assert.NoError(t, err)
	assert.NotEmpty(t, token)

	tc := []struct {
		name          string
		token         string
		expectedError error
	}{
		{
			name:          "valid token",
			token:         token,
			expectedError: nil,
		},
		{
			name:          "invalid token",
			token:         "invalid token",
			expectedError: ErrInvalidToken,
		},
	}

	for _, tc := range tc {
		err := VerifyToken(tc.token)
		assert.Equal(t, tc.expectedError, err)
	}
}
