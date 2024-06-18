/* global SpeechRecognition */
function speechrecog(prop, callback) {
  const speech = prop;

  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;

  let finalTranscript = ""; // Variable to store the final transcript

  recognition.addEventListener("result", (e) => {
    let newTranscript = Array.from(e.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    if (newTranscript !== finalTranscript) {
      finalTranscript = newTranscript;
    }

    // Check if the speech has ended
    if (e.results[0].isFinal) {
      // Log the final transcript
      // Remove the event listener for result
      recognition.removeEventListener("result", recognition.onresult);
      // Pass the final transcript to the callback function
      callback(finalTranscript);
    }
  });

  if (speech) recognition.start();
}

export default speechrecog;
