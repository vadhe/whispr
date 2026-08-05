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

type APIResponse[T any] struct {
	Data T `json:"data"`
}

func RespondWithJSON[T any](w http.ResponseWriter, code int, data T) {
	response := APIResponse[T]{
		Data: data,
	}

	WriteJSON(w, code, response)
}

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
	WriteJSON(w, code, response)
}

func WriteJSON(w http.ResponseWriter, code int, data any) {
	body, err := json.Marshal(data)
	if err != nil {
		log.Printf("CRITICAL: failed to marshal JSON error response: %v", err)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		if _, err := w.Write([]byte(`{"error":{"code":"ERR_INTERNAL","message":"Internal Server Error"}}`)); err != nil {
			log.Printf("CRITICAL: failed to write JSON response: %v", err)
		}
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	if _, err := w.Write(body); err != nil {
		log.Printf("CRITICAL: failed to write JSON response: %v", err)
	}
}
