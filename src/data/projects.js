// Single source of truth for every project shown on the site.
// Array order is display priority: put your best work first.
//
// Schema:
// {
//   id: "unique-slug",
//   title: "Project name",
//   category: ["ai"],          // "ai" | "software", or both
//   featured: true,            // up to 3 featured projects are shown per filter tab
//   summary: "1–2 sentences: the problem and the result.",
//   techStack: ["Python", "PyTorch"],
//   highlights: ["Accuracy 94% on dataset X"], // optional
//   year: 2025,                // null = hidden
//   thumbnail: "",             // optional: URL, or `import thumb from "@/assets/..."`
//   links: [{ label: "GitHub", url: "https://github.com/..." }], // label picks the icon
// }
export const projects = [
  {
    id: "indonesian-asr-self-supervised",
    title: "Indonesian Speech Recognition with Self-Supervised Models",
    category: ["ai"],
    featured: true,
    summary:
      "Improves Indonesian speech recognition when training data is scarce by fine-tuning self-supervised models, adding an external language model, and adapting the acoustic model with text-to-speech data augmentation.",
    techStack: ["Python", "XLS-R", "HuBERT", "Language Modeling", "Text-to-Speech"],
    highlights: ["Master's thesis, Bandung Institute of Technology"],
    year: 2024,
    thumbnail: "",
    links: [{ label: "Thesis", url: "https://digilib.itb.ac.id/gdl/view/85319/" }],
  },
  {
    id: "bird-song-identification",
    title: "Bird Song Identification with CNNs",
    category: ["ai"],
    featured: true,
    summary:
      "Automates bird species identification from song recordings to support biodiversity monitoring, comparing AlexNet, DenseNet, and VGG across mel-spectrogram, harmonic/percussive, and MFCC features.",
    techStack: ["Python", "Keras", "CNN", "MFCC", "Mel-spectrogram"],
    highlights: ["Published at IEEE ICEEI 2023", "Undergraduate thesis, ITB"],
    year: 2023,
    thumbnail: "",
    links: [
      { label: "Paper", url: "https://ieeexplore.ieee.org/abstract/document/10346834" },
      { label: "Thesis", url: "https://digilib.itb.ac.id/gdl/view/74796/" },
    ],
  },
  {
    id: "absa-review-pipeline",
    title: "Aspect-Based Sentiment, Summarization & Translation for Reviews",
    category: ["ai"],
    featured: true,
    summary:
      "An NLP pipeline that makes product reviews easier to digest: it classifies sentiment per aspect, summarizes the reviews, and translates the results from English to Bahasa Indonesia.",
    techStack: ["Python", "BERT", "CNN", "Summarization", "Machine Translation"],
    highlights: ["Fine-tuned BERT and CNN aspect-sentiment classifiers"],
    year: null,
    thumbnail: "",
    links: [
      {
        label: "Report",
        url: "https://drive.google.com/file/d/1LmPqryEHgkCADbTGl-0xi4MpoLAPVLV7/view?usp=sharing",
      },
    ],
  },
  {
    id: "bay-transformer-anomaly-detection",
    title: "Bay Transformer Disturbance Prediction",
    category: ["ai"],
    featured: false,
    summary:
      "Flags early signs of bay transformer disturbances with unsupervised anomaly detection, so issues can be handled before they escalate into power outages.",
    techStack: ["Python", "Scikit-learn", "Isolation Forest", "One-Class SVM", "LOF"],
    highlights: ["Compared Isolation Forest, One-Class SVM, MCD, and LOF"],
    year: null,
    thumbnail: "",
    links: [],
  },
  {
    id: "image-inpainting",
    title: "Image Inpainting",
    category: ["ai"],
    featured: false,
    summary:
      "Restores missing or damaged image regions while preserving visual coherence, comparing convolutional autoencoders, partial-convolution autoencoders, and GANs.",
    techStack: ["Python", "Autoencoder", "Partial Convolution", "GAN"],
    highlights: [],
    year: null,
    thumbnail: "",
    links: [
      {
        label: "Report",
        url: "https://drive.google.com/file/d/1e9qbDjBqnqeAf_n4t4nTRSawPr9oRAu1/view?usp=sharing",
      },
    ],
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    category: ["software"],
    featured: true,
    summary:
      "This site: a responsive single-page app with route-based pages, shareable project filters, light and dark themes, and one data source for all content, deployed to GitHub Pages.",
    techStack: ["Vue 3", "Quasar", "Vue Router", "SCSS", "GitHub Pages"],
    highlights: ["Keyboard-accessible navigation and filters"],
    year: 2026,
    thumbnail: "",
    links: [
      { label: "GitHub", url: "https://github.com/nabilahannania/nabila-portfolio" },
      { label: "Live", url: "https://nabilahannania.github.io/nabila-portfolio/" },
    ],
  },
];

export const categories = [
  { id: "all", label: "All", shortLabel: "All" },
  { id: "ai", label: "AI Engineering", shortLabel: "AI" },
  { id: "software", label: "Software Engineering", shortLabel: "Software" },
];

export const categoryLabels = {
  ai: "AI",
  software: "Software",
};

export function getProjectsByCategory(categoryId) {
  if (categoryId !== "all") {
    return projects.filter((project) => project.category.includes(categoryId));
  }
  // "All" tab: AI projects first, keeping the data order within each group
  const isAi = (project) => (project.category.includes("ai") ? 1 : 0);
  return [...projects].sort((a, b) => isAi(b) - isAi(a));
}

export function getFeaturedProjects(categoryId, limit = 3) {
  return getProjectsByCategory(categoryId)
    .filter((project) => project.featured)
    .slice(0, limit);
}
