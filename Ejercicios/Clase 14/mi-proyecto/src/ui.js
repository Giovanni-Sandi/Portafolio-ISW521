export const renderizarResultados = (cantidad) => {
    const contenedor = document.querySelector('#app');
    contenedor.innerHTML = ` <div>
    <h1><h2>Gestion Usuarios</h2></h1>
    <p>La cantidad de usuarios es: <strong>${cantidad}</strong></p>
    </div>
    `;
};