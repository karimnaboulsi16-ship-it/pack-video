const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const bonusImages = [
    '/assets/aistudio/72d29dcb-22ba-4af9-9706-b7a3c449d107_7da3e9fb.jpg', // Guia de Horários
    '/assets/aistudio/d0c6fcc3-3192-404e-8a0d-824ef7e02f47_5192d4a4.jpg'  // Audios e Músicas
];

// Reconstruct the bonus list items in App.tsx
// We need to inject an img before h3 for each bonus
// Let's target the Bonus blocks
const bonusBlock = /_jsxs\(`div`, \{ className: `bg-\[#1A1A1A\] border border-\[#CCFF00\]\/30 rounded-2xl p-6 transition-transform hover:scale-105`, children: \[ _jsxs\(`div`, \{ className: `flex justify-between items-center mb-4`, children: \[ _jsx\(`span`, \{ className: `bg-\[#1A1A1A\] border border-\[#CCFF00\] text-\[#CCFF00\] px-3 py-1 rounded-md text-xs font-bold`, children: `BONO #0([1-4])` \}\), _jsx\(`span`, \{ className: `bg-\[#CCFF00\] text-black px-3 py-1 rounded-md text-xs font-bold uppercase`, children: `Gratis` \} \)\s+\] \}\),\s+_jsx\(`h3`, \{ className: `text-white text-lg font-bold mb-4`, children: `([^`]+)` \}/g;

const newBlock = (bonoNum, title) => {
    let imgTag = '';
    // Use the first image for Bono 1, second for Bono 2.
    if (bonoNum === '1') imgTag = `_jsx(\`img\`, { src: '${bonusImages[0]}', alt: '${title}', className: \`w-full h-40 object-cover rounded-xl mb-4\` }),`;
    if (bonoNum === '2') imgTag = `_jsx(\`img\`, { src: '${bonusImages[1]}', alt: '${title}', className: \`w-full h-40 object-cover rounded-xl mb-4\` }),`;
    
    return `_jsxs(\`div\`, {
              className: \`bg-[#1A1A1A] border border-[#CCFF00]/30 rounded-2xl p-6 transition-transform hover:scale-105\`,
              children: [
                _jsxs(\`div\`, {
                  className: \`flex justify-between items-center mb-4\`,
                  children: [
                    _jsx(\`span\`, { className: \`bg-[#1A1A1A] border border-[#CCFF00] text-[#CCFF00] px-3 py-1 rounded-md text-xs font-bold\`, children: \`BONO #0${bonoNum}\` }),
                    _jsx(\`span\`, { className: \`bg-[#CCFF00] text-black px-3 py-1 rounded-md text-xs font-bold uppercase\`, children: \`Gratis\` })
                  ]
                }),
                ${imgTag}
                _jsx(\`h3\`, { className: \`text-white text-lg font-bold mb-4\`, children: \`${title}\` },
`;
};

// This regex approach is fragile due to formatting, let's use a simpler index-based replacement if possible, 
// or manually rebuild the bonuses list string in App.tsx.
// Since the bonus block was added programmatically, let's just find and replace the whole bonus section.

const startBonusSection = content.indexOf('children: [ _jsx(`h2`, { className: `text-3xl sm:text-4xl font-black text-white text-center mb-12`, children: `Bônus Exclusivos` }),');
const endBonusSection = content.indexOf('_jsx(`section`,{id:`checkout`');

if (startBonusSection !== -1 && endBonusSection !== -1) {
    // This is getting complex to regex. Let's just create a new bonus string
    console.log('Found bonus section');
}

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated!');
