function parseScript() {
    const scriptText = document.getElementById('scriptInput').value;
    const selectedLang = document.getElementById('languageSelect').value;
    const outputContainer = document.getElementById('outputContainer');
    const resultContent = document.getElementById('resultContent');

    if (!scriptText.trim()) {
        alert('Pehle kuch script toh paste karo bhai!');
        return;
    }

    const scenes = scriptText.split(/###\s*Scene|Scene\s*\d+:/gi).filter(Boolean);
    
    let htmlOutput = `<p style="color: #34d399; margin-bottom: 15px;">🎬 Format: <strong>YouTube 16:9 Widescreen</strong> | Language: <strong>${selectedLang}</strong></p>`;
    
    scenes.forEach((scene, index) => {
        let sceneContent = scene.trim();
        
        htmlOutput += `
            <div class="scene-card">
                <h3>Scene ${index + 1} (${selectedLang})</h3>
                <p><strong>Script / Action:</strong> ${sceneContent}</p>
                <hr style="border-color: #334155; margin: 10px 0;">
                <p><strong>🎥 Video Gen Prompt (YouTube 16:9):</strong> <br><em>Cinematic anamorphic shot, photorealistic 8k, dramatic lighting, smooth camera zoom-in, --ar 16:9</em></p>
                <p><strong>🎙️ Voiceover Payload (ElevenLabs API Ready):</strong> <br><em>Language: ${selectedLang}, Emotional tone: Dystopian thriller, stability: 0.75</em></p>
                <span class="status">Status: Ready for API Rendering</span>
            </div>
            <hr style="border-color: #334155; margin: 15px 0;">
        `;
    });

    resultContent.innerHTML = htmlOutput;
    outputContainer.style.display = 'block';
}
