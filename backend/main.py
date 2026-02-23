from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],  # Specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[dict]
    edges: List[Edge]



@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):

    # Graph banana
    graph = {}
    for node in pipeline.nodes:
        graph[node["id"]] = []

    for edge in pipeline.edges:
        graph[edge.source].append(edge.target)

    visited = set()
    stack = set()

   
    def has_cycle(node):
        visited.add(node)
        stack.add(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in stack:
                return True

        stack.remove(node)
        return False

    is_dag = True

    for node in graph:
        if node not in visited:
            if has_cycle(node):
                is_dag = False
                break

    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_dag
    }
