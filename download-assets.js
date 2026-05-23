import fs from 'fs';
import path from 'path';
import https from 'https';

const dirs = [
  'public/assets/images',
  'public/assets/images/portfolio'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Helper to copy file if exists
const generatedLogoPath = 'src/assets/images/id_vertical_logo_1779390478410.png';
if (fs.existsSync(generatedLogoPath)) {
  fs.copyFileSync(generatedLogoPath, 'public/assets/images/logo.png');
  fs.copyFileSync(generatedLogoPath, 'public/assets/images/logo-idvertical.png');
  if (!fs.existsSync('public/favicon.ico')) {
    fs.copyFileSync(generatedLogoPath, 'public/favicon.ico');
  }
  if (!fs.existsSync('favicon.ico')) {
    fs.copyFileSync(generatedLogoPath, 'favicon.ico');
  }
  console.log('Logo and favicon copied successfully!');
} else {
  // If not found, download a backup logo placeholder
  console.log('Generated logo not found at ' + generatedLogoPath);
}

// Map of local file path to high quality professional Unsplash image URLs
const images = {
  // Hero images
  'public/assets/images/hero-1.jpg': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1920', // Industrial climber / worker
  'public/assets/images/hero-2.jpg': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1920', // Air conditioner technician
  'public/assets/images/hero-3.jpg': 'https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?auto=format&fit=crop&q=80&w=1920', // Worker high up rope climbing

  // Services (1-6)
  'public/assets/images/servico-1.jpg': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800',  // 1: Instalação/manutenção de ar condicionado
  'public/assets/images/servico-2.jpg': 'https://images.unsplash.com/photo-1621905252507-b354bc25edac?auto=format&fit=crop&q=80&w=800',  // 2: Higienização de ar condicionado
  'public/assets/images/servico-3.jpg': 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',  // 3: Colocação e retirada de lonas promocionais
  'public/assets/images/servico-4.jpg': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',  // 4: Içamentos diversos
  'public/assets/images/servico-5.jpg': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800',  // 5: Manutenção predial
  'public/assets/images/servico-6.jpg': 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=800',  // 6: Limpeza predial (glass)

  // Portfolio (1-6)
  'public/assets/images/portfolio/foto-1.jpg': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800', // Crane hoisting
  'public/assets/images/portfolio/foto-2.jpg': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800', // Scaffold/Structure
  'public/assets/images/portfolio/foto-3.jpg': 'https://images.unsplash.com/photo-1590486803833-ffc475357be0?auto=format&fit=crop&q=80&w=800', // Rope rigging closeup
  'public/assets/images/portfolio/foto-4.jpg': 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800', // Modern AC installation
  'public/assets/images/portfolio/foto-5.jpg': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800', // Sparkly clean building facade
  'public/assets/images/portfolio/foto-6.jpg': 'https://images.unsplash.com/photo-1531844251246-9a1bfaae0d16?auto=format&fit=crop&q=80&w=800', // Skilled welder at height
};

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${dest}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      console.error(`Error downloading ${dest}: ${err.message}`);
      reject(err);
    });
  });
};

async function syncAll() {
  for (const [dest, url] of Object.entries(images)) {
    try {
      await download(url, dest);
    } catch (e) {
      console.error(`Failed: ${dest}`);
    }
  }
}

syncAll();
