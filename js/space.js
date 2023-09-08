document.addEventListener("DOMContentLoaded", function () {
    // definir constantes, id ya estaban dadas en el html
    const inputBuscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const contenedor = document.getElementById("contenedor");
  
    // funcione el click al buscar 
    btnBuscar.addEventListener("click", function () {
      const query = inputBuscar.value.trim();
  
      if (query !== "") {
        // Realizar la solicitud a la API que nos dieron
        buscarImagenesNASA(query);
      }
    });
  
    function buscarImagenesNASA(query) {
      // URL base 
      const baseUrl = "https://images-api.nasa.gov/search";
  
      // esto es para que la url pueda buscar cualquier cosa diferente de algo vacio
      const url = `${baseUrl}?q=${query}`;
  
      // Realizar la solicitud HTTP
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // saca los datos del contenedor 
          contenedor.innerHTML = "";
  
          // Obtener la lista de resultados de imágenes
          const items = data.collection.items;
  
          // para cada item muestra titulo, descripcion, fecha
          items.forEach((item) => {
            const title = item.data[0].title || "Sin título";
            const description = item.data[0].description || "Sin descripción";
            const dateCreated = item.data[0].date_created || "Sin fecha";
            const imageUrl = item.links[0].href || "";
  
            // Crear elementos segun la data y se muestra ya sea como imagen, segundo titulo o un parrafo con texto 
            const imageElement = document.createElement("img"); // Se crea la imagen 
            imageElement.src = imageUrl;
            imageElement.alt = title;
  
            const titleElement = document.createElement("h2"); // Se crea la titulo 
            titleElement.textContent = title;
  
            const descriptionElement = document.createElement("p"); // Se crea la descripcion de elemento
            descriptionElement.textContent = description;
  
            const dateElement = document.createElement("p"); // Se crea la fecha
            dateElement.textContent = `Fecha: ${dateCreated}`;
  
            // con appendChild agregamos los elementos que creamos anteriorrmente a un  contenedor 
            contenedor.appendChild(imageElement);
            contenedor.appendChild(titleElement);
            contenedor.appendChild(descriptionElement);
            contenedor.appendChild(dateElement);
            
   
          });

        })
        .catch((error) => {  // si da error nos muestra el siguiente mensaje: Error al realizar la solicitud
          console.error("Error al realizar la solicitud:", error);
        });
    }
  });