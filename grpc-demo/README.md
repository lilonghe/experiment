# intro
Install [`protoc`](https://grpc.io/docs/quickstart/go.html) and [`protoc-gen-go`](https://grpc.io/docs/quickstart/go.html).  
Here are the steps I tried.
1. create post.proto
2. `protoc -I ./proto --go_out=plugins=grpc:proto ./proto/post.proto` // you can ignore this step, because I commited generate file of `proto/post.pb.go`
3. create server/server.go and client/client.go
4. run `go run main.go` and `go test client/client_test.go client/client.go -v` separately