package database

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

type Config struct {
	DriverName string
	DSN        string
}

func NewSQLiteConnection(cfg Config) (*sql.DB, error) {
	db, err := sql.Open(cfg.DriverName, cfg.DSN)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %w", err)
	}

	if err := db.Ping(); err != nil {
		db.Close()
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	db.SetMaxOpenConns(1)
	db.SetConnMaxLifetime(time.Hour)

	return db, nil
}
