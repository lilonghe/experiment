package main

import (
	"context"
	"fmt"
	pb "grpc-demo/proto"
	"log"
	"net"

	"google.golang.org/grpc"
)

type postServiceServer struct{}

func (s *postServiceServer) GetPostById(ctx context.Context, in *pb.GetPostByIdReq) (*pb.GetPostByIdRep, error) {
	return &pb.GetPostByIdRep{
		Data: &pb.Post{
			Id:    1,
			Title: "Hello World!",
		},
	}, nil
}

func main() {
	lis, err := net.Listen("tcp", ":8090")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	grpcServer := grpc.NewServer()
	pb.RegisterPostServiceServer(grpcServer, &postServiceServer{})
	fmt.Println("server running at :8090")
	grpcServer.Serve(lis)
}
