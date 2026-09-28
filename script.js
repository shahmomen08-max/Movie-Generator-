function parseScript() {
    const scriptText = document.getElementById('scriptInput').value;
    const outputContainer = document.getElementById('outputContainer');
    const resultContent = document.getElementById('resultContent');

    if (!scriptText.trim()) {
        alert('Pehle kuch script toh paste karo bhai!');
        return;
    }

    // Script ko scenes mein todna
    const scenes = scriptText.split(/Scene/gi).filter(Boolean);
    
    let htmlOutput = '';
    scenes.forEach((scene, index) => {
        htmlOutput += `
            <div class="scene-card">
                <h3>Scene ${index + 1}</h3>
                <p><strong>Raw Text:</strong> ${scene.trim()}</p>
                <p><strong>Cinematic Prompt:</strong> <em>Anamorphic 35mm, moody neon lighting, photorealistic sci-fi shot, 8k --ar 16:9</em></p>
                <span class="status">Status: Ready for Generation</span>
            </div>
            <hr style="border-color: #334155; margin: 15px 0;">
        `;
    });

    resultContent.innerHTML = htmlOutput;
    outputContainer.style.display = 'block';
}
