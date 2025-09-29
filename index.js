window.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("musicaFondo")) {
        let audio = document.createElement("audio");
        audio.id = "musicaFondo";
        audio.src = "musica/fondo.mp3"; // ruta desde index
        audio.autoplay = true;
        audio.loop = true;
        audio.volume = 0.4; // volumen más bajo
        document.body.appendChild(audio);
    }
});
