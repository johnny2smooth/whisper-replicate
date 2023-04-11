export type Prediction = {
  completed_at: string | null;
  created_at: string | null;
  error: null;
  id: string | null;
  input: {
    audio: string | null;
  };
  logs: string | null;
  metrics: {
    predict_time: number;
  };
  output: {
    segments: [];
    transcription: string;
  };
  started_at: string | null;
  status: string | null;
  urls: {
    get: string;
    cancel: string;
  };
  version: string;
  webhook_completed: string | null;
};
