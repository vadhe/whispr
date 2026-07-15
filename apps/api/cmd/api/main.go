package main

import (
	"fmt"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
	httpSwagger "github.com/swaggo/http-swagger"
	_ "github.com/vadhe/whispr/docs"
	"github.com/vadhe/whispr/internal/database"
	dbConnection "github.com/vadhe/whispr/internal/database"
	"github.com/vadhe/whispr/internal/users"
)

// @title           Swagger Example API
// @version         1.0
// @description     This is a sample server celler server.
// @termsOfService  http://swagger.io/terms/

// @contact.name   API Support
// @contact.url    http://www.swagger.io/support
// @contact.email  support@swagger.io

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:8080
// @BasePath  /api/v1

// @securityDefinitions.basic  BasicAuth

// @externalDocs.description  OpenAPI
// @externalDocs.url          https://swagger.io/resources/open-api/
func main() {
	var mux = http.NewServeMux()
	db, err := dbConnection.NewSQLiteConnection(dbConnection.Config{
		DriverName: "sqlite3",
		DSN:        "./internal/database/whispr.db",
	})
	if err != nil {
		fmt.Println(err)
		return
	}
	dbQuery := database.New(db)
	userRepo := users.NewRepository(dbQuery)
	userService := users.NewService(userRepo)
	usersHandler := users.NewHandler(userService)

	defer db.Close()

	mux.HandleFunc("POST /api/v1/register", usersHandler.Register)
	mux.HandleFunc("/swagger/", httpSwagger.Handler(
		httpSwagger.URL("http://localhost:8080/swagger/doc.json"), //The url pointing to API definition
	))

	http.ListenAndServe(":8080", mux)
}
