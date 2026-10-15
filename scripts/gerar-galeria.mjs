/* Gera as galerias de fotos do site, em WebP, a partir das pastas originais.

   Uso (uma vez: "npm install" dentro da pasta scripts; depois):
     cd scripts
     npm run galeria

   Para cada galeria abaixo:
   - lê as fotos (.jpg, .png ou .webp) do primeiro nível da pasta de origem;
   - gera a versão da galeria (lado maior de 1400 px) e a versão ampliada em "grande" (2000 px);
   - atualiza o arquivo data/galeria-*.js com a lista de fotos.
   Para tirar ou acrescentar fotos, mexa na pasta original e rode o script de novo.
   As pastas originais e esta pasta (scripts) não vão para o site (ver .vercelignore). */
import { readdirSync, mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

// SHARP_PATH permite apontar para uma instalação do sharp fora desta pasta (uso opcional).
let sharp = null;
try { sharp = require('sharp'); } catch { if (process.env.SHARP_PATH) sharp = require(process.env.SHARP_PATH); }
if (!sharp) {
  console.error('Não achei o "sharp". Rode "npm install" dentro da pasta scripts e tente de novo.');
  process.exit(1);
}
sharp.cache(false); // não manter arquivos abertos (no Windows isso trava a limpeza da pasta)

const galerias = [
  { origem: 'assets/Fotos Glaucia Afonso', destino: 'assets/galeria/glaucia-afonso', variavel: 'GALERIA_GLAUCIA', manifesto: 'data/galeria-glaucia.js' },
  { origem: 'assets/Fotos So se for Flash', destino: 'assets/galeria/so-se-for-flash', variavel: 'GALERIA_FLASH', manifesto: 'data/galeria-flash.js' }
];
// A miniatura da galeria e a versão ampliada (subpasta "grande").
const tamanhos = [{ pasta: '', lado: 1400 }, { pasta: 'grande', lado: 2000 }];

const numero = (nome) => Number((nome.match(/\d+/) || [0])[0]);

for (const g of galerias) {
  const origem = join(raiz, g.origem);
  const destino = join(raiz, g.destino);
  if (!existsSync(origem)) { console.warn(`Pasta de origem não encontrada, galeria ignorada: ${origem}`); continue; }

  // Remove as versões antigas, para que fotos apagadas da pasta original saiam do site.
  for (const t of tamanhos) {
    const pasta = t.pasta ? join(destino, t.pasta) : destino;
    mkdirSync(pasta, { recursive: true });
    for (const e of readdirSync(pasta, { withFileTypes: true })) {
      if (e.isFile() && /\.(jpe?g|png|webp)$/i.test(e.name)) rmSync(join(pasta, e.name));
    }
  }

  const fotos = readdirSync(origem, { withFileTypes: true })
    .filter((e) => e.isFile() && /\.(jpe?g|png|webp)$/i.test(e.name))
    .map((e) => e.name)
    .sort((a, b) => numero(a) - numero(b));

  const nomes = [];
  let n = 0;
  for (const foto of fotos) {
    n += 1;
    const nome = `${String(n).padStart(3, '0')}.webp`;
    for (const t of tamanhos) {
      const pasta = t.pasta ? join(destino, t.pasta) : destino;
      await sharp(join(origem, foto))
        .rotate() // respeita a orientação gravada pela câmera
        .resize({ width: t.lado, height: t.lado, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 })
        .toFile(join(pasta, nome));
    }
    nomes.push(nome);
    console.log(`${g.destino}/${nome} <- ${foto}`);
  }

  const pastaSite = g.destino;
  const linhas = nomes.map((nome) => `  "${pastaSite}/${nome}"`).join(',\n');
  const conteudo = `/* Gerado por scripts/gerar-galeria.mjs. Não edite à mão: rode o script de novo. */\nwindow.${g.variavel} = [\n${linhas}\n];\n`;
  writeFileSync(join(raiz, g.manifesto), conteudo, 'utf8');
  console.log(`Pronto: ${nomes.length} fotos em ${g.destino}.`);
}
