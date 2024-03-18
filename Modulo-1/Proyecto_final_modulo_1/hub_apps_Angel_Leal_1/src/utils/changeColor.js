/* Función para devolver colores random en formato RGBA, se deja el último componente vacío para ajustar
la transparencia en el momento de su utilización */

export const changeColorRGB = () => {
    const randomNumber = (min, max) => {
        min = Math.ceil(min);
        console.log(min);
        max = Math.floor(max);
        console.log("🚀 ~ file: changeColor.js:6 ~ randomNumber ~ max:", max);
      const random = Math.floor(Math.random() * (max - min + 1) + min);
        console.log(
        "🚀 ~ file: changeColor.js:8 ~ randomNumber ~  random:",
        random
        );

    return random;
    };

    let R = randomNumber(0, 255);
    let G = randomNumber(0, 255);
    let B = randomNumber(0, 255);

    const color = `rgba(${R},${G},${B},`;
    return color;
};