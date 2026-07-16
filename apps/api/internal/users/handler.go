package users

import (
	"encoding/json"
	"net/http"

	"github.com/vadhe/whispr/internal/database"
)


type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

// Register godoc
// @Summary      Register a new user
// @Description  Register a new user account
// @Param        req body RegisterRequest true "Register request"
// @Tags         auth
// @Accept       json
// @Produce      json
// @Success      200
// @Failure      400
// @Failure      404
// @Failure      500
// @Router       /register [post]
func (h *Handler) Register(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
    newUser := database.CreateUserParams {
    	Username: req.Username,
    	Email:    req.Email,
    	Password: req.Password,
    	Link:     req.Username,
    }
	if _, err := h.service.Register(r.Context(), newUser); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
