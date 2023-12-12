interface Name {
    chinese: string;
    english: string;
  }
  
  interface Sentence {
    startTime: number;
    endTime: number;
    value: string;
  }
  
  interface Episode {
    id: string;
    name: Name;
    albumId: string;
    audioUrl: string;
    durationInSecond: number;
    sentences: Sentence[];
  }
  
 export type EpisodeResponse = Episode;