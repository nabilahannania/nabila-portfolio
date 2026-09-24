// Handler for Quasar's v-intersection directive: fades an `.l-reveal` element in
// the first time it scrolls into view (disabled by prefers-reduced-motion in App.vue).
export default function useReveal() {
  const reveal = (entry) => {
    if (!entry.isIntersecting) {
      return true;
    }
    entry.target.classList.add("l-reveal--visible");
    // Returning false stops observing this element
    return false;
  };

  return { reveal };
}
