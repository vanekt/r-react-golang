package main

import (
	"golang.org/x/net/websocket"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

var clients = make(map[int]*websocket.Conn)

func WSHandler(ws *websocket.Conn) {
	var err error
	var id = len(clients)
	var newConnectionMsg = "New connection: ID=" + strconv.Itoa(id);
	clients[id] = ws

	msg := map[string]string{
		"type": "system",
		"text": newConnectionMsg,
	}

	if err = websocket.JSON.Send(ws, msg); err != nil {
		fmt.Println(err)
	}

	fmt.Println(newConnectionMsg);
	fmt.Println(len(clients));

	for {
		var reply map[string]string
		if err = websocket.JSON.Receive(ws, &reply); err != nil {
			fmt.Println("Can't receive")
			break
		}
		fmt.Print("Received back from client: ")
		fmt.Println(reply)
	}

	// TODO: delete clients[id]
}

func main() {
	http.Handle("/", websocket.Handler(WSHandler))

	if err := http.ListenAndServe(":8081", nil); err != nil {
		log.Fatal("ListenAndServe:", err)
	}
}