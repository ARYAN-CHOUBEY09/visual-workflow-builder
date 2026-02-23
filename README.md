🚀 Visual Workflow Builder (Frontend + Backend)

This project is a complete visual workflow editor built using React, Vite, ReactFlow, Zustand, TailwindCSS, and FastAPI.
It allows users to create pipelines using draggable nodes, connect them visually, and receive pipeline analytics from a backend API.

📂 Project Structure
/frontend
  ├── src
  │   ├── components
  │   │   ├── BaseNode.jsx
  │   │   ├── FlowCanvas.jsx
  │   │   ├── Toolbar.jsx
  │   │   └── SubmitButton.jsx
  │   ├── nodes
  │   │   ├── InputNode.jsx
  │   │   ├── TextNode.jsx
  │   │   ├── OutputNode.jsx
  │   │   ├── MathNode.jsx
  │   │   ├── MergeNode.jsx
  │   │   ├── ConditionNode.jsx
  │   │   ├── JSONNode.jsx
  │   │   └── DelayNode.jsx
  │   ├── Store
  │   │   └── FlowStore.js
  │   ├── api
  │   │   └── flowApi.js
  │   └── submit.js
/backend
  └── main.py
🧩 Features
1️⃣ Node Abstraction (BaseNode)

A reusable BaseNode component was created to standardize:

Layout

Styling

Input/Output handles

Delete action

Children content wrapper

All custom nodes extend this abstraction, making node creation extremely scalable.

2️⃣ Custom Nodes Implemented

A total of 8 fully functional nodes were created:

Input Node (text input)

Text Node (auto-resize + variable detection {{var}})

Output Node

Math Node (sum, diff, mul, div)

Merge Node

Condition Node

JSON Viewer Node

Delay Node

These nodes dynamically process, store, and forward data across the pipeline.

3️⃣ Styling

The UI is styled using TailwindCSS, featuring:

Unified dark theme

Clean typography

Rounded node cards

Consistent spacing

Colored handles

Modern layout inspired by professional workflow tools

4️⃣ Text Node Logic

The Text Node includes:

Auto-resizing textarea

Real-time variable extraction like {{name}}

Dynamic handle generation for each variable

Proper variable replacement when connected to Input Nodes

5️⃣ Backend Integration (FastAPI)

The backend exposes one endpoint:

POST /pipelines/parse

It returns:

number of nodes

number of edges

whether the workflow is a DAG

The frontend sends the entire pipeline using the Submit button and shows the backend response in an alert.
