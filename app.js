const btnCalcular = document.getElementById('calcularBtn');
const resultado = document.getElementById('resultado');
const resultadoFrecuencia = document.getElementById('tituloFrecuencia');
const resultadoGanancia = document.getElementById('tituloDiametro');
const contextDiametro = document.getElementById('graficoDiametro').getContext('2d');
const contextFrecuencia = document.getElementById('graficoFrecuencia').getContext('2d');

const graficoDiametro = new Chart(contextDiametro,{
    type: "line",
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: "Frecuencia de la antena (GHz)",
          },
        },
        y: {
          title: {
            display: true,
            text: "Ganacia(dB)",
          },
        },
      },
      
    },
  });


const graficoFrecuencia = new Chart(contextFrecuencia, {
  type: "line",
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: "Diámetro de la antenta (metros)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Ganacia(dB)",
        },
      },
    },
  },
});


function calcularGanancia() {
  let diametro = parseFloat(document.getElementById("diametro").value);
  let frecuencia = parseFloat(document.getElementById("frecuencia").value);

  let area = Math.PI * Math.pow(diametro / 2, 2);
  let lambda = (3 * Math.pow(10, 8)) / (frecuencia * Math.pow(10, 9));
  let ganancia = 10 * Math.log10((7 * area) / Math.pow(lambda, 2));

  resultado.innerHTML = `Ganancia de la antena : ${ganancia.toFixed(2)} dB`;
  resultadoFrecuencia.innerHTML = `Proyecciones variando la Frecuencia con un Diámetro fijo de: ${diametro} m`
  resultadoGanancia.innerHTML = `Proyecciones variando el Diámetro con una Frecuencia fija de ${frecuencia} Ghz `



  console.log(ganancia)
  // Crear gráfica
  graficar(graficoDiametro, diametro);
  graficar(graficoFrecuencia, null,frecuencia);
}

function graficar(chart, diameter = null, frequency = null) {
  let chartData = generarDatosGrafica(diameter, frequency);

  chart.data = chartData;
  chart.update();
}

function generarDatosGrafica(diameter, frequency) {
  let data = [];
  let labels = [];

  if (diameter == null) {
    let diameter = 0.5;
    while (diameter <= 15) {
      let area = Math.PI * Math.pow(diameter / 2, 2);
      let lambda = (3 * Math.pow(10, 8)) / (frequency * Math.pow(10, 9));
      let ganancia = 10 * Math.log10((7 * area) / Math.pow(lambda, 2));
      data.push({
        x: diameter.toFixed(2),
        y: ganancia.toFixed(2),
      });

      labels.push(diameter.toFixed(2));

      diameter += 0.5;
    }
  }
  
  if (frequency == null) {
    let frequency = 0.5;
    while (frequency <= 15) {
      let area = Math.PI * Math.pow(diameter / 2, 2);
      let lambda = (3 * Math.pow(10, 8)) / (frequency * Math.pow(10, 9));
      let ganancia = 10 * Math.log10(7 * area / Math.pow(lambda, 2));
      data.push({
        x: frequency.toFixed(2),
        y: ganancia.toFixed(2),
      });

      labels.push(frequency.toFixed(2));

      frequency += 0.5;
    }
  }

 return {
    datasets: [
      {
        label: "Ganancia (dB)",
        data: data,
        borderColor: "blue",
        fill: false,
      },
    ],
    labels: labels,
  };
}


btnCalcular.addEventListener('click',(e)=>{
    e.preventDefault();
    calcularGanancia();
})