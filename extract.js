const fs = require('fs');
const html = fs.readFileSync('insideast.html', 'utf8');

const slides = html.match(/class="slideshow__slide-bg[^>]*>[\s\S]*?<\/div>/g);
let output = '';
if (slides) {
    slides.forEach((s, i) => {
        const imgMatch = s.match(/srcset="[^"]* ([^" ]+) 3200w"/);
        const fallbackImg = s.match(/src="([^"]+)"/);
        const img = imgMatch ? imgMatch[1] : (fallbackImg ? fallbackImg[1] : 'NOT FOUND');
        output += `Slide ${i + 1}: ${img}\n`;
    });
} else {
    output = "No slides found.";
}
fs.writeFileSync('slides.txt', output);
