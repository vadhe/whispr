package users

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/vadhe/whispr/internal/database"
	"github.com/vadhe/whispr/internal/utils"
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
// @Success      200 {object} UserResponse
// @Failure      400
// @Failure      404
// @Failure      500 {object} utils.ErrorResponse
// @Router       /register [post]
func (h *Handler) Register(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	newUser := database.CreateUserParams{
		UserName: req.Username,
		Email:    req.Email,
		Password: req.Password,
		Link:     req.Username,
	}

	user, err := h.service.Register(r.Context(), newUser)
	if err != nil {
		var details []utils.ErrorItem
		switch {
		case errors.Is(err, ErrEmailExists):
			details = []utils.ErrorItem{{Field: "email", Message: ErrEmailExists.Error()}}
		case errors.Is(err, ErrUsernameExists):
			details = []utils.ErrorItem{{Field: "username", Message: ErrUsernameExists.Error()}}
		case errors.Is(err, ErrLinkExists):
			details = []utils.ErrorItem{{Field: "link", Message: ErrLinkExists.Error()}}
		default:
			details = []utils.ErrorItem{{Field: "internal_server_error", Message: err.Error()}}
		}

		utils.RespondWithError(w, http.StatusInternalServerError, "internal_server_error", err.Error(), details)
		return
	}

	userResponse := UserResponse{
		ID:       user.ID,
		Username: user.UserName,
		Email:    user.Email,
		Link:     user.Link,
	}
	utils.RespondWithJSON(w, http.StatusCreated, userResponse)
}
