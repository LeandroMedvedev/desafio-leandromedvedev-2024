class RecintosZoo {
  constructor() {
    this.recintos = [
      {
        numero: 1,
        bioma: ["savana"],
        tamanhoTotal: 10,
        animais: [{ especie: "MACACO", quantidade: 3 }],
      },
      { numero: 2, bioma: ["floresta"], tamanhoTotal: 5, animais: [] },
      {
        numero: 3,
        bioma: ["savana", "rio"],
        tamanhoTotal: 7,
        animais: [{ especie: "GAZELA", quantidade: 1 }],
      },
      { numero: 4, bioma: ["rio"], tamanhoTotal: 8, animais: [] },
      {
        numero: 5,
        bioma: ["savana"],
        tamanhoTotal: 9,
        animais: [{ especie: "LEAO", quantidade: 1 }],
      },
    ];

    this.animaisValidos = [
      { especie: "LEAO", tamanho: 3, bioma: ["savana"], carnivoro: true },
      { especie: "LEOPARDO", tamanho: 2, bioma: ["savana"], carnivoro: true },
      { especie: "CROCODILO", tamanho: 3, bioma: ["rio"], carnivoro: true },
      {
        especie: "MACACO",
        tamanho: 1,
        bioma: ["savana", "floresta"],
        carnivoro: false,
      },
      { especie: "GAZELA", tamanho: 2, bioma: ["savana"], carnivoro: false },
      {
        especie: "HIPOPOTAMO",
        tamanho: 4,
        bioma: ["savana", "rio"],
        carnivoro: false,
      },
    ];
  }

  analisaRecintos(animal, quantidade) {
    const animalEncontrado = this.encontraAnimal(animal);

    if (!animalEncontrado) {
      return { erro: "Animal inválido", recintosViaveis: false };
    }

    if (!this.quantidadeValida(quantidade)) {
      return { erro: "Quantidade inválida", recintosViaveis: false };
    }

    const recintosViaveis = this.recintos.filter((recinto) => {
      return (
        this.biomaCompativel(recinto, animalEncontrado) &&
        this.temEspacoSuficiente(recinto, animalEncontrado, quantidade) &&
        this.validarCarnivoros(recinto, animalEncontrado) &&
        this.validarHipopotamos(recinto, animalEncontrado) &&
        this.validarMacacos(recinto, animalEncontrado)
      );
    });

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável", recintosViaveis: false };
    }

    const resultadoRecintos = recintosViaveis.map((recinto) => {
      const espacoLivre = this.calculaEspacoLivre(
        recinto,
        animalEncontrado,
        quantidade,
      );
      return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
    });

    return { erro: false, recintosViaveis: resultadoRecintos };
  }

  encontraAnimal(animal) {
    return this.animaisValidos.find((a) => a.especie === animal);
  }

  quantidadeValida(quantidade) {
    return quantidade > 0;
  }

  biomaCompativel(recinto, animalEncontrado) {
    return recinto.bioma.some((bioma) =>
      animalEncontrado.bioma.includes(bioma),
    );
  }

  temEspacoSuficiente(recinto, animalEncontrado, quantidade) {
    const totalEspacoOcupado = recinto.animais.reduce((total, a) => {
      const especie = this.encontraAnimal(a.especie);
      return total + especie.tamanho * a.quantidade;
    }, 0);

    const espacoNecessario =
      animalEncontrado.tamanho * quantidade +
      (recinto.animais.length > 0 ? 1 : 0);
    const espacoDisponivel = recinto.tamanhoTotal - totalEspacoOcupado;

    return espacoNecessario <= espacoDisponivel;
  }

  validarCarnivoros(recinto, animalEncontrado) {
    if (animalEncontrado.carnivoro) {
      return recinto.animais.every(
        (a) => a.especie === animalEncontrado.especie,
      );
    }
    return true;
  }

  validarHipopotamos(recinto, animalEncontrado) {
    const temHipopotamo = recinto.animais.some(
      (a) => a.especie === "HIPOPOTAMO",
    );
    if (animalEncontrado.especie === "HIPOPOTAMO") {
      return (
        !temHipopotamo ||
        (recinto.bioma.includes("rio") && recinto.bioma.includes("savana"))
      );
    }
    if (temHipopotamo) {
      return recinto.bioma.includes("rio");
    }
    return true;
  }

  validarMacacos(recinto, animalEncontrado) {
    if (animalEncontrado.especie === "MACACO" && recinto.animais.length === 0) {
      return false;
    }
    return true;
  }

  calculaEspacoLivre(recinto, animalEncontrado, quantidade) {
    const totalEspacoOcupado = recinto.animais.reduce((total, a) => {
      const especie = this.encontraAnimal(a.especie);
      return total + especie.tamanho * a.quantidade;
    }, 0);

    const espacoNecessario = animalEncontrado.tamanho * quantidade;
    return recinto.tamanhoTotal - (totalEspacoOcupado + espacoNecessario);
  }
}

export { RecintosZoo as RecintosZoo };
