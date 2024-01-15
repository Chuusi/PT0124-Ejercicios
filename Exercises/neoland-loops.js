//*Iteración#1: Usa includes

/* const products = ['Camiseta de Pokemon', 'Pantalón coquinero', 'Gorra de gansta', 'Camiseta de Basket', 'Cinrurón de Orión', 'AC/DC Camiseta'];
for (let i=0; i<products.length; i++){
    if (products[i].includes("Camiseta")){
        console.log(products[i]);
    }
} */

//*Iteración#2 Condicionales avanzados

/* const alumns = [
    {name: 'Pepe Viruela', T1: false, T2: false, T3: true}, 
	{name: 'Lucia Aranda', T1: true, T2: false, T3: true},
	{name: 'Juan Miranda', T1: false, T2: true, T3: true},
	{name: 'Alfredo Blanco', T1: false, T2: false, T3: false},
	{name: 'Raquel Benito', T1: true, T2: true, T3: true}
];
alumns.forEach((alumns)=>{
    let aprobadas = 0;
    for(let trimestre in alumns){
        if(alumns[trimestre] == true){
            aprobadas++;
            console.log("entro");
        }
    }
    if (aprobadas>=2){
        alumns.isApproved = true;
    }
    else{
        alumns.isApproved = false;
    }
})
console.log(alumns); */

//*Iteración#3 Probando For...of

/* const placesToTravel = ['Japon', 'Venecia', 'Murcia', 'Santander', 'Filipinas', 'Madagascar'];
for (place of placesToTravel){
    console.log(place);
} */

//*Iteración#4 Probando For...in

const alien = {
    name: 'Wormuck',
    race: 'Cucusumusu',
    planet: 'Eden',
    weight: '259kg'
}
for(data in alien){
    console.log(`${data} : ${alien[data]}`);
}