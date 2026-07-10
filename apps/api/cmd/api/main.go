package main

import (
	"database/sql"
	"fmt"
	"net/http"

	_ "github.com/glebarez/go-sqlite"
)

func main() {
	db, err := sql.Open("sqlite", "./internal/database/whispr.db")
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

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, World!")
	})

	http.ListenAndServe(":8080", nil)
}
