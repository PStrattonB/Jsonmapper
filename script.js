document.getElementById('processButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const json = JSON.parse(event.target.result);
                displayJson(json);
            } catch (e) {
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    } else {
        alert('Please select a file first');
    }
});

function displayJson(json, container = document.getElementById('jsonOutput'), path = '') {
    container.innerHTML = '';
    const ul = document.createElement('ul');
    container.appendChild(ul);
    generateJsonNodes(json, ul, path);
}

function generateJsonNodes(json, parentElement, path) {
    for (const key in json) {
        const li = document.createElement('li');
        const newPath = path ? `${path}.${key}` : key;
        li.textContent = key;
        li.addEventListener('click', (event) => {
            event.stopPropagation();
            displayPath(newPath);
        });
        parentElement.appendChild(li);

        if (typeof json[key] === 'object' && json[key] !== null) {
            const nestedUl = document.createElement('ul');
            li.appendChild(nestedUl);
            generateJsonNodes(json[key], nestedUl, newPath);
        }
    }
}

function displayPath(path) {
    const pathContainer = document.getElementById('jsonPath');
    pathContainer.textContent = `Path: ${path}`;
}