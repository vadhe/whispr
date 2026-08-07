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
// @Failure      400 {object} utils.ErrorResponse
// @Failure      401 {object} utils.ErrorResponse
// @Failure      404 {object} utils.ErrorResponse
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

// @Tags         auth
// @Accept       json
// @Param        req body LoginUserParams true "Login request"
// @Produce      json
// @Success      200 {object} UserResponse
// @Failure      400 {object} utils.ErrorResponse
// @Failure      401 {object} utils.ErrorResponse
// @Failure      404 {object} utils.ErrorResponse
// @Failure      500 {object} utils.ErrorResponse
// @Router       /login [post]
func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	var req LoginUserParams
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "invalid_request", "Invalid request", nil)
		return
	}
	user, err := h.service.Login(r.Context(), req)
	if err != nil {

		switch {
		case errors.Is(err, ErrInvalidCredentials):
			utils.RespondWithError(w, http.StatusUnauthorized, "invalid_credentials", "Invalid credentials", nil)
		case errors.Is(err, ErrUsernameRequired):
			utils.RespondWithError(w, http.StatusBadRequest, "username_required", "Username is required", nil)
		case errors.Is(err, ErrPasswordRequired):
			utils.RespondWithError(w, http.StatusBadRequest, "password_required", "Password is required", nil)
		default:
			utils.RespondWithError(w, http.StatusInternalServerError, "internal_server_error", err.Error(), nil)
		}
		return
	}

	userResponse := UserLoginResponse{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
		Link:     user.Link,
		Token:    user.Token,
	}
	utils.RespondWithJSON(w, http.StatusOK, userResponse)
}
