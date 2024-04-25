const statusEl = document.getElementById("patil_status_page");
const inputEl = document.getElementById("patil_homepage");

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

navigator.getUserMedia(
  { audio: true },
  (stream) => {
    function closeWindow() {
      if (inputEl && inputEl.value === "patil_homepage") {
        window.close();
      }
    }

    function statusChanger(text) {
      if (statusEl) {
        statusEl.innerText = text;
      }
      console.log(text);
    }

    speak("Voice activated Say start patil");
    statusChanger("Status: Voice Activated");

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition ||
      window.oSpeechRecognition;

    let activatedVoice = false;
    let speechResult = "";

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.start();

    recognition.onresult = (event) => {
      speechResult = event.results[0][0].transcript;
      console.log(speechResult);
    };

    recognition.onend = async () => {
      if (
        speechResult.toLowerCase().slice(0, 17) === "start patil group" &&
        !activatedVoice
      ) {
        activatedVoice = true;
        speak("Welcome To Patil group")
        speak("We are not just engineering we are revolutionizing");
        speak("the railway engineering in India through our journey of digital transformation");
        speak("How may I assist you?")
        statusChanger("Status: Started patil Voice-Assistant");
        
      } else if (
        speechResult.toLowerCase().slice(0, 10) === "start patil" &&
        activatedVoice
      ) {
        speak(
          "patil-voice assistant is already activated. How can I assist you?"
        );
        statusChanger("Status: Started patil Voice-Assistant");
      } else if (
        (speechResult.toLowerCase().slice(0, 9) === "stop patil" ||
          speechResult.toLowerCase().slice(0, 8) === "end patil") &&
        !activatedVoice
      ) {
        speak("patil-voice assistant is already terminated.");
        statusChanger("Status: patil Voice-Assistant Stopped.");
      } else if (
        (speechResult.toLowerCase().slice(0, 10) === "stop patil" ||
          speechResult.toLowerCase().slice(0, 9) === "end patil") &&
        activatedVoice
      ) {
        activatedVoice = false;
        speak("patil-voice assistant is stopped, Say start patil");
        statusChanger("Status: patil Voice-Assistant Stopped.");
      } else if (
        speechResult.includes("stop") ||
        speechResult.includes("exit") ||
        speechResult.includes("terminate")
      ) {
        activatedVoice = false;
        speak("Voice terminated.");
        statusChanger("Status: Voice Terminated.");
        stream.getTracks().forEach((track) => track.stop());
        closeWindow();
        return;
      } else if (
        speechResult.toLowerCase().slice(0, 4) === "open" &&
        activatedVoice
      ) {
        const command = await chrome.runtime.sendMessage({
          text: speechResult.split("open ")[1],
        });
        if (command && command.message) {
          speak(command.message);
          speechResult = "";
        }
      }
      speechResult = "";
      recognition.start();
    };

    recognition.onerror = (event) => {
      console.log(event.error);
    };
  },
  (error) => {
    console.log(error);
  }
);
