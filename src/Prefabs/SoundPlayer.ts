import Tone from "tone";

export enum Events {
  NOTE_ON = "NOTE_ON",
  NOTE_OFF = "NOTE_OFF"
}

export function noteOnEvent(note: string) {
  window.dispatchEvent(new CustomEvent(Events.NOTE_ON, { detail: note }));
}

export function noteOffEvent(note: string) {
  window.dispatchEvent(new CustomEvent(Events.NOTE_OFF, { detail: note }));
}

class SoundPlayer {
  private Synth = new Tone.PolySynth(4, Tone.Synth).toMaster();
  private RecordingStart: Date = null;
  private currentRecording: Song = null;
  private activeNotes = new Map<string, Date>();

  constructor() {
    window.addEventListener(Events.NOTE_ON, this.playNote);
    window.addEventListener(Events.NOTE_OFF, this.stopNote);
  }

  //#region Recording
  private get isRecording() {
    return this.RecordingStart !== null;
  }
  public StartRecording() {
    this.RecordingStart = new Date();
    this.currentRecording = [];

    console.log("Start Recording");
  }

  public StopRecording() {
    const recordingName = prompt("Put a name to the recorded file", `Song`);

    localStorage.setItem(`recording_${recordingName}`, JSON.stringify(this.currentRecording));
  }

  private recordNoteStart(note: string) {
    if (!this.isRecording) return;

    this.activeNotes.set(note, new Date);
  }

  private recordNoteEnd(note: string) {
    if (!this.isRecording) return;

    const currentTime = new Date();
    const noteStartTime = this.activeNotes.get(note);

    this.currentRecording.push({
      key: note,
      delay: noteStartTime.getTime() - this.RecordingStart.getTime(),
      duration: currentTime.getTime() - noteStartTime.getTime(),
    });
  }

  public GetRecordings(): Array<{name: string, song: Song}> {
    let recordings = [];

    Object.entries(localStorage).forEach(([key, value]) => {
      if (!key.startsWith("recording_")) return;

      recordings.push({
        name: key.replace("recording_", ""),
        song: JSON.parse(value)
      })
    });

    return recordings;
  }
  //#endregion

  public Play(song: Song) {
    song.forEach(({key, delay, duration}) => {
      setTimeout(() => {
        noteOnEvent(key),
        setTimeout(() => noteOffEvent(key), duration)
      }, delay)
    })
  }

  public Delete(song: string) {
    localStorage.removeItem(`recording_${song}`);
  }

  private playNote = (e: CustomEvent<string>) => {
    this.Synth.triggerAttack(e.detail);

    this.recordNoteStart(e.detail);
  }

  private stopNote = (e: CustomEvent<string>) => {
    this.Synth.triggerRelease(e.detail);

    this.recordNoteEnd(e.detail);
  }
}

export default SoundPlayer;
