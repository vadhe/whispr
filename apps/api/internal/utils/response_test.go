package utils

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestRespondWithError(t *testing.T) {
	tc := []struct {
		name      string
		code      int
		errorCode string
		message   string
		details   []ErrorItem
		expected  int
	}{
		{
			name:      "Valid: 500 Internal Server Error Without Details",
			code:      http.StatusInternalServerError,
			errorCode: "ERR_INTERNAL",
			message:   "Sistem sedang bermasalah",
			details:   nil,
			expected:  http.StatusInternalServerError,
		},
		{
			name:      "Valid: 400 Bad Request With Details",
			code:      http.StatusBadRequest,
			errorCode: "ERR_VALIDATION",
			message:   "Input tidak valid",
			details: []ErrorItem{
				{Field: "email", Message: "Format email salah"},
			},
			expected: http.StatusBadRequest,
		},
	}

	for _, tt := range tc {
		t.Run(tt.name, func(t *testing.T) {
			rr := httptest.NewRecorder()
			RespondWithError(rr, tt.code, tt.errorCode, tt.message, tt.details)
			if tt.details != nil {
			}
			if status := rr.Code; status != tt.expected {
				t.Errorf("Expected status code %d, got %d", tt.expected, status)
			}
		})
	}
}

func TestRespondWithJSON(t *testing.T) {
	tc := []struct {
		name     string
		code     int
		data     interface{}
		expected int
	}{
		{
			name:     "Valid: 200 OK",
			code:     http.StatusOK,
			data:     map[string]string{"message": "success"},
			expected: http.StatusOK,
		},
		{
			name:     "Valid: 201 Created",
			code:     http.StatusCreated,
			data:     map[string]string{"message": "created"},
			expected: http.StatusCreated,
		},
		{
			name:     "Valid: 204 No Content",
			code:     http.StatusNoContent,
			data:     nil,
			expected: http.StatusNoContent,
		},
		{
			name:     "Error: 500 Internal Server Error with data",
			code:     http.StatusInternalServerError,
			data:     map[string]string{"error": "internal server error"},
			expected: http.StatusInternalServerError,
		},
	}

	for _, tt := range tc {
		t.Run(tt.name, func(t *testing.T) {
			rr := httptest.NewRecorder()
			RespondWithJSON(rr, tt.code, tt.data)
			if status := rr.Code; status != tt.expected {
				t.Errorf("Expected status code %d, got %d", tt.expected, status)
			}
		})
	}
}
