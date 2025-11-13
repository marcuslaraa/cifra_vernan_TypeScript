# API Cifra de César

**Envolvidos:** Marcus Lara, Leandro

Esta API implementa a cifra de César para encriptação, decriptação e brute force de textos, desenvolvida com Node.js, Express e TypeScript. A documentação interativa está disponível via Swagger.

## Funcionalidades

- **Encriptar texto**: Recebe um texto claro e um deslocamento (`deslocamento`), retorna o texto cifrado usando a cifra de César.
- **Decriptar texto**: Recebe um texto cifrado e um deslocamento (`deslocamento`), retorna o texto original.
- **Brute Force**: Recebe um texto cifrado e retorna todas as possíveis decifrações para todos os deslocamentos, indicando o idioma detectado.

## Endpoints

### Encriptar

`POST /api/cesar/encrypt`

**Body:**
```json
{
  "textoClaro": "Hello World",
  "deslocamento": 3
}
```

**Resposta:**
```json
{
  "textoCifrado": "Khoor Zruog"
}
```

### Decriptar

`POST /api/cesar/decrypt`

**Body:**
```json
{
  "textoCifrado": "Khoor Zruog",
  "deslocamento": 3
}
```

**Resposta:**
```json
{
  "textoClaro": "Hello World"
}
```

### Brute Force

`POST /api/cesar/bruteforce`

**Body:**
```json
{
  "textoCifrado": "Khoor Zruog"
}
```

**Resposta:**
```json
[
  {
    "deslocamento": 1,
    "textoClaro": "...",
    "idioma": "en",
    "score": 1
  },
  {
    "deslocamento": 2,
    "textoClaro": "...",
    "idioma": "unknown",
    "score": 0
  }
  // ... até deslocamento 25
]
```

## Documentação Swagger

Acesse [http://localhost:3000/api-docs](http://localhost:3000/api-docs) para visualizar e testar os endpoints.

## Como rodar

1. Instale as dependências:
   ```bash
   yarn install
   ```
2. Inicie o servidor em modo desenvolvimento:
   ```bash
   yarn dev
   ```
3. Para produção, compile e rode:
   ```bash
   yarn build
   yarn start
   ```

## Observações

- O campo `deslocamento` define o deslocamento da cifra de César.
- O endpoint de brute force retorna todas as tentativas e indica o idioma detectado.
- O Swagger exibe exemplos e validação dos campos.
