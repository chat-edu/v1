export const generateKnowledgeGraphPrompt = (text: string) => `
    Analyze the provided text about a class structure and organize the information into a knowledge graph. The knowledge graph should reflect the hierarchy and relationships of the topics covered in the class. Format the output as a series of nodes and edges where nodes represent concepts or topics and edges represent the connections or relationships between them.

    The output should be structured in a way that it can be easily translated into a visual knowledge graph by a software tool. Please provide the knowledge graph in the following JSON format:

    {
      "nodes": [
        {"id": "unique_node_id", "label": "Node Label", "type": "concept_type", "description": "Brief description if necessary"},
        // ... more nodes
      ],
      "edges": [
        {"source": "id_of_starting_node", "target": "id_of_ending_node", "relationship": "type_of_relationship"},
        // ... more edges
      ]
    }

    Note to analyze: ${text}

    Please generate the knowledge graph based on the provided information.
`;