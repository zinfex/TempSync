# ThermoBoard

Este projeto consiste em um sistema de monitoramento de temperatura (e umidade) construído em **React**, que utiliza um **arquivo JSON** para simular dados de diversos dispositivos (sensores). Cada dispositivo fornece leituras de temperatura e umidade ao longo do tempo, que são exibidas em gráficos e tabelas. Ele permite que o usuário visualize facilmente dados como:

- Temperatura atual  
- Umidade atual  
- Média, mínimo e máximo das últimas horas  
- Intervalo de recomendação (referência) para cada sensor  
- Força de sinal Wi-Fi (RSSI)  
- Bateria e status  

---

## Índice

1. [Visão Geral](#visão-geral)  
2. [Como Executar](#como-executar)  
3. [Estrutura de Pastas](#estrutura-de-pastas)  
4. [Arquivo `devices.json`](#arquivo-devicesjson)  
   - [Exemplo de Formato](#exemplo-de-formato)  
5. [Carregando os Dados](#carregando-os-dados)  
6. [Principais Componentes](#principais-componentes)  
7. [Personalizações Possíveis](#personalizações-possíveis)  

---

## Visão Geral

O projeto tem como objetivo demonstrar como exibir informações de dispositivos de monitoramento de temperatura e umidade em um dashboard:

- **Tabela de Dispositivos**: Exibe todos os sensores.  
- **Dashboard Individual**: Ao clicar em um sensor, o usuário acessa uma página com informações detalhadas do mesmo (nome, local, leituras recentes, gráficos de temperatura e umidade).  
- **Gráficos**: Plotados via `ReactApexChart`, permitindo escolher intervalos de 1h, 6h ou 24h.  
- **Edição de Campos**: Como nome do dispositivo, local de instalação e referências de temperatura/umidade.  

Atualmente, os dados vêm de um arquivo `devices.json` para fins de **demonstração** (sem necessidade de integrar a uma API real). No futuro, caso seja desejada uma integração com backend, basta trocar a leitura local pela chamada de uma API.

---

## Como Executar

1. **Instale as dependências**:
   ```bash
   npm install
2. **Executar projeto**:
   ```bash
   npm run dev
