Autores: Marcus Lara e Leandro

# API Cifra Vernam

Esta API implementa a cifra de Vernam para encriptação e decriptação de textos, desenvolvida com Node.js, Express e TypeScript. A documentação interativa está disponível via Swagger.

## Funcionalidades

- **Encriptar texto**: Recebe um texto claro e uma chave segura (opcional), retorna o texto cifrado.
- **Decriptar texto**: Recebe um texto cifrado (em bits) e uma chave segura, retorna o texto original.

## Endpoints

### Encriptar

`POST /api/vernan/encrypt`

**Body:**
```json
{
  "clearText": "Hello World",
  "secureKey": "MinhaChaveOpcional" // opcional
}
```

**Resposta:**
```json
{
  "cipherText": "010101010101..." // string de bits
}
```

### Decriptar

`POST /api/vernan/decrypt`

**Body:**
```json
{
  "cipherText": "010101010101...",
  "secureKey": "MinhaChaveOpcional"
}
```

**Resposta:**
```json
{
  "clearText": "Hello World"
}
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

- O campo `cipherText` deve ser uma string de bits (apenas '0' e '1').
- A chave segura pode ser gerada automaticamente ou enviada pelo usuário.
- O Swagger exibe exemplos e validação dos campos.
