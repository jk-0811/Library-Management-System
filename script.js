// Class defining an individual Book structure node
class BookNode {
    constructor(id, title, author) {
        this.id = parseInt(id);
        this.title = title;
        this.author = author;
        this.isIssued = false;
        this.next = null; // Reference link tracking next chain component
    }
}

// Class executing structural actions for the Library Chain list
class LinkedListLibrary {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // 1. Add item to end of linked list chain
    addBook(id, title, author) {
        if (this.findNode(id)) {
            alert(`Error: Node with ID ${id} already exists.`);
            return false;
        }

        const newNode = new BookNode(id, title, author);

        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
        return true;
    }

    // Traversal loop helper to search for matching values
    findNode(id) {
        let current = this.head;
        while (current !== null) {
            if (current.id === parseInt(id)) {
                return current;
            }
            current = current.next;
        }
        return null;
    }

    // 2. Issue flag toggle routine
    issueBook(id) {
        const node = this.findNode(id);
        if (!node) return alert("Book ID not discovered.");
        if (node.isIssued) return alert("This item is already issued.");
        node.isIssued = true;
        return true;
    }

    // 3. Return flag reset routine
    returnBook(id) {
        const node = this.findNode(id);
        if (!node) return alert("Book ID not discovered.");
        if (!node.isIssued) return alert("This item is currently inside the catalog.");
        node.isIssued = false;
        return true;
    }

    // 4. Node structural elimination routing
    deleteBook(id) {
        if (this.head === null) return false;

        let current = this.head;
        let previous = null;

        // If head node contains target ID
        if (current.id === parseInt(id)) {
            this.head = current.next;
            this.size--;
            return true;
        }

        // Search down list elements
        while (current !== null && current.id !== parseInt(id)) {
            previous = current;
            current = current.next;
        }

        if (current === null) return false;

        previous.next = current.next;
        this.size--;
        return true;
    }
}

// Global System Instance
const librarySystem = new LinkedListLibrary();

// Initialize Dummy Datasets directly (Satisfying Guideline 5)
librarySystem.addBook(101, "The Hobbit", "J.R.R. Tolkien");
librarySystem.addBook(102, "1984", "George Orwell");
librarySystem.addBook(103, "To Kill a Mockingbird", "Harper Lee");

// Render Loop handling UI presentation syncing
function renderCatalog() {
    const container = document.getElementById("catalogContainer");
    const countBadge = document.getElementById("nodeCount");
    container.innerHTML = "";
    
    countBadge.innerText = `Nodes: ${librarySystem.size}`;

    if (librarySystem.head === null) {
        container.innerHTML = `<p style="text-align:center; color:#94a3b8;">The catalog list is empty.</p>`;
        return;
    }

    // Traverse the linked list sequentially to build UI blocks
    let current = librarySystem.head;
    while (current !== null) {
        const card = document.createElement("div");
        card.className = "book-node";
        card.innerHTML = `
            <div class="node-data">
                <span class="node-id">ID: ${current.id}</span>
                <h3 class="node-title">${current.title}</h3>
                <p class="node-author">by ${current.author}</p>
            </div>
            <div class="status-indicator ${current.isIssued ? 'status-issued' : 'status-available'}">
                ${current.isIssued ? 'Issued' : 'Available'}
            </div>
        `;
        container.appendChild(card);
        current = current.next; // Move to next node pointer reference
    }
}

// Interface submission intercepts
document.getElementById("bookForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const id = document.getElementById("bookID").value;
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;

    if(librarySystem.addBook(id, title, author)) {
        this.reset();
        renderCatalog();
    }
});

function handleIssue() {
    const id = document.getElementById("actionID").value;
    if(!id) return alert("Input a node Target ID");
    if(librarySystem.issueBook(id)) renderCatalog();
}

function handleReturn() {
    const id = document.getElementById("actionID").value;
    if(!id) return alert("Input a node Target ID");
    if(librarySystem.returnBook(id)) renderCatalog();
}

function handleDelete() {
    const id = document.getElementById("actionID").value;
    if(!id) return alert("Input a node Target ID");
    if(librarySystem.deleteBook(id)) {
        document.getElementById("actionID").value = "";
        renderCatalog();
    } else {
        alert("Node element not identified.");
    }
}

// Initial System Painting Run
renderCatalog();