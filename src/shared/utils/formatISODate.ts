export function formatISODate(input: string): string {
  // Create a Date object from the input string
  const date = new Date(input);

  // Format each part of the date and time as needed
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Construct the formatted date string
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
