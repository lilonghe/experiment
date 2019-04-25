package main

import (
	"context"
	"fmt"
	pb "grpc-demo/proto"

	"google.golang.org/grpc"
)

func main() {
	opt := grpc.WithInsecure()
	conn, err := grpc.Dial(":8090", opt)
	if err != nil {
		panic(err)
	}
	defer conn.Close()
	c := pb.NewPostServiceClient(conn)

	ctx := context.TODO()
	resp, err := c.GetPostById(ctx, &pb.GetPostByIdReq{
		Id: 1,
	})
	if err != nil {
		panic(err)
	} else {
		fmt.Printf("resp data -> %#v", resp.Data)
	}
}
