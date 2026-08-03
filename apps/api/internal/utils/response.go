package utils

import (
	"encoding/json"
	"log"
	"net/http"
)

type ErrorResponse struct {
	Error ErrorDetail `json:"error"`
}

type ErrorDetail struct {
	Code    string      `json:"code"`
	Message string      `json:"message"`
	Details []ErrorItem `json:"details,omitempty"`
}

type ErrorItem struct {
	Field   string `json:"field"`
	Message string `json:"message"`
}

// type APIResponse[T any] struct {
// 	Data T `json:"data"`
// }

// func RespondWithJSON[T any](w http.ResponseWriter, code int, data T) {
// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(code)
// 	json.NewEncoder(w).Encode(map[string]T{
// 		"data": data,
// 	})
// }

func RespondWithError(w http.ResponseWriter, code int, errorCode string, message string, details []ErrorItem) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)

	response := ErrorResponse{
		Error: ErrorDetail{
			Code:    errorCode,
			Message: message,
			Details: details,
		},
	}

	if err := json.NewEncoder(w).Encode(response); err != nil {
		log.Printf("Gagal melakukan encode JSON: %v", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
}
