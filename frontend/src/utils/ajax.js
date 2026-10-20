/**
 * AJAX ERROR HELPER
 *
 * Laravel returns errors in different shapes.
 * This function picks the best message to show the user.
 */
export function getAjaxErrorMessage(error, fallback = 'Something went wrong.') {
  const data = error?.response?.data;

  if (!data) return fallback;

  // Our custom format: { success: false, message: "..." }
  if (data.message) return data.message;

  // Laravel validation errors: { errors: { email: ["..."] } }
  if (data.errors) {
    const messages = Object.values(data.errors).flat();
    return messages.join(' ');
  }

  return fallback;
}
