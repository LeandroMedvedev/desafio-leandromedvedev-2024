class RecintosZoo {
  analisaRecintos(animal, quantidade) {
    if (quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    const animaisValidos = [
      "LEAO",
      "LEOPARDO",
      "CROCODILO",
      "MACACO",
      "GAZELA",
      "HIPOPOTAMO",
    ];

    if (!animaisValidos.includes(animal.toUpperCase())) {
      return { erro: "Animal inválido" };
    }

    return { recintosViaveis: [] };
  }
}

export { RecintosZoo as RecintosZoo };
