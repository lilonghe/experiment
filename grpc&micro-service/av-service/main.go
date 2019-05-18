package main

import (
	"av-service/src/discovery"
	"av-service/src/handlers"
	av "av-service/src/proto"
	"flag"
	"fmt"
	"net"

	"google.golang.org/grpc"
)

func main() {
	addr := flag.String("addr", ":8096", "service addr")
	flag.Parse()

	listen, err := net.Listen("tcp", *addr)
	if err != nil {
		panic(err)
	}

	grpcServer := grpc.NewServer()
	av.RegisterAVServiceServer(grpcServer, &handlers.AvServer{})

	builder := discovery.NewBuilder([]string{"http://localhost:2379"}, "services")
	err = builder.Register("av", *addr)
	if err != nil {
		panic(err)
	}
	fmt.Println("etcd did register")
	fmt.Println("listen -> ", *addr)
	grpcServer.Serve(listen)
}
