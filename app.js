const ciudadInput = document.getElementById("ciudad")
const botonBuscar = document.getElementById("buscar")
const resultado = document.getElementById("resultado")

const apiKey='ba49731e9be89d3ea3ff419ccbecd757';
const baseUrl ='https://api.openweathermap.org/data/2.5/weather';


botonBuscar.addEventListener('click', async()=>{
const ciudad = ciudadInput.value.trim();
if (!ciudad){
    resultado.innerHTML = `<p>Por favor ingresa una ciudad</p>`
    return;
}

try{
    const res = await fetch (`${baseUrl}?q=${ciudad}&appid=${apiKey}&units=metric`)
    if (!res.ok) throw new Error ('Ciudad no encontrada');
    const data = await res.json();
    console.log(data);
 
    const {main, weather, name}=data;

    const descripcion = weather[0].description.toLowerCase();
document.body.className = "";

if (descripcion.includes("rain") || descripcion.includes("drizzle")) {
    document.body.classList.add("lluvioso");
} else if (descripcion.includes("clear")|| descripcion.includes("few clouds")) {
    document.body.classList.add("soleado");
} else if (descripcion.includes("snow")) {
    document.body.classList.add("nevado") ;
} else if (descripcion.includes("overcast clouds") || descripcion.includes("scattered clouds") || descripcion.includes("mist") || descripcion.includes("fog")) {
    document.body.classList.add("nublado");
} else {
    document.body.classList.add("default");
}


    resultado.innerHTML = `
    <h2>Clima en ${name}</h2>
    <p><strong>Temperatura:</strong>${main.temp}°C</p>
    <p><strong>Descripcion:</strong>${weather[0].description}</p>
    <p><strong>Humedad:</strong>${main.humidity}%</p>
    `;
}catch(error){
    console.error(error);
    resultado.innerHTML=`<p>Error:${error.message}</p>`;
}
});

