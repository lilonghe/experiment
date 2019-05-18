package main

import (
	"api/discovery"
	"api/service/av"
	"context"

	"github.com/gin-gonic/gin"
	"google.golang.org/grpc"
	"google.golang.org/grpc/balancer/roundrobin"
	"google.golang.org/grpc/resolver"
)

var (
	ResolverBuilder discovery.Builder
)

func init() {
	ResolverBuilder = discovery.NewResolverBuilder([]string{"0.0.0.0:2379"}, "services")
	resolver.Register(&ResolverBuilder)
}

func main() {
	r := gin.Default()

	grpcOpt := grpc.WithInsecure()
	//avConn, err := grpc.Dial(":8090", grpcOpt)
	//if err != nil {
	//	panic(err)
	//}
	avConn, err := grpc.Dial(ResolverBuilder.Scheme()+":///av", grpcOpt, grpc.WithBalancerName(roundrobin.Name))
	if err != nil {
		panic(err)
	}

	//userConn, err := grpc.Dial(":8091", grpcOpt)
	//if err != nil {
	//	panic(err)
	//}
	avClient := av.NewAVServiceClient(avConn)
	//userClient := user.NewUserServiceClient(userConn)
	//r.GET("/ping", func(c *gin.Context) {
	//	c.JSON(200, gin.H{
	//		"message": "pong",
	//	})
	//})

	r.GET("/av-list", func(c *gin.Context) {
		resp, err := avClient.GetAVList(context.TODO(), &av.GetAVListReq{Limit: 10, Offset: 0})
		if err != nil {
			c.JSON(200, gin.H{
				"error": err.Error(),
			})
		} else {
			c.JSON(200, gin.H{
				"total": resp.Total,
				"datas": resp.Datas,
			})
		}
	})

	//r.GET("/user/:id", func(c *gin.Context) {
	//	id, _ := strconv.Atoi(c.Param("id"))
	//	if id == 0 {
	//		c.JSON(200, gin.H{
	//			"error": "miss param",
	//		})
	//		return
	//	}
	//	resp, err := userClient.GetUserById(context.TODO(), &user.GetUserByIdReq{Id: int32(id)})
	//	if err != nil {
	//		c.JSON(200, gin.H{
	//			"error": err.Error(),
	//		})
	//	} else {
	//		c.JSON(200, gin.H{
	//			"data": resp.Data,
	//		})
	//	}
	//})

	r.Run()
}
