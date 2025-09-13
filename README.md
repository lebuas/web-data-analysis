
# Proyecto de Análisis de Datos por Rangos (Binning)

Este proyecto es una **replicación en Typescrip de un análisis de datos hecho en Excel** utilizando la técnica de **agrupamiento por rangos o binning**.  
El usuario ingresa únicamente un **factor de multiplicación de los coeficientes**, y el resto de los cálculos se realiza automáticamente.  
El proyecto incluye **cuatro gráficos** que representan visualmente los resultados.

## Objetivo
- Simplificar grandes volúmenes de datos manteniendo patrones relevantes.
- Reducir ruido y resaltar tendencias claras.
- Facilitar la visualización y análisis de los datos.
- Permitir ajustar la resolución mediante el tamaño de los rangos.

## Por qué es válida la técnica de reducción
- **Preserva la estructura general:** Agrupar por rangos y calcular promedios captura el comportamiento de Y sin analizar cada punto individual.  
- **Reduce ruido:** Promediar dentro de rangos suaviza fluctuaciones aleatorias.  
- **Facilita visualización:** Menos puntos representativos hacen los gráficos más claros.  
- **Escalable:** Se pueden ajustar los rangos (0.1, 0.05, etc.) según el nivel de detalle necesario.

## Cuándo usar rangos más finos
- Para datos con alta variabilidad local.  
- Para detectar patrones sutiles o anomalías.  
- Rangos más grandes son suficientes si los datos son uniformes y se busca eficiencia.

## Funcionalidad
- Permite ingresar un **factor de multiplicación de coeficientes**.  
- Calcula automáticamente los demás valores.  
- Genera automaticamente los datos y los repesetan entablas
- Genera **cuatro gráficos** con la organización visual de los datos y resultados.  

## Instrucciones para ejecutar el proyecto
Para ejecutar el proyecto es necesario tener instalado en su computadora Node.js y npm.

- Clona el repositorio
```bash
git clone https://github.com/lebuas/web-data-analysis.git
```

- Ingresar a una termina y navegar hasta el directorio donde se clonó el proyecto
- Dentro de la raiz del poryecto, ejecuta en la termina la siguiente orden para instalar las dependencias
```bash
npm install
```

- Levanta el servidor ejecutar el proyecto en local.
```bash
npm run dev
```

- Para levantar el proyecto en producción, ejecutar el siguiente comando
```bash
npm run build
```
 



