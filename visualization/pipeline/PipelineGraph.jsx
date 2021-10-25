import G6 from '@antv/g6';
import { useEffect, useRef, useState } from 'react';

function PipelineGraph({ data = [], onClick }) {
    const containerInstance = useRef();
    const [graphData, setGraphData] = useState({
        nodes: [],
        edges: [],
    });

    const initData = () => {
        let newGraphData = {
            nodes: [],
            edges: [],
        };
        data.map(item => {
            // nodes
            newGraphData.nodes.push({
                id: item.id,
                original: item,

                size: 40,
                // icon: {
                //     show: true,
                //     width: 20,
                //     height: 20,
                //     img: fileIcon,
                // },
                title: item.name,
                label: item.name.length > 10 ? (item.name.substr(0, 10) + '...') : item.name,
            });

            // edges
            if (item.previousId) {
                newGraphData.edges.push({
                    source: item.previousId, target: item.id,
                })
            }
            if (item.serviceId) {
                newGraphData.edges.push({
                    source: item.serviceId, target: item.id,
                    style: { lineDash: [3] },
                })
            }
        });
        setGraphData(newGraphData);
    }

    const draw = () => {
        containerInstance.current.innerHTML = "";
        const width = containerInstance.current.scrollWidth;
        const height = window.innerHeight;
        const graph = new G6.Graph({
            container: containerInstance.current,
            width,
            height,
            fitCenter: true,
            modes: {
                default: ['drag-canvas', 'drag-node', 'zoom-canvas', {
                    type: 'tooltip',
                    formatText: function formatText(model) {
                        return model.title;
                    },

                    shouldUpdate: function shouldUpdate() {
                        return true;
                    },
                },],
            },
            layout: {
                type: 'dagre',
                rankdir: 'LR',
            },
            defaultNode: {
                type: 'circle',
                style: {
                    stroke: '#000000',
                    fill: 'transparent',
                },
                labelCfg: {
                    position: 'bottom',
                    offset: 10,
                }
            },
            defaultEdge: {
                style: {
                    stroke: '#000000',
                    endArrow: true,
                }
            }
        });
        graph.data(graphData);
        graph.render();

        graph.on('node:click', (evt) => {
            try {
                const { item: { _cfg: { model } } } = evt;
                onClick(model.original);
            } catch (e) {
                console.error('reading node data fail.');
            }

        });
    }

    useEffect(() => {
        if (graphData) {
            draw();
        }
    }, [graphData]);

    useEffect(() => {
        if (data) {
            initData();
        }
    }, [data]);

    return (
        <div ref={containerInstance}></div>
    );
}

export default PipelineGraph;