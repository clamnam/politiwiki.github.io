export const formatDate = (dateStr: string): string => {
  if (!dateStr) return "";
  
  return new Date(dateStr).toLocaleString("en-IE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};