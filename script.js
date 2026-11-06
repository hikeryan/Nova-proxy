
const WORKER_URL = "https://novaproxy.hikehsieh83.workers.dev/";

async function search(query) {
  const resultsContainer = document.getElementById("results");

  resultsContainer.innerHTML = "Searching...";

  try {
    const response = await fetch(
      `${WORKER_URL}/search?q=${encodeURIComponent(query)}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Search failed");
    }

    resultsContainer.innerHTML = "";

    if (!data.results.length) {
      resultsContainer.textContent = "No results found.";
      return;
    }

    data.results.forEach(result => {
      const item = document.createElement("div");
      const title = document.createElement("a");
      const description = document.createElement("p");

      title.href = result.url;
      title.textContent = result.title;
      title.target = "_blank";
      title.rel = "noopener noreferrer";

      description.textContent = result.description;

      item.append(title, description);
      resultsContainer.appendChild(item);
    });

  } catch (error) {
    resultsContainer.textContent =
      "Search error: " + error.message;
  }
}
