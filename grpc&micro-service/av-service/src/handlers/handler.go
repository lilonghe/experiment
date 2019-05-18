package handlers

import (
	av "av-service/src/proto"
	"context"
	"fmt"
)

type AvServer struct {}

func (this *AvServer) GetAVList(ctx context.Context, req *av.GetAVListReq) (*av.GetAVListRep, error) {
	fmt.Println("GetAVList")
	return &av.GetAVListRep{
		Total: 10,
		Datas: []*av.AV{&av.AV{Id:1, Title: "Hello"},},
	}, nil
}