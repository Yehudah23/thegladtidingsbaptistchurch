#!/usr/bin/env node
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, 'public');

const images = [
  { input: 'english-display.jpg', output: 'english-display-optimized.jpg' },
  { input: 'yoruba-display.jpg', output: 'yoruba-display-optimized.jpg' },
  { input: 'church-image.jpg', output: 'church-image-optimized.jpg' }
];

console.log('🎨 Starting image optimization...\n');

async function optimizeImages() {
  for (const img of images) {
    const inputPath = path.join(publicDir, img.input);
    const outputPath = path.join(publicDir, img.output);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  ${img.input} not found, skipping...`);
      continue;
    }

    console.log(`📸 Optimizing ${img.input}...`);

    try {
      const info = await sharp(inputPath)
        .resize(2560, 1440, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 85, progressive: true })
        .toFile(outputPath);

      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = info.size;
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

      console.log(`  ✓ Original: ${(originalSize / (1024 * 1024)).toFixed(2)} MB`);
      console.log(`  ✓ Optimized: ${(optimizedSize / (1024 * 1024)).toFixed(2)} MB`);
      console.log(`  ✓ Savings: ${savings}%`);
      console.log(`  ✓ Resolution: ${info.width}x${info.height}`);
      
      // Replace original with optimized
      fs.copyFileSync(outputPath, inputPath);
      fs.unlinkSync(outputPath);
      console.log(`  ✓ Replaced original with optimized version\n`);

    } catch (error) {
      console.error(`  ✗ Error optimizing ${img.input}:`, error.message);
    }
  }

  console.log('✅ Optimization complete!');
  console.log('\nYour images are now web-optimized and ready to use!');
}

optimizeImages().catch(console.error);
