package main

import (
	"fmt"
	"net/http"

	_ "github.com/mattn/go-sqlite3"
	httpSwagger "github.com/swaggo/http-swagger"
	_ "github.com/vadhe/whispr/docs"
	dbConnection "github.com/vadhe/whispr/internal/database"
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
	defer db.Close()

	var sqliteVersion string

	err = db.QueryRow("SELECT name FROM users LIMIT 1").Scan(&sqliteVersion)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(sqliteVersion)

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, World!")
	})
	mux.HandleFunc("/swagger/", httpSwagger.Handler(
		httpSwagger.URL("http://localhost:8080/swagger/doc.json"), //The url pointing to API definition
	))
	mux.HandleFunc("/accounts", handleRoot)

	http.ListenAndServe(":8080", mux)
}

// ListAccounts godoc
// @Summary      List accounts
// @Description  get accounts
// @Tags         accounts
// @Accept       json
// @Produce      json
// @Param        q    query     string  false  "name search by q"  Format(email)
// @Success      200
// @Failure      400
// @Failure      404
// @Failure      500
// @Router       /accounts [get]
func handleRoot(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, World!")
}
