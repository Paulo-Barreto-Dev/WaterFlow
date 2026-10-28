# WaterFlow — Fase 2

Aplicativo Android privado para três amigos. Esta fase acrescenta login com Supabase Auth, sessão persistente e rotas protegidas. O temporizador, a câmera e a galeria continuam como prévias visuais: nenhum consumo ou fotografia é salvo.

## Requisitos

- Node.js e npm
- Projeto Supabase configurado pelo administrador (passos abaixo)
- Para o build Android: JDK, Android SDK e aparelho com depuração USB ou emulador

## Configuração do Supabase pelo administrador

1. Crie um projeto Supabase. Em **Authentication → Providers**, mantenha o provedor **Email** ativo. Nas configurações de Auth, desative **Allow new users to sign up** e **Allow anonymous sign-ins**. Não há cadastro no aplicativo.
2. Em **Authentication → Users**, crie exatamente as três contas com e-mail e senha e confirme seus e-mails conforme o fluxo escolhido. Guarde os UUIDs mostrados para cada usuário. Não crie usuários inserindo linhas diretamente em `auth.users`.
3. Execute [supabase/phase2_profiles.sql](supabase/phase2_profiles.sql) no **SQL Editor**. A tabela aceita no máximo três linhas por meio de `member_slot` (valores 1, 2 e 3). Somente o administrador pode inserir, editar ou remover perfis; cada participante pode consultar apenas o próprio perfil.
4. No SQL Editor, insira uma linha para cada conta real, substituindo UUID e nome pelos valores correspondentes:

   ```sql
   insert into public.profiles (id, member_slot, name)
   values ('UUID_DA_CONTA_REAL', 1, 'NOME_REAL');
   ```

   Use `member_slot` 1, 2 e 3, uma vez por usuário. Sem perfil, uma conta Auth não entra no aplicativo.
5. Copie `.env.example` para `.env` e preencha **apenas** a URL do projeto e a chave **publishable**. Não coloque `service_role`, secret key ou senhas no aplicativo. `.env` é ignorado pelo Git.

## Instalação e build Android

No PowerShell:

```powershell
npm ci
Copy-Item .env.example .env
. .\scripts\use-local-android.ps1
npx expo prebuild --clean
npx expo run:android --device
npx expo start
```

Preencha `.env` antes de iniciar o Metro. O script `use-local-android.ps1` é necessário somente quando JDK e Android SDK estão em `.local-tools/`. `prebuild --clean` regenera o projeto nativo; execute novamente antes de recompilar após alterar dependências nativas ou `app.json`. `run:android --device` compila e instala no aparelho selecionado. `expo start` inicia o Metro após a instalação.

## Verificação manual da autenticação

- Sem sessão, tente abrir `/`, `/camera` e `/gallery` por deep link: o aplicativo deve mostrar o login.
- A resposta para **amigo mais legal** deve ser exatamente `Paulo`; outras respostas devem ser rejeitadas antes da chamada ao Supabase.
- Entre com uma das três contas autorizadas. A Home deve mostrar o nome do perfil cadastrado.
- Feche e reabra o aplicativo: a sessão deve continuar ativa. Toque em **Sair** e confirme que as telas protegidas voltam a exigir login.
- Uma conta Auth sem linha em `profiles` deve ser recusada mesmo com senha correta.
- No SQL Editor, confira que há três linhas ou menos em `profiles`, que RLS está ativo e que só existe a política SELECT do próprio usuário. Teste requisições com chave pública como usuário autenticado: o usuário deve ler somente seu perfil; `anon` não deve ler perfis; INSERT, UPDATE e DELETE pelo cliente devem falhar.

O aplicativo não oferece recuperação de senha; o administrador gerencia as três contas no Supabase. A resposta `Paulo` é uma condição da interface, não substitui senha nem a autorização por perfil no banco.

## Verificações locais

```powershell
npm run typecheck
npm run doctor
npx expo export --platform android
```

## Estrutura

```text
src/
  app/             Login e grupo (app) protegido com Início, Câmera e Galeria
  components/      Provedor de autenticação e componentes visuais
  config/          Tema e cartões provisórios dos participantes
  services/        Cliente Supabase e consulta de perfil autorizado
  types/           Tipos de perfil e fotografia
supabase/          SQL da tabela profiles e política RLS
```

Os cartões dos outros dois amigos ainda usam rótulos provisórios; eles não representam contas criadas. Fotografia obrigatória, galeria compartilhada, temporizadores reais e alarmes pertencem a fases futuras.
