# WaterFlow — Fase 1

Aplicativo Android privado para três amigos acompanharem a hidratação por fotografias. Esta fase entrega a base visual e a navegação; ainda não registra consumo nem acessa câmera ou banco de dados.

## Requisitos

- Node.js e npm
- Expo Go em um aparelho Android, ou Android Studio com emulador configurado

## Instalação e execução

```bash
npm install
cp .env.example .env
npm start
```

No PowerShell, copie o exemplo com `Copy-Item .env.example .env`. Preencha o arquivo `.env` com a URL e a chave publicável do seu projeto Supabase quando a integração for usada. A Fase 1 inicia mesmo sem esse arquivo, pois o cliente só é criado quando solicitado por uma funcionalidade futura.

Abra o QR code no Expo Go para Android. Com um emulador Android iniciado, pressione `a` no terminal do Expo. Para instalar o build de desenvolvimento, siga a seção abaixo.

## Build de desenvolvimento Android

Para compilar localmente, instale o JDK e o Android SDK, configure `JAVA_HOME` e `ANDROID_HOME` e tenha um emulador iniciado ou aparelho conectado com depuração USB. Este checkout também aceita a instalação local em `.local-tools/` (ignorada pelo Git). Nesse caso, carregue o ambiente em cada terminal PowerShell com `. .\scripts\use-local-android.ps1`.

```bash
npx expo prebuild --clean
npx expo run:android
npx expo start
```

O primeiro comando gera o projeto nativo. Execute-o novamente antes de recompilar quando mudar uma dependência nativa ou `app.json`. O segundo compila e instala no emulador; use `npx expo run:android --device` para escolher um aparelho físico. Após a instalação, `npx expo start` inicia somente o servidor de desenvolvimento. Os diretórios nativos gerados ficam fora do Git.

## Verificações

```bash
npm run typecheck
npx expo-doctor
npx expo export --platform android
```

## Estrutura

```text
src/
  app/           Rotas Expo Router: Início, Câmera e Galeria
  components/    Componentes visuais compartilhados
  config/        Tema e dados provisórios dos três participantes
  services/      Configuração inicial do cliente Supabase
  types/         Tipo de fotografia usado pela galeria
```

O botão **BEBI ÁGUA!** leva à interface provisória da câmera. O círculo `03:00:00` é apenas uma prévia visual do intervalo de três horas. Os cartões dos usuários e a galeria contêm dados de apresentação; nada é salvo nesta fase.

## Próximas fases

Temporizadores individuais de três horas, fotografia obrigatória para cada hidratação, galeria compartilhada, alarmes limitados a 08:00–19:59 em `America/Sao_Paulo` e distribuição por APK ainda não foram implementados.

Use somente a **chave publicável** do Supabase em `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Variáveis `EXPO_PUBLIC_` ficam visíveis no aplicativo compilado; nunca coloque nelas uma chave secreta.
