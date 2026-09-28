// ==========================================
// MOVIE GENERATOR - ENGINE SCRIPT
// ==========================================

// ElevenLabs API Key (Secured for Momen's Project)
const ELEVEN_API_KEY = "sk_30976b79f739ee33e9ca0926055329812ec7fe6056c1b80d";

// Default Character Consistency Profile (Locks the main character's face across all scenes)
const CHARACTER_PROFILE = "A 28-year-old male protagonist with sharp features, short dark hair, wearing a high-tech sci-fi tactical jacket, cinematic lighting, photorealistic, 8k, 16:9 widescreen format.";

// Scene Parser & Prompt Generator Function
function generateMovieAssets() {
    const rawScript = document.getElementById("scriptInput").value;
    const outputContainer = document.getElementById("outputSection");
    
    if (!rawScript.trim()) {
        alert("Pehle kuch script toh likhein Momen bhai!");
        return;
    }

    outputContainer.innerHTML = "<h3>🎬 Generating Movie Breakdown & Prompts...</h3>";

    // Split script into scenes (Assuming scenes are separated by Scene or Line breaks)
    const scenes = rawScript.split(/Scene \d+/i).filter(s => s.trim().length > 0);
    
    let htmlContent = "";

    scenes.forEach((sceneText, index) => {
        const sceneNum = index + 1;
        const cleanedText = sceneText.trim();
        
        // Automatically inject character consistency into video prompt
        const videoPrompt = `${CHARACTER_PROFILE} Action/Setting: ${cleanedText}. Cinematic composition, masterpiece, 16:9 widescreen.`;

        htmlContent += `
            <div class="scene-card" style="border: 1px solid #444; padding: 15px; margin-bottom: 15px; border-radius: 8px; background: #1e1e1e; color: #fff;">
                <h4>🎥 Scene ${sceneNum}</h4>
                <p><strong>Dialogue / Script:</strong> ${cleanedText}</p>
                
                <div style="margin-top: 10px;">
                    <strong>Fixed Video Prompt (Character Locked):</strong>
                    <textarea readonly style="width: 100%; height: 60px; background: #2a2a2a; color: #00ffcc; border: 1px solid #555; padding: 5px;">${videoPrompt}</textarea>
                </div>

                <div style="margin-top: 10px;">
                    <button onclick="triggerElevenLabsVoice(${sceneNum}, \`${cleanedText}\`)" style="background: #ff007f; color: #fff; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">
                        🎙️ Generate Voiceover
                    </button>
                    <span id="audioStatus-${sceneNum}" style="margin-left: 10px; font-size: 14px;"></span>
                </div>
            </div>
        `;
    });

    outputContainer.innerHTML = htmlContent;
}

// ElevenLabs Voice Generation Function
async function triggerElevenLabsVoice(sceneNum, text) {
    const statusSpan = document.getElementById(`audioStatus-${sceneNum}`);
    statusSpan.innerText = "Generating voice...";
    
    const voiceId = "21m00Tcm4TlvDq8ikWAM"; // Adam / Cinematic Voice ID
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': ELEVEN_API_KEY
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_multilingual_v2", // Supports Urdu, English, German, Japanese
                voice_settings: { stability: 0.75, similarity_boost: 0.75 }
            })
        });

        if (!response.ok) throw new Error("Voice API Failed");

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        statusSpan.innerHTML = `<audio controls src="${audioUrl}" style="vertical-align: middle; height: 30px;"></audio>`;
    } catch (err) {
        console.error(err);
        statusSpan.innerText = "❌ Error generating voice.";
    }
}
