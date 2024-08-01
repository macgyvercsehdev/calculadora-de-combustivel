import React, { useState } from 'react';
import { 
  SafeAreaView, 
  Text, 
  TextInput, 
  Button, 
  View, 
  Keyboard, 
  TouchableWithoutFeedback 
} from 'react-native';

const App = () => {
  const [precoCombustivel, setPrecoCombustivel] = useState('');
  const [distancia, setDistancia] = useState('');
  const [consumo, setConsumo] = useState('');
  const [custoTotal, setCustoTotal] = useState<number | null>(null);

  const formatarMoeda = (valor: number | null) => {
    if (valor === null) return 'R$ 0,00';

    const valorFormatado = valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });

    return valorFormatado;
  };

  const calcularCusto = () => {
    // Substituir vírgulas por pontos para garantir que o parseFloat funcione corretamente
    const precoLimpo = precoCombustivel.trim().replace(',', '.');
    const distanciaLimpa = distancia.trim().replace(',', '.');
    const consumoLimpo = consumo.trim().replace(',', '.');

    // Converter para float
    const preco = parseFloat(precoLimpo);
    const dist = parseFloat(distanciaLimpa);
    const cons = parseFloat(consumoLimpo);


    if (!isNaN(preco) && !isNaN(dist) && !isNaN(cons)) {
      const consumoCombustivel = dist / cons;
      console.log(consumoCombustivel);
      const custo = consumoCombustivel * preco;
      console.log(custo);
      setCustoTotal(custo);
    } else {
      setCustoTotal(null);
    }
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
        <View className="w-full max-w-md px-4">
          <Text className="text-2xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Calculadora de Combustível</Text>
          <View className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow">
            <View className="mb-4">
              <Text className="text-base mb-2 text-gray-900 dark:text-gray-100">Preço do combustível (R$/L)</Text>
              <TextInput
                className="w-full p-4 bg-white dark:bg-gray-700 rounded-lg shadow text-gray-900 dark:text-gray-100 text-xl"
                placeholder="Digite o preço do combustível"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={precoCombustivel}
                onChangeText={setPrecoCombustivel}
              />
            </View>

            <View className="mb-4">
              <Text className="text-base mb-2 text-gray-900 dark:text-gray-100">Distância a percorrer (km)</Text>
              <TextInput
                className="w-full p-4 bg-white dark:bg-gray-700 rounded-lg shadow text-gray-900 dark:text-gray-100 text-xl"
                placeholder="Digite a distância"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={distancia}
                onChangeText={setDistancia}
              />
            </View>

            <View className="mb-4">
              <Text className="text-base mb-2 text-gray-900 dark:text-gray-100">Consumo do veículo (km/L)</Text>
              <TextInput
                className="w-full p-4 bg-white dark:bg-gray-700 rounded-lg shadow text-gray-900 dark:text-gray-100 text-xl"
                placeholder="Digite o consumo"
                placeholderTextColor="#888"
                keyboardType="numeric"
                value={consumo}
                onChangeText={setConsumo}
              />
            </View>

            <Button title="Calcular" onPress={calcularCusto} />

            {custoTotal !== null && (
              <View className="mt-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
                <Text className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Custo Total da Viagem: R$ {custoTotal.toFixed(2)}
                </Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default App;
