import { mdiGithub, mdiLinkedin } from "@quasar/extras/mdi-v7";
import profilePhoto from "@/assets/profile.jpg";

export const profile = {
  name: "Nabila Hannania",
  initials: "NH",
  role: "AI Engineer",
  focusAreas: ["NLP", "Speech", "Computer Vision"],
  summary:
    "AI Engineer specializing in NLP, speech recognition, and computer vision — taking models from research to reliable, production-ready AI services.",
  location: "Jakarta, Indonesia",
  currentPosition: "Data Scientist | AI Engineer at PT Autentika Digital Indonesia",
  email: "nabilahannania95@gmail.com",
  // Set to "" to show the initials fallback instead of a photo
  photo: profilePhoto,
  // Public CV link (e.g. Google Drive shared as "Anyone with the link").
  // While empty, every "Download CV" button stays hidden.
  cvUrl: "",

  about: [
    "I'm an AI Engineer based in Jakarta, specializing in Natural Language Processing, Speech Recognition, and Computer Vision. At PT Autentika Digital Indonesia I build production AI systems for Indonesian document OCR and biometric verification — from model development and experiment tracking to containerized deployment.",
    "My foundation is research. I earned an M.Sc. in Informatics from Bandung Institute of Technology (ITB) with a 4.00 GPA, where my thesis tackled Indonesian speech recognition with self-supervised models on a limited speech corpus, and I was a research intern at the Japan Advanced Institute of Science and Technology (JAIST) working on low-resource speech recognition.",
    "I also bring software engineering experience, which helps me ship models as maintainable services rather than one-off notebooks.",
  ],

  lookingFor: {
    summary:
      "AI / ML Engineer roles where I can take NLP, speech, and computer vision models from experimentation to production — owning the path from data and training to optimized, containerized deployment.",
    tags: ["AI Engineer", "ML Engineer", "NLP", "Speech", "Computer Vision", "MLOps"],
  },

  facts: [
    { icon: "location_on", label: "Location", value: "Jakarta, Indonesia" },
    {
      icon: "work_outline",
      label: "Current role",
      value: "Data Scientist | AI Engineer, PT Autentika Digital Indonesia",
    },
    { icon: "school", label: "Education", value: "M.Sc. Informatics, ITB (GPA 4.00)" },
    {
      icon: "translate",
      label: "Languages",
      value: "Bahasa Indonesia (native), English (professional)",
    },
  ],

  // Key numbers shown on the Home page
  highlights: [
    { value: "0.014", label: "Character Error Rate on Indonesian document OCR" },
    { value: "98%", label: "Accuracy on biometric liveness detection" },
    { value: "34%", label: "Relative WER improvement in low-resource ASR" },
    { value: "4.00", label: "M.Sc. GPA, Bandung Institute of Technology" },
  ],

  education: [
    {
      id: "itb-msc",
      degree: "Master of Science, Informatics",
      school: "Bandung Institute of Technology (ITB)",
      url: "https://www.itb.ac.id/",
      period: "Aug 2023 – Aug 2024",
      location: "Bandung, Indonesia",
      grade: "GPA 4.00 / 4.00",
      note: "Thesis: Indonesian speech recognition with self-supervised models on a limited speech corpus.",
    },
    {
      id: "itb-bsc",
      degree: "Bachelor of Science, Informatics Engineering",
      school: "Bandung Institute of Technology (ITB)",
      url: "https://www.itb.ac.id/",
      period: "Aug 2019 – Jul 2023",
      location: "Bandung, Indonesia",
      grade: "GPA 3.89 / 4.00",
      note: "Thesis: bird song identification with convolutional neural networks.",
    },
  ],

  publications: [
    {
      id: "iceei-2023-bird-song",
      title:
        "Development of a Bird Song Identification Model Using a Convolutional Neural Network (CNN)",
      venue: "2023 International Conference on Electrical Engineering and Informatics (ICEEI)",
      year: 2023,
      url: "https://ieeexplore.ieee.org/abstract/document/10346834",
    },
  ],
};

// Entries with an empty url are not rendered
export const socials = [
  {
    label: "GitHub",
    handle: "github.com/nabilahannania",
    url: "https://github.com/nabilahannania",
    icon: mdiGithub,
  },
  {
    label: "LinkedIn",
    handle: "linkedin.com/in/nabilahannania",
    url: "https://www.linkedin.com/in/nabilahannania/",
    icon: mdiLinkedin,
  },
  {
    label: "Email",
    handle: profile.email,
    url: `mailto:${profile.email}`,
    icon: "mail_outline",
  },
  { label: "Hugging Face", handle: "", url: "", icon: "hub" },
  { label: "Kaggle", handle: "", url: "", icon: "insights" },
  { label: "Google Scholar", handle: "", url: "", icon: "school" },
];
