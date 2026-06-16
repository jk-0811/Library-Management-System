# 📚 Library Management System (Singly Linked List Architecture)

A high-fidelity, interactive web application built to simulate and demonstrate the structural operations of a **Singly Linked List Data Structure** within a Library Management System domain. 

This project fulfills the structural data design requirements and sample data guidelines outlined for the technical internship evaluation framework.

---

## 🛠️ Data Structure Architecture

Instead of utilizing sequential, contiguous memory blocks (like static arrays), this system implements a dynamic **Singly Linked List**. Each book entry exists as an independent allocated object (Node) bound together via structural pointers.

### Node Structure Design
Every item node within the data chain encapsulates two core responsibilities:
1. **Data Fields:** `id` (Integer Key), `title` (String), `author` (String), and `isIssued` (Boolean Status).
2. **Link Pointer Field:** `next` (A reference memory address holding a pointer targeting the subsequent node sequence, or `null` if it marks the terminal Tail Node).

```text
[ Head Pointer ] 
       │
       ▼
 ┌───────────┐       ┌───────────┐       ┌───────────┐
 │  ID: 101  │       │  ID: 102  │       │  ID: 103  │
 │ The Hobbit│ ───►  │   1984    │ ───►  │Mockingbird│ ───► [ NULL (Tail) ]
 │ next: ───►│       │ next: ───►│       │ next: ───►│
 └───────────┘       └───────────┘       └───────────┘