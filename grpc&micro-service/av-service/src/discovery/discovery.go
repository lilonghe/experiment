package discovery

import (
	"context"
	"fmt"
	"time"

	"github.com/coreos/etcd/clientv3"
)

var (
	client *clientv3.Client
)

type Builder struct {
	Endpoints []string
	Scheme    string
}

func NewBuilder(endpoints []string, scheme string) Builder {
	return Builder{Endpoints: endpoints, Scheme: scheme}
}

func (b *Builder) Unregister(name string) error {
	_, err := client.Delete(context.Background(), name, clientv3.WithPrefix())
	if err != nil {
		return err
	}

	return nil
}

func (b *Builder) Register(name, addr string) error {
	var err error

	if client == nil {
		client, err = clientv3.New(clientv3.Config{
			Endpoints:   b.Endpoints,
			DialTimeout: 5 * time.Second,
		})
		if err != nil {
			return err
		}
	}

	leaseResp, err := client.Grant(context.Background(), 8)
	if err != nil {
		return err
	}

	key := fmt.Sprintf("%s/%s/%s", b.Scheme, name, addr)
	_, err = client.Put(context.Background(), key, addr, clientv3.WithLease(leaseResp.ID))
	if err != nil {
		return err
	}

	go func() {
		for range time.Tick(time.Second * 5) {
			client.KeepAliveOnce(context.Background(), leaseResp.ID)
		}
	}()

	return nil
}
