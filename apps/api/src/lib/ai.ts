export const formatHindiPoem = async (text: string) => {
  return text
    // normalize danda
    .replace(/\./g, "।")

    // add dramatic pauses
    .replace(/,/g, ",...")
    .replace(/।/g, "।\n(ठहराव)\n")

    // break lines nicely
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

    // add soft pauses between lines
    .join("\n(हल्का विराम)\n");
};